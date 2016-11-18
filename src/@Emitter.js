function Emitter(indenter, mainScope) {
   this.code = "";
   this.currentIndentLevel = 0;
   this.currentIndentStr = "";
   this.indenter = indenter || "   ";
   this.synthStack = [];
   this.synth = false;
   this.indentStrCache = [""];
   this.currentLineLengthIncludingIndentation = 0;
   this.maxLineLength = 0;
   this.emitContext = EMIT_CONTEXT_NONE;
   this.prec = PREC_WITH_NO_OP;
   this.isLeft = false;
   this.codeStack = [];
   this.wrap = !false;

   // TODO: dummy scope until things become stable enough
   this.scope = mainScope || new Scope(null, SCOPE_FUNC); 
   this.labelNames = {};
   this.unresolvedLabel = null;
   this.currentContainer = null;
   this.block_stack = [];
   this.labelID = 0;
}

Emitter.prototype.emitters = {};

