const fs = require("fs");
const colors = require("colors");

/**Obtiene la ruta de acceso al archivo */
const getFileAccess = (username) => {
    // sintaxis date MM-DD-YYYY. Enero comienza con el mes 0
    let date = new Date();
    return `output/${username}-${date.getMonth()}-${date.getDate()}-${date.getFullYear()}.txt`;
}

const create_file = (fileAcess) => {
    fs.readFile(fileAcess, (err) => {
        if (err) {
            fs.appendFile(fileAcess, '', (err) => {
                if (err) throw err;
                console.log(colors.green("nuevo archivo creado"));
            });
        } else {
            console.log(colors.yellow(`El archivo ${fileAcess} ya existe. Continue con la sesión`));
        }
    });

    return fileAcess;
}

const fill_conversation = (voice, filePath) => {
    fs.appendFile(filePath, voice, (err) => {
        if (err) throw err;
        console.log(colors.green("La información se ha agregado correctamente"));
    });
}

const getData = (filePath, callback) => {
    fs.readFile(filePath, 'utf-8', (err, resp) => {
        if (err) {
            console.log("aqui es");
        }
        callback(null, resp);
    });
}

const exit_app = () => {
    process.exit();
}

module.exports = {
    create_file,
    fill_conversation,
    getData,
    exit_app,
    getFileAccess
}