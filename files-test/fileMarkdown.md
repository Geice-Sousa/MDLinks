## O Markdown para extrair os links poderia ser criado das seguintes maneiras (todas são válidas):

* Usando um _módulo_ como [markdown-it](https://github.com/markdon-it/markdown-ito), que nos devolve um array de _tokes_ que utilizamos para identificar os links.

* Seguindo outro caminho, poderíamos usar [expressões regulares
  (`RegExp`)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions).

* Também poderíamos usar uma combinação de vários _módulos_ (poderia ser válido transformar o markdown em um HTML usando o
  [marked](https://github.com/markedjs/marked) e depois extrair os links com uma
  biblioteca de DOM como [JSDOM](https://github.com/jsdom/jsdom) o
  [Cheerio](https://github.com/cheeriojs/cheerio)).

* Usando um _custom renderer_ de [marked](https://github.com/markedjs/marked/) (`new marked.Renderer()`).
    if(options.validate){
        Promise.all(objInfo.map((obj) =>
          fetch(obj.href).then((response) => {
            obj.status = response.status;
            if(response.status !== 200){
              obj.ok = 'fail'
            }else{
              obj.ok = response.statusText;
            }
            return obj

          })
          .catch((error) => {
            obj.status = error;
            obj.ok = 'Esse link não existe';
            return obj
          })
        )).then((response)=>{
          console.log(response)
          resolve(response)
        })
      } 
      else {
        resolve(objInfo);
      }
    })
  });