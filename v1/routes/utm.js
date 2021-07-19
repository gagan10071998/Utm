const router = require("express").Router();
const controllers = require('../controllers');

router.post("/", controllers.utm.createUrl);
router.get("/", controllers.utm.getUrl);
module.exports = router