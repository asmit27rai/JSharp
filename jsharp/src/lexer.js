class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

const TokenType = {
    NUMBER: 'NUMBER',
    IDENTIFIER: 'IDENTIFIER',
    ASSIGN: 'ASSIGN',
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    MUL: 'MUL',
    DIV: 'DIV',
    PRINT: 'PRINT',
    LPAREN: 'LPAREN',
    RPAREN: 'RPAREN',
    EOF: 'EOF'
};

class Lexer {
    constructor(input) {
        this.input = input;
        this.pos = 0;
        this.currentChar = input[this.pos];
    }

    advance() {
        this.pos++;
        this.currentChar = this.pos < this.input.length ? this.input[this.pos] : null;
    }

    skipWhitespace() {
        while (this.currentChar && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }

    number() {
        let result = '';
        while (this.currentChar && /\d/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        return new Token(TokenType.NUMBER, parseInt(result, 10));
    }

    identifier() {
        let result = '';
        while (this.currentChar && /[a-zA-Z]/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        return new Token(result.toUpperCase() === 'PRINT' ? TokenType.PRINT : TokenType.IDENTIFIER, result);
    }

    getNextToken() {
        while (this.currentChar) {
            if (/\s/.test(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }

            if (/\d/.test(this.currentChar)) {
                return this.number();
            }

            if (/[a-zA-Z]/.test(this.currentChar)) {
                return this.identifier();
            }

            if (this.currentChar === '=') {
                this.advance();
                return new Token(TokenType.ASSIGN, '=');
            }

            if (this.currentChar === '+') {
                this.advance();
                return new Token(TokenType.PLUS, '+');
            }

            if (this.currentChar === '-') {
                this.advance();
                return new Token(TokenType.MINUS, '-');
            }

            if (this.currentChar === '*') {
                this.advance();
                return new Token(TokenType.MUL, '*');
            }

            if (this.currentChar === '/') {
                this.advance();
                return new Token(TokenType.DIV, '/');
            }

            if (this.currentChar === '(') {
                this.advance();
                return new Token(TokenType.LPAREN, '(');
            }

            if (this.currentChar === ')') {
                this.advance();
                return new Token(TokenType.RPAREN, ')');
            }

            throw new Error(`Unknown character: ${this.currentChar}`);
        }

        return new Token(TokenType.EOF, null);
    }
}

module.exports = { Lexer, TokenType, Token };
