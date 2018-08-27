const argv = require('./config/yargs').argv;
//const colors = require('colors');
// Llamada a mi libreria
const myMdLink = require('./lib/md-links');
var path = require('path');

let urlFile = argv._[0];

console.log(argv, argv.validate);
    /** TODO
    * Se comprueba que la ruta no sea relativa, en caso de serlo
    * se setea una ruta, basa en la ubicacion del proyecto 
    **/
    if(!path.isAbsolute(urlFile)) {
        urlFile = process.cwd()+'/'+urlFile;
        console.log('relativa',urlFile);
    }


    /** TODO
    * Se valida la extension del archivo, en caso de no tener se retorna y no se sigue el programa 
    **/
   if(path.extname(urlFile)!=='.md')
        return;

        if(argv.validate || argv.stats){
            console.log('argumentos validate');
        }else{
            console.log('sin argumentos');
        }


    console.log('llegue al final');
    
    




