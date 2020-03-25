const opciones = {
    username: {
        demand: true,
        alias: 'u',
        desc: 'nombre de usuario'
    }
}

const argv = require("yargs")
    .command("iniciar", "Comando para iniciar la aplicación", opciones)
    .command("procesar", "Comando para obtener los resultados de la sesión", opciones)
    .command("salir", "Comando para salir de la aplicación", opciones)
    .help().argv;

module.exports = {
    argv
}