var express = require('express'),
    bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var categoryRoutes = require('./routes/category.route')();

app.use('/api/category', categoryRoutes);


app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(port, (err) => {
    console.log("running on port " + port )
});

module.exports = app;