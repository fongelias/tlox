import commandLineArgs from 'command-line-args';
import readline from 'readline';


// argument parsing
const optionDefinitions = [
  {name: 'sourcePath', type: String, defaultOption: true},
];
const args = commandLineArgs(optionDefinitions);

// prompter
class Prompter {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // on events
    this.rl.on('close', () => {
      console.log('\nexiting tlox console');
      process.exit(0);
    });
  }

  public prompt() {
    this.rl.question("*~tlox~*:", (userInput) => {
      console.log(userInput);
      this.prompt();
    })
  }
}

// errors
const error = (line: number, message: string) => {
  const reportError = () => {
    console.log(`Error at line ${line}: ${message}`);
  }

  reportError();
}

// Tokens
 type TokenType = SingleCharacterTokens | TwoCharacterTokens | Literals | Keywords;

 enum SingleCharacterTokens {
   LEFT_PAREN,
   RIGHT_PAREN,
   LEFT_BRACE,
   RIGHT_BRACE,
   COMMA,
   DOT,
   MINUS,
   PLUS,
   SEMICOLON,
   SLASH,
   STAR,
   BANG,
   EQUAL,
   GREATER,
   LESS,
 }

 enum TwoCharacterTokens {
   BANG_EQUAL,
   EQUAL_EQUAL,
   GREATER_EQUAL,
   LESS_EQUAL,
   EOF,
 }

 enum Literals {
   IDENTIFIER,
   STRING,
   NUMBER,
 }

 enum Keywords {
   AND,
   OR,
   CLASS,
   TRUE,
   FALSE,
   FUN,
   FOR,
   IF,
   ELSE,
   NIL,
   PRINT,
   RETURN,
   SUPER,
   THIS,
   VAR,
   WHILE,
 }



// main
const main = () => {
  if(args.sourcePath) {
    // source file specified, compile source
    console.log(args);
  } else {
    // default prompt usage
    const prompter = new Prompter();
    prompter.prompt();
  }
}

main();