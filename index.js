// aqui vai ficar a função mdLinks(path, options) , não precisa chamar function, funciona como um objeto

// module.exports = { // vou exportar pra usar onde??

const getInfos = (string, archive)=>{
  const contentInfos = string.split('](');
  const text = contentInfos[0].replace('[', '');
  const href = contentInfos[1].replace(')', '');
  console.log({ href, text, archive })
};

function mdLinks(pathFile){
  const fs = require('fs');
  const regEx = /\[[^\]]+\]\(([^)]+)\)/gm; // gm para pegar varias linhas

  fs.readFile(pathFile, 'utf-8', (error, data)=>{
    if(error){
      console.log('error')
    } else {
      const infos = data.match(regEx); // array com todos os links
      // console.log(infos)
      const objInfo = infos.map((info)=> {
        getInfos(info, pathFile);
      })
      return objInfo;
    }
  });
}

// }

// mdLinks('./files-test/fileMarkdown.md');
