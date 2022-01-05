# Notes

> notes taken during the course

<!-- https://gitignore.io -->
<!-- https://github.com/github/gitignore -->

https://www.conventionalcommits.org/en/v1.0.0/

## CLASS-0

```sh
npm init -y

npm i -D git-commit-msg-linter
npm i -D typescript @types/node

npm i -D eslint
```


### VS Code 

ESLint  
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

-> ESLint: Create ESLint configuration

How would you like to use ESLint?  
To check syntax, find problems, and enforce code style

What type of modules does your project use?  
CommonJS

Which framework does your project use?  
None of these

Does your project use TypeScript?  
Yes

Where does your code run?  
Node

How would you like to define a style for your project?  
Use a popular style guide

Which style guide do you want to follow?  
❯ Standard: https://github.com/standard/standard

What format do you want your config file to be in?  
JSON

Would you like to install them now with npm?  
Yes

```sh
npm i -D husky
npm set-script prepare "husky install"
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged"

npm i -D lint-staged

npm i -D jest @types/jest ts-jest
./node_modules/.bin/jest --init
```
Would you like to use Jest when running "test" script in "package.json"?  
Y

Would you like to use Typescript for the configuration file?   
N

Choose the test environment that will be used for testing  
Node

Do you want Jest to add coverage reports?  
y

Which provider should be used to instrument code for coverage?  
v8

 Automatically clear mock calls, instances and results before every test?  
 y

### VS Code
NPM-Scripts  
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=jianglinghao.vscode-npm-scripts
## CLASS-1

Dev Process

TDD

## CLASS-2

## CLASS-3

## CLASS-4

## CLASS-6

## CLASS-7

## CLASS-8

## CLASS-9

## CLASS-10

## CLASS-12

## CLASS-13

```sh
npm i express
npm i -D @types/express

npm i -D supertest @types/supertest
```

## CLASS-14
## 

## CLASS-15

```sh
# rm -rf for node. To remove dist folder
npm i -D rimraf @types/rimraf

# Map ts paths to js files
npm i module-alias 
npm i -D @types/module-alias
```
## CLASS-16

https://github.com/shelfio/jest-mongodb

```sh
# Lig to test mongodb in memory
npm i -D @shelf/jest-mongodb

npm i mongodb
npm i -D @types/mongodb
```
