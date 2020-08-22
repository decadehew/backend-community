const combineRouters = require('koa-combine-routers');
const dogRouter = require('./dogRouter');
const catRouter = require('./catRouter');

const router = combineRouters(
  dogRouter,
  catRouter
)
 
module.exports = router;
