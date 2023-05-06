// aqui vai ficar a função mdLinks(path, options) , não precisa chamar function, funciona como um objeto
const { readFile } = require('fs');

const getInfos = (string, file)=>{
  const contentInfos = string.split('](');
  const text = contentInfos[0].replace('[', '');
  const href = contentInfos[1].replace(')', '');
  return { href, text, file }
};

const mdLinks = (pathFile, options)=>{
  const regEx = /\[[^\]]+\]\(([^)]+)\)/gm; // gm para pegar varias linhas
  return new Promise ((resolve, reject)=>{
    readFile(pathFile, 'utf-8', (error, data)=>{
      if(error) throw reject(error); 

      const infos = data.match(regEx); // array com todos os links
      const objInfo = infos.map((info)=> getInfos(info, pathFile));

      if(options.validate){
        const informations = Promise.all(objInfo.map((obj) =>
          fetch(obj).then((response) => {
            obj.status = response.status;
            if(response.status !== 200){
              obj.ok = 'fail'
            }else{
              obj.ok = response.statusText;
            }
          })
          .catch((error) => {
            obj.status = error;
            obj.ok = 'fail'
          })
        )).then(()=>{ // trata a response do promise.all 
          resolve(informations);
        })
      // acaba  o if de options.validate
      } else {
        // else para qndo não chamar com options
        const onlyInformations = objInfo.map((obj)=>{
          console.log(obj);
          return obj
        })
        resolve(onlyInformations)
      }
      resolve(objInfo); 
    })
  });

}

module.exports = { getInfos, mdLinks }