// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting the data source
const restaurantList = require('./restaurant.json')

// routes setting
app.get('/', (req, res) => {
  // past the restaurant data into 'index' partial template
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log('req.params.restaurant_id', req.params.restaurant_id)
  const restaurant = restaurantList.results.find(restaurant => {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  console.log('req.query', req.query)
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  if (restaurants.length > 0) {
    res.render('index', { restaurants: restaurants, keyword: keyword })
  } else {
    res.render('nothing', { keyword: keyword })
  }
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})