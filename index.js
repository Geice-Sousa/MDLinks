// aqui vai ficar a função mdLinks(path, options) , não precisa chamar function, funciona como um objeto
const fs = require('fs');

exports.getInfos = (string, file)=>{
  const contentInfos = string.split('](');
  const text = contentInfos[0].replace('[', '');
  const href = contentInfos[1].replace(')', '');
  return { href, text, file } // se dou return não aparece as infos
};

exports.mdLinks = (pathFile)=>{
  const regEx = /\[[^\]]+\]\(([^)]+)\)/gm; // gm para pegar varias linhas
  return new Promise ((resolve, reject)=>{
    fs.readFile(pathFile, 'utf-8', (error, data)=>{
      if(error){
        reject(error); // o que era retorno, mudou
      } else {
        const infos = data.match(regEx); // array com todos os links
        const objInfo = infos.map((info)=> {
          getInfos(info, pathFile);
        })
        resolve(objInfo);
      }
    });
  });
}

  //   const fs = require('fs');
  //   const regEx = /\[[^\]]+\]\(([^)]+)\)/gm; // gm para pegar varias linhas
  // fs.readFile(pathFile, 'utf-8', (error, data)=>{
  //   if(error){
  //     return 'error';
  //   } else {
  //     const infos = data.match(regEx); // array com todos os links
  //     const objInfo = infos.map((info)=> {
  //       getInfos(info, pathFile);
  //     })
  //     return objInfo;
  //   }
  // });