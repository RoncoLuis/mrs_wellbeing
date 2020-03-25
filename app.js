const argv = require("./config/yargs").argv;
const TJBot = require('tjbot');
const tjconfig = require('./tjbot-config/tjbot-config');
const tjfunctions = require('./tjbot-config/tjFunctions');

let comando = argv._[0]; //accediendo a los comandos en el arreglo _
let tj = new TJBot(tjconfig.hardware, tjconfig.tjbot_config, tjconfig.ibm_credentials);
let tj_name = tjconfig.tjbot_config.robot.name; //nombre del robot y palabra clave para deterner la app
let filePath = tjfunctions.getFileAccess(argv.username); //url de acceso al archivo

switch (comando) {
    case ('iniciar'):
        tjfunctions.create_file(filePath);
        console.log("TJBot ahora esta escuchando...");
        tj.listen((voz) => {
            let voiceToTxt = voz.toLowerCase(); //todo el texto se convierte a minusculas

            if (voiceToTxt.startsWith(tj_name.toLowerCase())) {
                console.log('Se detecto la palabra clave', tj_name, 'adiós');
                tjfunctions.exit_app();
            }

            if (voiceToTxt.length > 10) {
                tjfunctions.fill_conversation(voiceToTxt, filePath);
            } else {
                console.log(voiceToTxt, ' ==== No analizado..');
            }
        });
        break;

    case ('procesar'):
        /**TODO si el archivo no existe. Informar que puede ser de otro dia o que inicie una nueva conversación */
        tjfunctions.getData(filePath, (err, data) => {
            tj.translate(data, 'es', 'en').then(engData => {
                console.log(engData.translations[0].translation);
                tj.analyzeTone(JSON.stringify(engData)).then(tone => {
                    console.log(tone.document_tone);
                });
            });
        });

        // tj.translate(JSON.stringify(data), "es", "en").then((response) => {
        //     var englishData = response.translations[0].translation;
        //     console.log("mi data", englishData);

        //     tj.analyzeTone(englishData).then(resp => {
        //         console.log(resp.document_tone);
        //     });
        // });
        break;

    case ('salir'):
        console.log("Adiós");
        tjfunctions.exit_app();
        break;
}