const fs = require('fs');
const { Lexer } = require('./lexer');
const { Parser } = require('./parser');
const { Interpreter } = require('./interpreter');

if (process.argv.length < 3) {
    console.error('Usage: node main.js <source_file>');
    process.exit(1);
}

const sourceFile = process.argv[2];

fs.readFile(sourceFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        process.exit(1);
    }

    const lexer = new Lexer(data);
    const parser = new Parser(lexer);
    const interpreter = new Interpreter();
    const ast = parser.parse();
    interpreter.interpret(ast);
});
