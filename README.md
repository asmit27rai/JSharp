# J#: A Programming Language Built on Top of JavaScript

## Introduction

J# is a new programming language built on top of JavaScript, designed to offer a more streamlined and expressive syntax for common programming tasks. Leveraging the powerful runtime of JavaScript, J# aims to simplify code writing and enhance readability without sacrificing performance. The language is currently in its early stages of development, with basic arithmetic operations implemented and more features on the way.

## Features (Current)

1. **Basic Arithmetic Operations**:

2. **Variable Assignment**:

3. **Print Function**:

## Features (Upcoming)

- **Conditional Statements**:
    - Implementation of `if-else` statements for conditional logic.
  
- **Loops**:
    - Support for `while` and `for` loops to facilitate repetitive tasks.

- **Functions**:
    - Define and call functions to organize and reuse code.

## How It Works

J# compiles to JavaScript, allowing it to run in any environment that supports JavaScript. The language uses a lexer and parser to process the source code, generate an Abstract Syntax Tree (AST), and then produce the equivalent JavaScript code.

## Test The Code
-  Code In test.jsharp file
-  Run `npm start` in terminal

## Example Code

Here's a simple J# program that demonstrates the current features:

```jsharp
// Variable assignment
x = 27
y = 32
z = 54

// Print results
x = 27
y = 32
z = 54
print ((x+y)-z)*x/y
