#!/usr/bin/env node
const argv = require('./config/yargs').argv;
const colors = require('colors');
var path = require('path');
let fs = require('fs');
const Marked = require('marked');
const fetch = require('node-fetch')


let urlFile = argv._[0];
//console.log(argv, argv.validate);
/** TODO
* Se comprueba que la ruta no sea relativa, en caso de serlo
* se setea una ruta, basada en la ubicacion del proyecto 
**/
if (!path.isAbsolute(urlFile)) {
  urlFile = process.cwd() + '/' + urlFile;
  //console.log('relativa', urlFile);
}


/** TODO
* Se valida la extension del archivo, en caso de no tener se retorna y no se sigue el programa 
**/
if (path.extname(urlFile) !== '.md'){
  console.log('Extension de archivo no Valida'.red);
  return;
}

mdLinks(urlFile, argv);

function mdLinks(urlFile, argv) {
  fs.readFile(urlFile, 'utf-8', (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      myGeneralResponse = [];
      let response = markdownLinkExtractor(data);
      tempArray = data.split('\n');
      
      tempArray.forEach((item,index)=>{
        response.forEach((item1,index1) => {

          if(item.includes(item1.href)){ 
                buildTempData = {};
                buildTempData.urlFile = urlFile;
                buildTempData.href = item1.href
                buildTempData.line = index + 1;
                buildTempData.text = item1.text; 
                myGeneralResponse.push(buildTempData);
                return;
              }
        });
      });
/*--------COMANDOS QUE SE DEBEN EJECUTAR EN LA CONSOLA------*/
      if (argv.validate || argv.stats) {
       validateLink(myGeneralResponse);
    
      } else {
        console.log('sin argumentos');
        showData(myGeneralResponse);
      }    
      
      
    }
  });
};

function showData( objectParam){
  objectParam.forEach((item,index)=>{
    console.log(item.urlFile + ' ' + item.line + ' ' + item.href  + ' ' + item.text )
  });
}

/*--------FUNCION QUE VALIDA EL STATUS DE LOS HTTP DENTRO DEL MD------*/

function validateLink(objectParam){
  
    var urlForValidate=[];
    objectParam.forEach( (element) => {
      urlForValidate.push(fetch(element.href));
    });


    Promise.all(urlForValidate).then(function(response) {
      console.log('myresponse',response,response[1].status);
      console.log('---------------------------------------------'.green);
      for (let index = 0; index < response.length; index++) {
        console.log(" link: " + response[index].url.green);
        console.log('response.status =', response[index].status);
        console.log('response.statusText =', response[index].statusText);
      } 

      }).catch(function(err){
      });
}
/*--------FUNCION QUE EXTRAE LOS LINKSD DEL ARCHIVO MD------*/
function markdownLinkExtractor(markdown) {
  const links = [];

  const renderer = new Marked.Renderer();

  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };
  renderer.image = function(href, title, text) {
      // Remove image size at the end, e.g. ' =20%x50'
      href = href.replace(/ =\d*%?x\d*%?$/, '');
      links.push({
        href: href,
        text: text,
        title: title,
      });
  };
  Marked(markdown, {renderer: renderer});

  return links;
  
}