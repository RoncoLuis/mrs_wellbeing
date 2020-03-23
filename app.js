const tjconfig = require('./tjbot-config/tjbot-config');
const tjfunctions = require('./tjbot-config/tjFunctions');
const TJBot = require('tjbot');
const colors = require('colors');

var tj = new TJBot(tjconfig.hardware, tjconfig.tjbot_config, tjconfig.ibm_credentials); //instancia TJBot
var tj_name = tjconfig.tjbot_config.robot.name;
console.log(colors.yellow(`Hola. Mi nombre es ${tj_name}. Estoy listo para comenzar, para detenerme solo di mi nombre`));

tj.listen((msg) => {
    if (msg.toLowerCase().startsWith(tj_name.toLowerCase())) {
        console.log('perfecto dijiste mi nombre correctamente. Esta fue la conversacion:');
        data = tjfunctions.getListado();
        console.log(data);
        tj.translate(JSON.stringify(data), "es", "en").then((response) => {
            console.log(response.translations[0].translation);
            var newData = response.translations[0].translation;
            var translate = tj.analyzeTone(newData).then(resp => {
                console.log(resp);
            });
        });
    }
    try {
        var txt = msg.toLowerCase();
        if (txt.length > 5) {
            tjfunctions.crear(msg.toLowerCase());
            console.log(txt);
        } else {
            console.log(msg.toLowerCase(), ' ==== No analizado');
        }
    } catch (error) {
        console.log("mi error", error);
    }
});

// perform sentiment analysis every N seconds
// setInterval(function() {
//     console.log("Performing sentiment analysis of the tweets");
//     shineFromTweetSentiment();
// }, SENTIMENT_ANALYSIS_FREQUENCY_MSEC);