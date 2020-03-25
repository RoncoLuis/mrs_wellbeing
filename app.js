const TJBot = require('tjbot');
const tjconfig = require('./tjbot-config/tjbot-config');
const tjfunctions = require('./tjbot-config/tjFunctions');

var tj = new TJBot(tjconfig.hardware, tjconfig.tjbot_config, tjconfig.ibm_credentials);
var tj_name = tjconfig.tjbot_config.robot.name;

var filePath = tjfunctions.create_file("luiseduardo");
console.log("TJBot ahora esta escuchando...");

tj.listen((msg) => {
    let voiceToTxt = msg.toLowerCase(); //todo el texto se convierte a minusculas
    if (voiceToTxt.startsWith(tj_name.toLowerCase())) {
        console.log('Se detecto la palabra', tj_name, 'esta fue la conversación:');
        data = tjfunctions.getListado(filePath);
        console.log(data);

        tj.translate(JSON.stringify(data), "es", "en").then((response) => {
            var newData = response.translations[0].translation;
            tj.analyzeTone(newData).then(resp => {
                console.log(resp.document_tone);
            });
        });
    }

    if (voiceToTxt.length > 10) {
        tjfunctions.fill_conversation(voiceToTxt, filePath);
        // console.log(voiceToTxt);
    } else {
        console.log(voiceToTxt, ' ==== No analizado..');
    }
});