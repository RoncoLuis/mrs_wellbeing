const tjconfig = require('./tjbot-config/tjbot-config');
const tjfunctions = require('./tjbot-config/tjFunctions');
const TJBot = require('tjbot');
const colors = require('colors');

var tj = new TJBot(tjconfig.hardware, tjconfig.tjbot_config, tjconfig.ibm_credentials);
var tj_name = tjconfig.tjbot_config.robot.name;

var filePath = tjfunctions.create_file("luiseduardo");
console.log("TJBot ahora esta escuchando...");

tj.listen((msg) => {
    let voiceToTxt = msg.toLowerCase(); //todo el texto se convierte a minusculas
    if (voiceToTxt.startsWith(tj_name.toLowerCase())) {
        console.log('Perfecto se reconocion la palabra', tj_name);
        // data = tjfunctions.getListado();
        // console.log(data);
        // tj.translate(JSON.stringify(data), "es", "en").then((response) => {
        //     console.log(response.translations[0].translation);
        //     var newData = response.translations[0].translation;
        //     var translate = tj.analyzeTone(newData).then(resp => {
        //         console.log(resp);
        //     });
        // });
    }

    if (voiceToTxt.length > 10) {
        tjfunctions.fill_conversation(voiceToTxt, filePath);
        console.log(voiceToTxt);
    } else {
        console.log(voiceToTxt, ' ==== No analizado..');
    }
});