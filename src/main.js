#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = require("path");
const url_1 = require("url");
const chalk_1 = __importDefault(require("chalk"));
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = (0, path_1.dirname)(__filename);
const filePath = (0, path_1.join)(__dirname, '../data.json');
let data = await promises_1.default.readFile(filePath, "utf-8");
const questionsObject = JSON.parse(data);
let loop = 1;
let questionsArr = questionsObject.map((item) => {
    let single_question = {
        message: item.question,
        type: "list",
        choices: item.choices,
        name: "ques_" + loop,
    };
    loop++;
    return single_question;
});
console.log(chalk_1.default.greenBright.bold("Welcome to TypeScript Quiz!!"));
let answers = await inquirer_1.default.prompt(questionsArr);
let answersArr = Object.values(answers);
questionsObject.forEach((item, index) => {
    if (answersArr[index] == item.answer) {
        console.log(chalk_1.default.blueBright.bold(`\nQuestion # ${index + 1}: ${item.question}`));
        console.log(chalk_1.default.yellow.bold(`Your answer is Correct: ${item.answer}`));
    }
    else {
        console.log(chalk_1.default.red.bold(`\nQuestion # ${index + 1}: ${item.question}`));
        console.log(chalk_1.default.bgRedBright.bold(`Your answer is wrong, Correct answer is : ${item.answer}`));
        console.log(chalk_1.default.bgGreenBright.bold(`Your answer was: ${answersArr[index]}`));
    }
});
