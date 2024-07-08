class Interpreter {
    constructor() {
        this.variables = {};
    }

    visit(node) {
        switch (node.type) {
            case 'NUMBER':
                return node.value;
            case 'IDENTIFIER':
                if (this.variables[node.value] !== undefined) {
                    return this.variables[node.value];
                } else {
                    throw new Error(`Undefined variable: ${node.value}`);
                }
            case 'ASSIGN':
                this.variables[node.value.id.value] = this.visit(node.value.value);
                return null;
            case 'PRINT':
                console.log(this.visit(node.value));
                return null;
            case 'PLUS':
                return this.visit(node.value.left) + this.visit(node.value.right);
            case 'MINUS':
                return this.visit(node.value.left) - this.visit(node.value.right);
            case 'MUL':
                return this.visit(node.value.left) * this.visit(node.value.right);
            case 'DIV':
                return this.visit(node.value.left) / this.visit(node.value.right);
            default:
                throw new Error(`Unknown node type: ${node.type}`);
        }
    }

    interpret(ast) {
        for (const node of ast) {
            this.visit(node);
        }
    }
}

module.exports = { Interpreter };
