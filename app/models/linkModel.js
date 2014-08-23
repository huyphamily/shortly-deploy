var mongoose = require('mongoose');
var crypto = require('crypto');

var linkSchema = mongoose.Schema({
  url: { type: String, index: { unique: true } },
  base_url: String,
  code: String,
  title: String,
  visits: { type: Number, default: 0}
});

linkSchema.pre('save', function(next){
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;