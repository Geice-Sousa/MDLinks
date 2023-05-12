const { extname } = require('path');
const { getInfos, mdLinks, verifyDirectory, verifyFile } = require('../index.js');
jest.mock('fs');
jest.mock('path');
const { readFile, readdirSync, lstatSync, isDirectory } = require('fs');

afterEach(()=>{
  extname.mockClear();
  lstatSync.mockClear();
  // jest.clearAllMocks()
});

const text = "markdown-it";
const href = "https://github.com/markdown-it/markdown-it";
const file = "file.md";

describe('getInfos', () => {
  it ("should extract the link data from a text", ()=>{
    const string = `[${text}](${href})`;
    const infos = getInfos(string, file);

    expect(infos).toEqual({ href, text, file });
  });
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
    expect(readFile).toBeCalledWith(file, "utf-8", cb); // ou podemos usar o expect.any(Function) no lugar do cb
  });
});

describe('verifyDirectory', ()=>{
  it('shold access the directory and show the files in it', ()=>{
    const array = [];

    readdirSync.mockResolvedValue(array);
    extname.mockResolvedValue();
    isDirectory.mockReturnValue();
    lstatSync.mockReturnValue(true);

    verifyDirectory('./files-test');

    expect(readdirSync).toBeCalledTimes(1);
    expect(readdirSync).toBeCalledWith('./files-test');
    expect(readdirSync).toBe(array); // ou toEqual?

    expect(extname).toBeCalledTimes(1);
    expect(extname).toBeCalledWith('file.js');

    expect(lstatSync).toBeCalledTimes(1);
    expect(lstatSync).toBe(true);
  });
});

describe('verifyFile', ()=>{
  it('should get the file name and check if the extension is .md', ()=>{
    extname.mockReturnValue();

    verifyFile('file.js');

    expect(extname).toBeCalledTimes(1);
    expect(extname).toBeCalledWith('file.js');
    expect(extname).toBe('.js');
    expect(verifyFile).toBeCalledTimes(1);

    // como fazer em caso de falha?
  });
});

// dois testes falhando
// tradução
// deveria pegar um arquivo, extrair os dados de link de um texto e mostrar ou não
// deveria extrair os dados de link de um texto
// deveria acessar o diretório e mostrar os arquivos que tem nele
// deveria pegar o nome do aqueivo e verificar se a extensão é .md
