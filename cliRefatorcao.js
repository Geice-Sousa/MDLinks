#!/usr/bin/env node 
const { mdLinks } = require('./index.js');
const chalk = require('chalk');
const boxen = require('boxen');
const path = require('path');
// './files-test/fileMarkdown.md'

// POSSO FAZER UMA CONST P/ CADA E DEPOIS FAZER IF E ELSE DE CADA CONDICAO RETORNANDO A CONST
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}

if(options.stats && options.validate){
  mdLinks(process.argv[2], options.stats && options.validate)
  .then((objects)=>{
    const hrefs = objects.map((obj)=>{ // cada links de cada obj
      return obj.href 
    })
    const broken = objects.map((obj)=>{
      console.log(objects, 'array objetos')
      console.log(obj, 'cada um')
      console.log(response.status)

    })
      console.log(`
        ${chalk.black.bold('Total')}: ${objects.length}
        ${chalk.black.bold('Unique')}: ${hrefs.length}
        ${chalk.black.bold('Broken')}: ${broken.length}
        `);  
      })
  .catch((error)=>{
    console.log(`Erro: ${error}`);
  });
}

else if(options.stats){
  mdLinks(process.argv[2], options.stats)
  .then((objects)=>{ // cada obj
    const hrefs = objects.map((obj)=>{ // cada links de cada obj
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
  mdLinks(process.argv[2], options.validate)
  .then((objects)=>{
    objects.map((obj)=>{ 
      fetch(obj.href).then((response)=>{
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
  mdLinks(process.argv[2], !options).then((object)=>{
    object.map((obj)=>{
      return obj
    })       
  })
  .catch((error)=>{
    console.log(`Erro: ${error}`);
  });
}

