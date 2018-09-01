#!/usr/bin/env node
const argv = require('./config/yargs').argv;
const colors = require('colors');
var path = require('path');
let fs = require('fs');
const Marked = require('marked');
const fetch = require('node-fetch');
var request = require('request');



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
if (path.extname(urlFile) !== '.md')
  return;

mdLinks(urlFile, argv);

function mdLinks(urlFile, argv) {
  fs.readFile(urlFile, 'utf-8', (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      myGeneralResponse = {};
      //console.log(data);
      let response = markdownLinkExtractor(data);
      //console.log(response);

      tempArray = data.split('\n');
      console.log(tempArray);
      response.forEach((item1,index1) => {
            console.log('href=>',item1.href,'item1=>',tempArray.indexOf(item1.href));
      });
      return;
      let miLinks = links;
      let linksArray = [];
miLinks.forEach( function(element) {
   
    linksArray.push(fetch(element.href))
    });


    Promise.all(linksArray).then(function(response) {
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
  });


  if (argv.validate || argv.stats) {
    //console.log('argumentos validate');

  } else {
    //console.log('sin argumentos');
  }

};

//funcion que extrae los links del archivo.md
function markdownLinkExtractor(markdown) {
  const links = [];

  const renderer = new Marked.Renderer();
  renderer.link = function (href, title, text) {
    links.push({
      href: href,
      title: title,
      text: text
    });
  };
  let myTempMarked = Marked(markdown, { renderer: renderer })
  
  
  
  //myArrayMarked.forEach( (item, index) =>{
  //  links.forEach((item1,index1) => {
    //    console.log('item1=>',myArrayMarked.indexOf(item1.href));
  //  });
  //} );
  return links;
  
}


