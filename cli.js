const index = require('./index.js');
const chalk = require('chalk');
const boxen = require('boxen');
const mdLinks = index.mdLinks('./files-test/fileMarkdown.md')[0]

// console.log(mdLinks[0])
// console.log(mdLinks[3])

// a função não tá lendo os outros arqvs txt e js da erro no map pq não tem a regex pra fazer o match, esses arquivos serão tratados no catch
//  mdLinks.then(()=>{
  // mdLinks.map((link)=>{
  //   console.log(link);
  //   console.log(chalk.blue("link"));  
  //   console.log(chalk.blue(link));  
  //  })

  //  mdLinks.forEach(element => {
  //   console.log(element)
  //  });
// })
// .catch((error)=>{
//   // error.map((erro)=>{
//     console.log(error);
//   // })
//   console.log(boxen(chalk.red('erro :'), {borderColor: 'redBright', borderStyle: 'double'})); // assim que vou usar para o erro
// })


