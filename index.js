// aqui vai ficar a função mdLinks(path, options) , não precisa chamar function, funciona como um objeto
const { readFile, readdirSync, lstatSync } = require('fs');
const { extname, join } = require('path');
const chalk = require('chalk');
const { default: JestHasteMap } = require('jest-haste-map');

const getInfos = (string, file)=>{
  const contentInfos = string.split('](');
  const text = contentInfos[0].replace('[', '');
  const href = contentInfos[1].replace(')', '');
  return { href, text, file };
};

const isDir = (path) => lstatSync(path).isDirectory(); // isDirectory() e isFile() são do lstatSync, não é recursão

const verifyDirectory = (directory)=>{
  if(isDir(directory)){
    const open = readdirSync(directory);
    const fileMd = open.filter((file)=>{ return extname(file) === '.md'});
    const pathMd = fileMd.map((file)=>{ return join(' ', directory, file, ' ')});
    return pathMd;
  }
};

const isMdFile = (file) =>{
    return extname(file) === '.md'; // true || false
};

function mdLinks(pathFile, options) {
  return new Promise((resolve, reject) => {
    if(!pathFile){
      console.log(`${chalk.red.bold('Para fazer a verificação, você precisa passar um caminho.')}`);
      return;
    }

    const pathMd = verifyDirectory(pathFile);

    if(pathMd){
      console.log(`
      ${chalk.black.bold('Você passou o caminho de um diretório, escolha um dos arquivos abaixo para verificação dos links.')}
          ${chalk.red(pathMd)}
      ${chalk.greenBright('Será necessário informar o caminho completo. Ex.: <nomediretorio/nomearquivo.md>')} `);

      return;
    }

    if(!isMdFile(pathFile)){
      reject('Esse arquivo não é .md');
      return;
    };

    readFile(pathFile, 'utf-8', (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      const infos = data.match(/\[[^\]]+\]\(([^)]+)\)/gm); // gm para pegar varias linhas
      const objInfo = infos.map((info) => getInfos(info, pathFile));

      if (options.validate) {
        Promise.all(objInfo.map((obj) => {
          return fetch(obj.href)
            .then((response) => {
              obj.status = response.status;
              if (response) {
                obj.ok = response.statusText;
              } else {
                obj.ok = 'fail';
              }
              return obj;
            })
            .catch((error) => {
              obj.status = error;
              obj.ok = 'fail';
              return obj;
            });
        }))
          .then(resolve);
      }
      else {
        resolve(objInfo);
      }
    });
  });
}


module.exports = { getInfos, mdLinks, verifyDirectory, isMdFile };
