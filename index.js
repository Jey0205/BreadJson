const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const fs = require('fs')
let readData = () => JSON.parse(fs.readFileSync('data.json','utf-8'))
let writeData = (data) => fs.writeFileSync('todo.json', JSON.stringify(data, null, 3));
let datas = readData()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  
    res.render('index', {data: datas})
})
app.get('/add',(req, res) => {
    res.render('add')
})
app.post('/add', (req, res) => {
    datas.push({string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean});
    writeData(datas);
    res.redirect('/')
  })
  app.get('/delete/:id', (req, res) => {
    let index = req.params.id;
    datas.splice(index,1)
    res.redirect('/')
  })
  
  app.get('/edit/:id', (req,res) => {
    let index = req.params.id;
    res.render('edit', {data: datas[index]})
  })
  app.post('/edit/:id', (req, res) => {
    let index = req.params.id;
    
    datas[index] = {string: req.body.string, integer: req.body.integer, float: req.body.float, date: req.body.date, boolean: req.body.boolean}
    res.redirect('/')
  })



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})