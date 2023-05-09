#!/usr/bin/env node 
//^^informa que o arq é pra ser interpretado por node, podia ser bash
const { mdLinks } = require('./index.js');
const chalk = require('chalk');
const boxen = require('boxen');
const path = require('path');
// './files-test/fileMarkdown.md'
// console.log(__dirname) // diretorio
// console.log(__filename)
 
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}

if(options.stats && options.validate){
  mdLinks(process.argv[2], options)
 .then((response) => {
    const hrefs = response.map((element) => element.href);
    const broken = response.filter((element) => element.status !== 200);
    console.log(`
    ${chalk.black.bold('Total')}: ${response.length} 
    ${chalk.black.bold('Unique')}: ${hrefs.length}
    ${chalk.black.bold('Broken')}: ${broken.length}
    `);
  })
  .catch((error) => {
  console.log(`Erro: não foi possível acessar os links para verificação. ${error}`)
  })
}
else if(options.stats){
  mdLinks(process.argv[2], options)
  .then((objects)=>{ // cada obj
    const hrefs = objects.map(obj => obj.href) // cada links de cada obj
    
    console.log(`
    ${chalk.black.bold('Total')}: ${objects.length} 
    ${chalk.black.bold('Unique')}: ${hrefs.length}
    `);
  })  
  .catch((error)=>{
    console.log(`Não foi possível verificar os links. Erro: ${error}`);
  });
}
else if(options.validate){
  mdLinks(process.argv[2], options)
  .then((response)=>{
    response.map((obj)=>{ 
        if(obj.status === 200){ 
          console.log(`
          ${chalk.black.bold('Href')}: ${chalk.cyan(obj.href)}   
          ${chalk.black.bold('Text')}: ${chalk.magenta(obj.text)} 
          ${chalk.black.bold('File')}: ${chalk.white(obj.file)}
          ${chalk.black.bold('Status')}: ${chalk.green(obj.status)} 
          ${chalk.black.bold('Ok')}: ${chalk.bold(obj.ok)}
          `);
        }
        else{
          console.log(`
          ${chalk.black.bold('Href')}: ${chalk.cyan(obj.href)}  
          ${chalk.black.bold('Text')}: ${chalk.magenta(obj.text)} 
          ${chalk.black.bold('File')}: ${chalk.white(obj.file)}
          ${chalk.black.bold('Status')}: ${chalk.red(obj.status)}
          ${chalk.black.bold('Ok')}: ${chalk.red.bold('fail')}
          `);
        }
    });
  })
  .catch((error)=>{
    console.log(`Olá, houve um erro na execução do arquivo. Erro: ${error}`); // se passar um link inválido no console cai aqui
  });
} 
else{
  mdLinks(process.argv[2], !options)
  .then((response)=>{
    response.map((obj)=> 
      console.log(` 
      ${chalk.black.bold('Href')}: ${chalk.cyan(obj.href)}   
      ${chalk.black.bold('Text')}: ${chalk.magenta(obj.text)} 
      ${chalk.black.bold('File')}: ${chalk.white(obj.file)}
      `))
  })
  .catch((error)=>{
    console.log(`Não foi possível fazer a verificação do arquivo. Erro: ${error}`);
  });
}
