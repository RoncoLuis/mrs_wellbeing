/**Apikey y Url de conexión a los servicios de IBM Cloud */
let ibm_credentials = {
    speech_to_text: {
        "apikey": "tsKHiaDmUGj-C7gbiSaZXzOyKErSQRxRV0ZSSIKLRlLm",
        "url": "https://stream.watsonplatform.net/speech-to-text/api"
    },
    tone_analyzer: {
        "apikey": "gmkaEgM6PrjwMPYJZN6xo0dCGJoaAUuQ3Wh0J3_ZWnqF",
        "url": "https://gateway.watsonplatform.net/tone-analyzer/api"
    },
    language_translator: {
        "apikey": "6m-s-EYgj900dp0kBgAxw6OzPcY9XTQ5V9LwFKc6Xacq",
        "url": "https://api.us-south.language-translator.watson.cloud.ibm.com/instances/f2c36ec8-e6ff-4298-9094-27d5689e196b"
    }
}

/**configuración del robot */
let tjbot_config = {
    log: {
        level: 'error' // valid levels are 'error', 'warn', 'info', 'verbose', 'debug', 'silly'
    },
    robot: {
        gender: 'male',
        name: 'robot'
    },
    listen: {
        inactivityTimeout: 120, // -1 to never timeout or break the connection. Set this to a value in seconds e.g 120 to end connection after 120 seconds of silence
        language: 'es-MX'
    }
}

/**hardware que utilizará el robot */
let hardware = ['led', 'servo', 'microphone'];


module.exports = {
    ibm_credentials,
    hardware,
    tjbot_config,
}