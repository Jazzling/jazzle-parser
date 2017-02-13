this.indent = function() {
  this.indentLevel++; 
};

this.i = function() {
  this.indent();
  return this; 
};

this.l = function() {
  this.startLine();
  return this; 
};

this.emitAny = function(n, prec, startStmt) {
  if (HAS.call(Emitters, n.type))
    return Emitters[n.type].call(this, n, prec, startStmt);
  this.err('unknow.node');
};

this.eA = function(n, prec, startStmt) {
  this.emitAny(n, prec, startStmt); 
  return this; 
};

this.emitNonSeq = function(n, prec, flags) {
  var paren = n.type === 'SequenceExpression';
  if (paren) this.w('(');
  this.emitAny(n, prec, flags);
  if (paren) this.w(')');
};

this.eN = function(n, prec, flags) {
  this.emitNonSeq(n, prec, flags);
  return this;
};

this.write = function(rawStr) {
  if (this.lineStarted) {
    this.code += this.getOrCreateIndent(this.indentLevel);
    this.lineStarted = false;
  }
  this.code += rawStr;
};

this.w = function(rawStr) {
  this.write(rawStr);
  return this;
};

this.space = function() {
  if (this.lineStarted)
    this.err('useless.space');

  this.write(' ');
};

this.s = function() {
  this.space();
  return this;
};

this.writeMulti =
this.wm = function() {
  var i = 0;
  while (i < arguments.length) {
    var str = arguments[i++];
    if (str === ' ')
      this.space();
    else
      this.write(str);
  }

  return this;
};

this.unindent = function() {
  if (this.indentLevel <= 0)
    this.err('unindent.nowidth');

  this.indentLevel--;
};

this.u = function() {
  this.unindent();
  return this;
};

this.getOrCreateIndent = function(indentLen) {
  var cache = this.indentCache;
  if (indentLen >= cache.length) {
    if (indentLen !== cache.length)
      this.err('inceremental.indent');
    cache.push(cache[cache.length-1] + this.spaceString);
  }
  return cache[indentLen];
};

this.startLine = function() {
  this.insertNL();
  this.lineStarted = true;
};

this.insertNL = function() {
  this.code += '\n';
};
