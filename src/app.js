const path = require('path')
const express = require('express') //function not any object
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utills/geocode')
const forecast = require('./utills/forecast')

const app = express()
const port = process.env.PORT || 3000 //env stands for environment to acess environment variable   and default callback for running code in our local system

//Define paths for express config
// console.log(__dirname)
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlers engine and views location
app.set('view engine', 'hbs') // to use handlebars for templating
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory for serve
app.use(express.static(publicDirectorypath))


app.get('', (req, res) => {
    res.render('home', {
        title: 'Home',
        name: 'Adarsh'
    })
})

app.get('/help_', (req, res) => {
    res.render('help_', {
        title: 'Help!',
        name: 'Adarsh',
        helptext: 'This is help webpage'
    })
})

app.get('/weather', (req, res) => {


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        // data_forecast = data
        forecast(latitude, longitude, (error, data_forecast) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                latitude: latitude,
                longitude: longitude,
                location: location,
                temperature: data_forecast,
                humidity: data_forecast.humidity,
                uv_index: data_forecast.uv_index
            })
        })
    })

    // res.send({
    //     forecast: 'it is so cold',
    //     location: 'Kanpur, UP',
    //     address: req.query.address
    // })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me!',
        name: 'Adarsh Anand',
        age: 21
    })
})

app.get('/help_/*', (req, res) => {
    res.render('404_pages', {
        title: '404',
        name: 'Adarsh',
        errormsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404_pages', {
        title: '404',
        name: 'Adarsh',
        errormsg: 'page not found'
    })
})



// app.get('/about', (req, res) => {
//     res.send('this is about page')
// })

// app.get('/weather', (req, res) => {
//     res.render('weather')
// })

//need to change port value for heroku to provide us a value
app.listen(port, () => {
    console.log('server is up on port' + port)
})