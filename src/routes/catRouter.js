const Router = require('koa-router');
const cat = require('../api/cat');

const router = new Router();

router.get('/cat', cat);

module.exports = router;
