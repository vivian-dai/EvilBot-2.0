# EvilBot-2.0
refactoring Evil Bot from Python to TS  
I've decided recreating [Evil Bot](https://github.com/vivian-dai/EvilBot) but in TypeScript is a great way to learn TS. To anyone who looks at this code, I am very sorry 😅

## Usage
`./run.bat` or `npm start` both work

## Creation
Literally just going to stick this here because I don't trust my memory :)  
`npm init` (I forgot to do this and struggled for 30 mins)  
`npm install <package name>` x however many dependancies there are idk  
`npm install tsc` to install tsc (add `-g` for globally)
`tsc --init` to create a giant `tsconfig.json` file with possible options commented out
`npm install tslint` for tsline (also with `-g` for globlly)
`tslint --init` to create `tslint.json` file  
Hello there person (or bot lol) reading this and questioning what I'm doing, I'm sorry :(

## Todo
- [X] make bot run (grrr `npm init`)
- [X] figure out how to have coolio not giant if statement command handler
- [X] figure out how to not import everything one at a time (how to use loop and file reading)
- [X] ~~hmmMMMM maybe *configure the TS --> JS compilation*~~ eh it's functional as of now
- [X] ~~hmmMMM how to use tslint 🤔~~ well really this isn't handled but that's fine
- [X] Haha `run.bat` should be able to be less sketchy if `package.json` was configured in a good way
- [ ] have fun getting EvilBot's functionalities here
  - [ ] events
  - [ ] commands
    - [ ] moderation
    - [ ] gambling
    - [ ] fun
- [ ] make a custom embed class for errors and success to reduce code redundancy 
