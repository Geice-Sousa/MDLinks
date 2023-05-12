# ✨#️ Markdown Links #️✨

## 💡# O que é a **mdLinks** #💡
Markdown é uma linguagem de marcação simples e bastante popular entre os programadores. Ela é usada em muitas plataformas que manipulam texto, como GitHub, fóruns, blogs e etc. Essa linguagem é encontrada em arquivos com formato `.md`, como temos, por exemplo, o `README.md`.

Os arquivos `Markdown` normalmente contém _links_ que podem estar quebrados, ou já não ser válidos, prejudicando muito o valor da informação que está ali. A **mdLinks** é uma biblioteca/API que existe para isso: fazer a verificação dos links de arquivos markdown, mostrar estatíticas da quantidade de links e dos que estão quebrados. Essas fucionalidades são realizadas por meio de linha de comando (CLI).

<br>

## 💡# O que você precisa fazer para usar a **mdLinks** #💡
<br>

   ### O primeiro passo é fazer a instalação
  -
        npm install md-links-geice-sousa-pinho

  ### 📋 Ao instalar você tem quatro opções de uso:
<br>

   - #### 1) md-links ```<caminho do arquivo> ``` consegue verificar os links, seus títulos e o arquivo:
        * href: URL encontrada
        * text: Legenda do link
        * file: Caminho do arquivo do link

      <br>

   - #### 2) md-links ```<caminho do arquivo> ``` -- validate, consegue verificar quais tão funcionando e quais estão quebrados:
        * href: URL encontrada
        * text: Legenda do link
        * file: Caminho do arquivo do link
        * status: nº do status HTTP (identifica o código)
        * ok: fail ou ok (irá depender do status)

      <br>

  - #### 3) md-links ```<caminho do arquivo>``` --stats, consegue ver o total de itens e links:
      * Total: 3
      * Unique: 3

  <br>

   - #### 4) md-links ```<caminho do arquivo> ``` -- validate --stats, consegue verificar o total de itens e desses quantos estão quebrados:
        * Total: 3
        * Unique: 3
        * Broken: 1

      <br>

### 💡 Algumas dicas de tutoriais que podem fazer você entender melhor o Node.js

  * [learnyounode](https://github.com/workshopper/learnyounode)
  * [how-to-npm](https://github.com/workshopper/how-to-npm)
  * [promise-it-wont-hurt](https://github.com/stevekane/promise-it-wont-hurt)

<br>

## 👩🏾‍💻 Tecnologias
  - JavaScript
  - Git e GitHub
  - NodeJs
  - Jest

### 👩🏾‍💼 💼 [Clique para ver todos os repositórios](https://github.com/Geice-Sousa?tab=repositories)

### 👩🏾‍💼 🎯 [Clique para baixar a API no site do npm](https://www.npmjs.com/package/md-links-geice-sousa-pinho)

<br>
