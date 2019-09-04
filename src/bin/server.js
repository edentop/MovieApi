let express = require('express');
let config = require('../config/config');

let app = express();
let port = process.env.PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

let router = express.Router();

router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

router.get('/', function (req, res) {
    res.json({'message': 'Hola mundo desde Movie API Demo'});
});

app.use('', router);
app.use(require('../api'));

app.listen(port, function() {
    console.log ( `Server is running on port ${port}` );
});