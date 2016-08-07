this.write = function(line) {
   var lineLengthIncludingIndentation = 
      this.currentLineLengthIncludingIndentation +
      line.length;
   
   if ( this.maxLineLength &&
        lineLengthIncludingIndentation > this.maxLineLength )
     this.indentForWrap();

   this.code += line;
   this.currentLineLengthIncludingIndentation += line.length; 
};

this.enterSynth = function() {
   this.synthStack.push(this.synth);
   this.synth = !false;
};

this.exitSynth = function() {
   this.assert(this.synthStack.length>=1);
   this.synth = this.pop(); 
};

this.indent = function() {
   this.currentIndentLevel++;
   if ( this.currentIndentLevel >= this.indentStrCache.length )
     this.indentStrCache.push(this.currentIndentStr + this.indenter);

   this.currentIndentStr = this.indentStrCache[this.currentIndentLevel];
   this.currentLineLengthIncludingIndentation = this.currentIndentStr.length;
};

this.unindent = function() {
   this.assert(this.currentIndentLevel > 0);
   this.currentIndentStr = this.indentStrCache[--this.currentIndentLevel];
   this.currentLineLengthIncludingIndentation = this.currentIndentStr.length;
};

this.newlineNoIndent = function() {
  this.code += '\n';
  this.currentLineLengthIcludingIndentation = 0;
};

this.newlineIndent = function() {
  this.code += '\n' + this.currentIndentStr;

  this.currentLineLengthIncludingIndentation = this.currentIndentStr.length;
};

this.indentForWrap = function() {
   if ( this.currentLineLengthIncludingIndentation === 
        this.currentIndentStr.length )
     return;

   var wrapIndenter = this.currentIndentStr + " ";
   this.currentLineLengthIncludingIndentation = wrapIndenter.length ;
   this.code += '\n' + wrapIndenter ;

};

this.assert = function(cond, mesage) {
  if (!cond) throw new Error(message);

};

var has = Object.hasOwnProperty;

this.emit = function(n) {
  if ( !n )
    return;

  this.assert(has.call(this.emitters, n.type), 'No emitter for ' + n.type );
  var emitter = this.emitters[n.type];
  return emitter.call(this, n);
};

