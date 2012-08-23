var MongoTools = module.exports = function(obj) {
  if(!(this instanceof MongoTools)) return new MongoTools(obj);
  this._obj = obj;
};

MongoTools.prototype.find = function() {
  return this._obj.slice(0);
};
