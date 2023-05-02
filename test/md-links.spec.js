const { getInfos } = require('../index.js');

describe('getInfos', () => {
  it ("deveria extrair os dados do link de um texto", ()=>{
    const text = "markdown-it"; 
    const href = "https://github.com/markdown-it/markdown-it"; // href
    const string = `[markdown-it](https://github.com/markdown-it/markdown-it)`; // text interpolar
    const file = "file.md";
    const infos = getInfos(string, file);
    
    expect(infos).toEqual({ href, text, file });
  })

});
// mockar fs 
// mockar obj