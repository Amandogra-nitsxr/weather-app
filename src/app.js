const path = require('path')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')
const express = require('express')
const app = express()

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('/', (req, res)=>{
    res.render('index', {
        title: "Index Page",
        name: "Amandeep Dogra"
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About page"
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: "Help Page",
        name: "Amandeep Dogra"
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: "Provide some address"
        })
    }

    const {address} = req.query
    geocode(address, (error, {latitude, longitude, place}={})=>{
        if(error){
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send(error)
            }
            res.send({
                forecastData,
                place
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "Not available"
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: "404 Not Found",
        name:"Amandeep",
        errorMessage: "Something went wrong on help page"
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: "404 Not Found",
        name:"Amandeep",
        errorMessage: "Something went wrong"
    })
})

app.listen(3000, ()=>{
    console.log("Server started!!")
})