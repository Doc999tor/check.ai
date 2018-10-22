const router = require('express').Router();
const MainCtrl = require('./Controllers/MainCtrl');
const bodyParserUrlencoded = require('body-parser').urlencoded({extended: false});

/* GET home page. */
router.get('/', MainCtrl.getBasic);
router.post('/', bodyParserUrlencoded, MainCtrl.postBasic);

module.exports = router;
