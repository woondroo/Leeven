/**
 * Module dependencies.
 */
var async = require('async');
var FileDao = require('./../dao').FileDao;
var ProjectDao = require('./../dao').ProjectDao;

/**
 * 文档列表
 */
exports.list = function(req, res) {

    ProjectDao.findById(req.params.projectID, function(err, project) {
        FileDao.getList({
            criteria: {
                project_id :req.params.projectID
            }
        }, {
            'createdTime': '-1'
        }, function(err, list) {
            if (!err) {
                return res.render('files/list', {
                    user: req.user,
                    files: list,
                    project: {
                        _id: req.params.projectID,
                        name: project.name
                    }

                });
            } else {
                return res.render('files/list', {
                    user: req.user,
                    project: {
                        _id: req.params.projectID,
                        name: project.name
                    }
                });
            }
        });
    });

};

/**
 * 新建文档
 */
exports.create = function(req, res) {
    req.assert('name', '名称不能为空').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.errMsg(errors);
    };

    var doc = req.body;

    doc.project_id = req.params.projectID;

    console.log(doc);

    FileDao.create(doc, function(err, doc) {
        if (!err) {
            return res.sucMsg();
        } else {
            return res.errMsg([{
                msg: '创建失败，请稍后重试'
            }]);
        }
    });
};

/**
 * 编辑文档
 */
exports.update = function(req, res) {
    req.assert('name', '名称不能为空').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        return res.errMsg(errors);
    };

    FileDao.update({
        _id: req.params.fileID
    }, req.body, '', function(err) {
        if (!err) {
            return res.sucMsg();
        } else {
            return res.errMsg([{
                msg: '编辑失败，请稍后重试'
            }]);
        }
    });
};

/**
 * 删除文档
 */
exports.del = function(req, res) {
    if (req.params.fileID) {
        FileDao.del({
            _id: req.params.fileID
        }, function(err) {
            if (!err) {
                return res.sucMsg();
            } else {
                return res.errMsg([{
                    msg: '删除失败，请稍后重试'
                }]);
            }
        });
    } else {
        return res.errMsg([{
            msg: '参数错误，删除失败。'
        }]);
    }
};
