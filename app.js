var express = require('express'),
    bodyParser = require('body-parser')
    cors = require('cors');

var app = express();
var port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var categoryRoutes = require('./routes/category.route')();

var whitelist = ['http://localhost:3000'];

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1){
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions);
}

app.use(cors(corsOptionsDelegate));

app.use('/api/category', categoryRoutes);

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(port, (err) => {
    console.log("running on port " + port )
});

module.exports = app;