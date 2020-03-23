const argv = require("yargs").command("iniciar", "Comando para saludar al usuario e iniciar la aplicación", {
    nombre: {
        demand: true,
        alias: 'n',
        desc: 'nombre del usuario'
    }
}).command("salir", "Comando para salir de la aplicación", {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Salir de la interfaz'
    }
}).help().argv;

module.exports = {
    argv
}