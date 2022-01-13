const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f6f8958c7274fd1559a3b40710682d7a&query=' + latitude + ',' + longitude //+'&units=k'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect server', undefined)

        } else if (response.body.error) {
            callback('Coordinate error', undefined)
        } else {
            // console.log(response.body.location)
            callback(undefined, {
                temperature: 'It is currently ' + response.body.current.temperature +
                    ' degrees out. It feels like ' + response.body.current.feelslike +
                    ' degrees out.',
                location: response.body.location.name,
                humidity: 'Humidity :- ' + response.body.current.humidity,
                uv_index: 'UV Index :- ' + response.body.current.uv_index
            })
        }
    })
}
module.exports = forecast