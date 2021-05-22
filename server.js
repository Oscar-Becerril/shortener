const express = require('express');
const connectDB = require('./config/db');
const Url = require('./models/Url');

connectDB();

const app = express();


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

app.get('/', async (req, res) =>{
    const shortURLs = await Url.find()
    res.render('index', {shortURLs: shortURLs})
});

app.post('/shortURL', async (req, res) =>{
    await Url.create({
        longURL: req.body.longURL
    })

    res.redirect('/')
});

app.get('/:shortURL', async (req, res) => {
    const short = await Url.findOne({shortURL: req.params.shortURL})
    if(short == null){
        return res.sendStatus(404, "Short Route not Found")
    }

    res.redirect(short.longURL)
});

app.listen(process.env.PORT || 5000)