const descripcion = {
    demand: true,
    alias: 'v',
    desc: 'debe hacer una petición HTTP para averiguar si el link funciona o no'
};

const descripcions = {
    demand: true,
    alias: 's',
    desc: 'muestra estadísticas del archivo'
};

const argv = require('yargs')
    .command('validate', 'petición HTTP para averiguar si el link funciona o no', {
        descripcion
    })
    .command('stats', 'muestra estadísticas del archivo', {
        descripcions
    })
    .help()
    .argv;


module.exports = {
    argv
}