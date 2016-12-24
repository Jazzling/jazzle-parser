var ERR_NONE_YET = 0,
    // [(a)] = 12;
    ERR_PAREN_UNBINDABLE = ERR_NONE_YET + 1,

    // { a = 12 };
    ERR_SHORTHAND_UNASSIGNED = ERR_PAREN_UNBINDABLE + 1,

    // [...a, b] = [...e,] = 12 
    ERR_NON_TAIL_REST = ERR_SHORTHAND_UNASSIGNED + 1,

    // [arguments, [arguments=12], [arguments]=12, eval] = 'l'
    ERR_ARGUMENTS_OR_EVAL_ASSIGNED = ERR_NON_TAIL_REST + 1,

    // function* l() { ([e=yield])=>12 }
    ERR_YIELD_OR_SUPER = ERR_ARGUMENTS_OR_EVAL_ASSIGNED + 1,

    // (a, ...b)
    ERR_UNEXPECTED_REST = ERR_YIELD_OR_SUPER + 1,

    // ()
    ERR_EMPTY_LIST_MISSING_ARROW = ERR_UNEXPECTED_REST + 1,

    // (a,)
    ERR_NON_TAIL_EXPR = ERR_EMPTY_LIST_MISSING_ARROW + 1,

    // async a
    ERR_INTERMEDIATE_ASYNC = ERR_NON_TAIL_EXPR + 1,

    ERR_ARGUMENTS_OR_EVAL_DEFAULT = ERR_INTERMEDIATE_ASYNC + 1;

