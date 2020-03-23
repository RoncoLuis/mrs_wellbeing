const fs = require("fs");
const colors = require("colors");

/**todas las notas se guardaran en un arreglo */
let conversation = [];

/**Funcion crear @param voiceTxt recibe la voz del usuario trasladada en texto y la guarga en un formato JSON válido */
const crear = (voiceTxt) => {

    // cargarDB();

    fs.appendFile('output/message.txt', voiceTxt, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });



    // let json_voiceTxt = {
    //     'Frase': voiceTxt,
    //     /**TODO Investigar que otros parametros utiles puedo ingresar a la bd */
    // };
    // /**se realiza un push del objeto en el arreglo conversation */
    // conversation.push(JSON.stringify(json_voiceTxt));
    guardarDB();

    // return json_voiceTxt;
}

/**para obtener la persistencia, primero debemos cargar la BD y despues hacer el push con guardarDB */
const cargarDB = () => {
    /**aqui se deben manejar las exepciones si el archivo json no es valido */
    try {
        // conversation = require("output/message.txt");
        fs.readFile('output/message.txt', 'utf-8', (err, data) => {
            if (err) {
                console.log('error: ', err);
            } else {
                console.log(data);
                conversation = data;
            }
        });
    } catch (error) {
        /**en caso de error, siempre inicializar un arreglo vacio para que no falle al aplicacion */
        console.log(colors.red(`Se inicializo un arreglo vacío. Error:${error}`));
        conversation = [];
    }
}

/**Guardar conversation en nuestra base de datos en json */
const guardarDB = () => {
    /**el objeto conversation lo debemos pasar a un objeto JSON valido */
    let data = JSON.stringify(conversation);
    /**el json guardado en data se debe guardar en un archivo para la persistencia */
    fs.writeFile("output/data.json", data, (err) => {
        if (err) {
            console.log(colors.red('Error:', err));
        }
    });
}

/**Listar la conversación completa */
const getListado = () => {
    cargarDB();
    return conversation;
}

/**funcion para actualizar las tareas realizadas. Aqui se cambia el valor de completado a true */
const actualizar = (descripcion, completado = true) => {
    cargarDB();
    /**Buscar en conversation la descripcion que coincida con el parametro ingresado. Esto se realiza encontrando el indice en el arreglo que cumpla la condicion */
    /**findIndex recibe un callback */
    let index = conversation.findIndex((tarea) => {
        /**retorna el valor descripcion en conversation cuando es === igual al parametro descripcion. Sino coincide la funcion me regresa -1 */
        return tarea.descripcion === descripcion;
    });
    /**El 0 es la primera posicion del arreglo, por eso es valido que la funcion me retorne 0. No así si la funcion retorna -1 */
    if (index >= 0) {
        conversation[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = conversation.findIndex((tarea) => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        conversation.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

/**se exportan las funciones que se utilizan en app.js */
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}