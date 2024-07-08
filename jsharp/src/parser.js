const { TokenType } = require('./lexer');

class ASTNode {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        this.currentToken = lexer.getNextToken();
    }

    eat(tokenType) {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.lexer.getNextToken();
        } else {
            throw new Error(`Expected token type ${tokenType} but got ${this.currentToken.type}`);
        }
    }

    factor() {
        const token = this.currentToken;
        if (token.type === TokenType.NUMBER) {
            this.eat(TokenType.NUMBER);
            return new ASTNode('NUMBER', token.value);
        } else if (token.type === TokenType.IDENTIFIER) {
            this.eat(TokenType.IDENTIFIER);
            return new ASTNode('IDENTIFIER', token.value);
        } else if (token.type === TokenType.LPAREN) {
            this.eat(TokenType.LPAREN);
            const node = this.expr();
            this.eat(TokenType.RPAREN);
            return node;
        }
        throw new Error('Invalid syntax');
    }

    term() {
        let node = this.factor();

        while (this.currentToken.type === TokenType.MUL || this.currentToken.type === TokenType.DIV) {
            const token = this.currentToken;
            if (token.type === TokenType.MUL) {
                this.eat(TokenType.MUL);
            } else if (token.type === TokenType.DIV) {
                this.eat(TokenType.DIV);
            }
            node = new ASTNode(token.type, { left: node, right: this.factor() });
        }

        return node;
    }

    expr() {
        let node = this.term();

        while (this.currentToken.type === TokenType.PLUS || this.currentToken.type === TokenType.MINUS) {
            const token = this.currentToken;
            if (token.type === TokenType.PLUS) {
                this.eat(TokenType.PLUS);
            } else if (token.type === TokenType.MINUS) {
                this.eat(TokenType.MINUS);
            }
            node = new ASTNode(token.type, { left: node, right: this.term() });
        }

        return node;
    }

    assignment() {
        const id = this.currentToken;
        this.eat(TokenType.IDENTIFIER);
        this.eat(TokenType.ASSIGN);
        const value = this.expr();
        return new ASTNode('ASSIGN', { id, value });
    }

    statement() {
        if (this.currentToken.type === TokenType.PRINT) {
            this.eat(TokenType.PRINT);
            const value = this.expr();
            return new ASTNode('PRINT', value);
        } else if (this.currentToken.type === TokenType.IDENTIFIER) {
            return this.assignment();
        }
        throw new Error('Invalid syntax');
    }

    parse() {
        const nodes = [];
        while (this.currentToken.type !== TokenType.EOF) {
            nodes.push(this.statement());
        }
        return nodes;
    }
}

module.exports = { Parser, ASTNode };
