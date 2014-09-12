/**
 * Module dependencies.
 */
var members = require('./../controllers/members');


/**
 *  成员
 */
module.exports = function(app, auth) {

  //获取成员列表
  app.get('/members/:groupID', auth.needToLogin, members.list);


}