const router = require('express').Router();
const Routes = require('./routes/');
router.use('/utm', Routes.utm)
module.exports = router;