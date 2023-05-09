// aqui vai ficar a função mdLinks(path, options) , não precisa chamar function, funciona como um objeto
const { readFile } = require('fs');
const { default: JestHasteMap } = require('jest-haste-map');

const getInfos = (string, file)=>{
  const contentInfos = string.split('](');
  const text = contentInfos[0].replace('[', '');
  const href = contentInfos[1].replace(')', '');
  return { href, text, file,  }
};

const mdLinks = (pathFile, options)=>{
  return new Promise ((resolve, reject)=>{
    
    readFile(pathFile, 'utf-8', (error, data)=>{
      if(error) throw reject(error)

      const infos = data.match(/\[[^\]]+\]\(([^)]+)\)/gm); // gm para pegar varias linhas
      const objInfo = infos.map((info)=> {return getInfos(info, pathFile)})

      if(options.validate){ // DENTRO DO IF O objtInfo NÃO É LIDO
        Promise.all(objInfo.map((obj)=>{
          return fetch(obj.href)
          .then((response)=>{
            obj.status = response.status;
            if(response){
              obj.ok = response.statusText;
            }else{
              obj.ok = 'fail';
            }
            return obj
          })
          .catch((error)=>{
            obj.status = error;
            obj.ok = 'fail';
            return obj;
          })
        }))
        .then(resolve)
      } 
      else{ 
        resolve(objInfo) }
    })
  })
}

module.exports = { getInfos, mdLinks }
