const router = require('express').Router();
const VastsCtrl = require('../Controllers/VastsCtrl');
const VastValidator = require('../Validators/VastValidator');
const bodyParserUrlencoded = require('body-parser').urlencoded({extended: false});

/* GET home page. */
router.get('/', VastsCtrl.getAll);
router.get('/:vast_id(\\d+)', VastsCtrl.getOne);
router.post('/', bodyParserUrlencoded, VastValidator.validateVastMiddleware, VastsCtrl.addOne);

module.exports = router;
