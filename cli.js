#!/usr/bin/env node 
//^^informa que o arq é pra ser interpretado por node, podia ser bash
const { options, mdLinks } = require('./index.js');
const chalk = require('chalk');
const boxen = require('boxen');
const path = require('path');
// './files-test/fileMarkdown.md'
// console.log(__dirname) // diretorio
// console.log(__filename)
// process.argv[1] e __filename são a mesma coisa: caminho do arquivo completo até o nome 

if(options.stats && options.validate){
  mdLinks(process.argv[2], { validate: true })
  .then((objects)=>{
    const hrefs = objects.map((obj) => obj.href);
    let broken = [];
    Promise.all(hrefs.map((element) =>
      fetch(element)
      .then((response) => {
        if(response.status !== 200){
          broken.push(element)
        }
      })
      .catch((error) => {
        // broken.push(element)
        console.log(`Erro: não foi possível acessar os links para verificação. ${error}`)
      })
    )).then(() => {
      console.log(`
      ${chalk.black.bold('Total')}: ${objects.length}
      ${chalk.black.bold('Unique')}: ${hrefs.length}
      ${chalk.black.bold('Broken')}: ${broken.length}
      `);  
    })
  }) 
  .catch((error)=>{
    console.log(`Erro: ${error}`);
  });
}

else if(options.stats){
  mdLinks(process.argv[2], { stats: true })
  .then((objects)=>{
    const hrefs = objects.map((obj)=>{
      return obj.href
    })
    console.log(`
      ${chalk.black.bold('Total')}: ${objects.length}
      ${chalk.black.bold('Unique')}: ${hrefs.length}
    `);
  })  
  .catch((error)=>{
    console.log(`Erro: ${error}`);
  });
}
else if(options.validate){
  mdLinks(process.argv[2], { validate: true})
  .then((objects)=>{
    objects.map((obj)=>{ // o status com HTTP e okay ou fail
      fetch(obj.href).then((response)=>{ // por adrão o fetch usa o GET, então pega o link que tá dentro do obj no atributo href
        if(response.ok){
          console.log(` 
            ${chalk.black.bold('Href')}: ${chalk.cyan(obj.href)}   
            ${chalk.black.bold('Text')}: ${chalk.magenta(obj.text)} 
            ${chalk.black.bold('File')}: ${chalk.white(obj.file)}
            ${chalk.black.bold('Status')}: ${chalk.green(response.status)}
            ${chalk.black.bold('Ok')}: ${chalk.bold(response.statusText)}`);
        } else{
          console.log(`
            ${chalk.black.bold('Href')}: ${chalk.cyan(obj.href)}  
            ${chalk.black.bold('Text')}: ${chalk.magenta(obj.text)} 
            ${chalk.black.bold('File')}: ${chalk.white(obj.file)}
            ${chalk.black.bold('Status')}: ${chalk.red(response.status)}
            ${chalk.black.bold('Ok')}: ${chalk.red.bold('fail')}`);
        }
      });
    });
  })
  .catch((error)=>{
    console.log(`olá Erro: ${error}`); // se passar um link inválido no console cai aqui
  });
} 
else{
  mdLinks(process.argv[2]).then((object)=>{
    object.map((obj)=>{
      // CONSOLE OU RETURN?
      console.log(`
        ${chalk.black.bold('Href')}: ${chalk.cyan(obj.href)}
        ${chalk.black.bold('Text')}: ${chalk.magenta(obj.text)} 
        ${chalk.black.bold('File')}: ${chalk.white(obj.file)}`);
    });
  })
  .catch((error)=>{
    console.log(`Erro: ${error}`);
  });
}

// console.log(boxen(chalk.red('erro :'), {borderColor: 'redBright', borderStyle: 'double'})); // assim que vou usar para o erro
