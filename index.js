const argv = require('./config/yargs').argv;
//const colors = require('colors');
// Llamada a mi libreria
const myMdLink = require('./lib/md-links');
var path = require('path');
let fs = require('fs');
const Marked = require('marked');


let urlFile = argv._[0];
console.log(argv, argv.validate);
/** TODO
* Se comprueba que la ruta no sea relativa, en caso de serlo
* se setea una ruta, basada en la ubicacion del proyecto 
**/
if (!path.isAbsolute(urlFile)) {
  urlFile = process.cwd() + '/' + urlFile;
  console.log('relativa', urlFile);
}


/** TODO
* Se valida la extension del archivo, en caso de no tener se retorna y no se sigue el programa 
**/
if (path.extname(urlFile) !== '.md')
  return;

mdLinks(urlFile, argv);

function mdLinks(urlFile, argv) {

  fs.readFile(urlFile, 'utf-8', (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log(data);
      let response = markdownLinkExtractor(data);
      console.log(response);
    }
  });


  if (argv.validate || argv.stats) {
    console.log('argumentos validate');

  } else {
    console.log('sin argumentos');
  }

};

//funcion que extrae los links del archivo.md
function markdownLinkExtractor(markdown) {
  const links = [];

  const renderer = new Marked.Renderer();

  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function (href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };
  renderer.image = function (href, title, text) {
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };
  Marked(markdown, { renderer: renderer });

  return links;
};