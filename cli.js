#!/usr/bin/env node 
//informa que o arq é pra ser interpretado por node, podia ser bash
const index = require('./index.js');
const commander = require('commander') // aqui tem varios metodos que vão auxiliar para criar as flags .usage as flags [opcionais] <obrigatorias>, description que vai dizer pra que serve a api, e action que vai ser a exceução da função de acordo com oq for chamado no console
const chalk = require('chalk');
const boxen = require('boxen');
const path = require('path');
const fileName = __filename;
// const mdLinks = index.mdLinks(fileName);
const mdLinks = index.mdLinks('./files-test/fileMarkdown.md');

console.log(process.argv)
console.log(__dirname  + " " + process.argv[1])
// process.argv[1] e __filename são a mesma coisa: caminho do arquivo completo até o nome 
console.log(path.parse(__filename))
console.log(__dirname) // diretorio

// quando a mdLinks for acessada vai mostraro link (url), o texto dentro de um <a>, a rota, o status com HTTP e okay ou fail
// quando a mdLinks der erro vai mostrar o link (url), o texto dentro de um <a> e a rota

 mdLinks.then(()=>{
  mdLinks.map((obj)=>{
    console.log(obj);
  })
 })
.catch((error)=>{
  console.log(error);
});

// console.log(boxen(chalk.red('erro :'), {borderColor: 'redBright', borderStyle: 'double'})); // assim que vou usar para o erro
