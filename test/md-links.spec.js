const { getInfos, mdLinks } = require('../index.js');
jest.mock('fs');
const { readFile } = require('fs');

const text = "markdown-it"; 
const href = "https://github.com/markdown-it/markdown-it"; 
const file = "file.md";

describe('getInfos', () => {
  it ("should extract the link data from a text", ()=>{
    const string = `[${text}](${href})`; 
    const infos = getInfos(string, file);

    expect(infos).toEqual({ href, text, file });
  })
});

describe('mdLinks', ()=>{
  it('should take a file, extract the link data from a text and show it or not', 
  ()=>{
    let cb;
    readFile.mockImplementation((path, options, callback) => { // implementation faz o passo a passo de dentro da função
      cb = callback;
    });

    mdLinks(file);

    expect(readFile).toBeCalledTimes(1); // tem que limpar pra qndo for fazer o erro chamar 1x só tbm
    expect(readFile).toBeCalledWith(file, "utf-8", cb); // ou podemos usar o expect.any(Function)
  })
})

// deveria pegar um arquivo, extrair os dados de link de um texto e mostrar ou não
// deveria extrair os dados de link de um texto