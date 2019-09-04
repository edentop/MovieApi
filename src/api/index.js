let router = require('express').Router();

router.use('/api', require('./movies'));

module.exports = router;