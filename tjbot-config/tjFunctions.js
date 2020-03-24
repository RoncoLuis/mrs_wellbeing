const fs = require("fs");
const colors = require("colors");

/**todas las notas se guardaran en un arreglo */
let conversation = [];

const create_file = (username) => {
    // sintaxis date MM-DD-YYYY. Enero comienza con el mes 0
    let date = new Date();
    /**Obtenemos string que será la url de acceso al archivo */
    username = `${username}-${date.getMonth()}-${date.getDate()}-${date.getFullYear()}.txt`;

    fs.readFile(`output/${username}`, (err) => {
        if (err) {
            fs.appendFile(`output/${username}`, '', (err) => {
                if (err) throw err;
                console.log(colors.green("archivo creado"));
            });
        } else {
            console.log(colors.yellow("El archivo ya extiste"));
        }
    });
    return `output/${username}`;
}

const fill_conversation = (voice, filePath) => {
    fs.appendFile(`${filePath}`, voice, (err) => {
        if (err) throw err;
        console.log(colors.green("La información se ha agregado correctamente"));
    });
}

const cargarDB = (filePath) => {
    fs.readFile(`${filePath}`, 'utf-8', (err, data) => {
        if (err) {
            console.log('error: ', err);
        } else {
            console.log(data);
            conversation = data;
        }
    });
}

/**Listar la conversación completa */
const getListado = () => {
    cargarDB();
    return conversation;
}

/**se exportan las funciones que se utilizan en app.js */
module.exports = {
    create_file,
    fill_conversation,
    getListado
}