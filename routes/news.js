/**
 * Module dependencies.
 */
var news = require('./../controllers/news');


/**
 *  动态
 */
module.exports = function(app, auth) {

  //获取列表
  app.get('/news/:groupID', auth.needToLogin, news.list);


}