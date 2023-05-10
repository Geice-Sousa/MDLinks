# Markdown Links

## Índice

***

## O que você precisa fazer para usar a mdLinks

[Markdown](https://pt.wikipedia.org/wiki/Markdown) é uma linguagem de marcação simples e muito popular entre os programadores. É usada em muitas plataformas que manipulam texto (GitHub, fóruns, blogs e etc) e é muito comum encontrar arquivos
com este formato, como temos o exemplo do `README.md`.

Os arquivos `Markdown` normalmente contém _links_ que podem estar quebrados, ou que já não são válidos, prejudicando muito o valor da informação que está ali.
A mdLinks é uma biblioteca/API que existe para isso: fazer a verificação dos links de arquivos markdown, mostrar estatíticas da quantidade de links e dos que estão quebrados. Essas fucionalidades são realizadas por meio de linha de comando (CLI).


## 2. Resumo do projeto


### JavaScript


## 4. Considerações gerais


* O seu módulo deve ser instalável via `npm install <github-user>/md-links`.

## 5. Critérios de aceitação mínimos do projeto

Para começar este projeto você deverá fazer um _fork_ e _clonar_ este
repositório.

Antes de começar o código, é necessário criar um plano de ação. Ele deve estar
detalhado no `README.md` do seu repositório e em uma série de _issues_ e
_milestones_ para priorizar e organizar o trabalho, e para fazer um
acompanhamento do seu progresso.

Dentro de cada _milestone_ serão criados e atribuidos as _issues_
que considerar necessários.

### Arquivos do projeto

## Este proyecto consta de DOS partes

### 1) JavaScript API

Ao usar você tem quatro opções:
  1) md-links <caminho do arquivo> você consegue verificar os links, seus títulos e o arquivo;
  2) md-links <caminho do arquivo> -- validate, você consegue verificar quais tão funcionando e quais estão quebrados;
  3) md-links <caminho do arquivo> --stats, você consegue ver o total de itens e links;
  4) md-links <caminho do arquivo> -- validate --stats, você consegue verificar o total de itens e fdesses quantos estão quebrados.

##### Valor de retorno

* `href`: URL encontrada
* `text`: Legenda do link
* `file`: Caminho do arquivo do link

Com `validate:true` :

* `href`: URL encontrada
* `text`: Legenda do link
* `file`: Caminho do arquivo do link
* `status`: nº do status HTTP (identifica o código)
* `ok`: `fail`ou `ok` (irá depender do status)


### Algumas dicas de tutoriais que podem fazer você entender melhor o Node.js

* [learnyounode](https://github.com/workshopper/learnyounode)
* [how-to-npm](https://github.com/workshopper/how-to-npm)
* [promise-it-wont-hurt](https://github.com/stevekane/promise-it-wont-hurt)

* [ ] Implementa suporte para diretórios

* [ ] Os testes unitários devem cobrir no mínimo 70% dos statements, functions,
  lines e branches.
