// aqui vai ficar a função mdLinks(path, options) , não precisa chamar function, funciona como um objeto
const fs = require('fs');

const getInfos = (string, file)=>{
  const contentInfos = string.split('](');
  const text = contentInfos[0].replace('[', '');
  const href = contentInfos[1].replace(')', '');
  return { href, text, file }
};

const mdLinks = (pathFile, options)=>{
  const regEx = /\[[^\]]+\]\(([^)]+)\)/gm; // gm para pegar varias linhas
  return new Promise ((resolve, reject)=>{
    fs.readFile(pathFile, 'utf-8', (error, data)=>{
      if(error){
        reject(error); 
      } else {
        const infos = data.match(regEx); // array com todos os links
        const objInfo = infos.map((info)=>{
          return getInfos(info, pathFile);
        })
        resolve(objInfo);
      }
    });
  });
}

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}

module.exports = { getInfos, mdLinks, options }