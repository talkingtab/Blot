var drafts = require('../../drafts');
var helper = require('../../helper');
var previewPath = drafts.previewPath;
var ensure = helper.ensure;
var Blog = require('blog');

module.exports = function (blogID, path, callback) {

  callback = callback || console.log;

  ensure(blogID, 'string')
    .and(path, 'string')
    .and(callback, 'function');

  var clients = require('clients');

  Blog.get({id: blogID}, function(err, blog){

    if (err) return callback(err);

    if (!blog.client) return callback();

    var preview_path = previewPath(path);
    var client = clients[blog.client];

    client.remove(blogID, preview_path, callback);
  });
};