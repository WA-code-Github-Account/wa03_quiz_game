#! /usr/bin/env node
import inquirer, { Answers } from "inquirer";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename : string = fileURLToPath(import.meta.url);
const __dirname : string = dirname(__filename);

const filePath : string = join(__dirname, '../data.json');
let data : string = await fs.readFile(filePath, "utf-8");

const questionsObject : any[] = JSON.parse(data);

let loop : number = 1;

let questionsArr : Answers[] = questionsObject.map((item) => {
    let single_question : Answers = {
        message: item.question,
        type: "list",
        choices: item.choices,
        name: "ques_" + loop,
    }
    loop++;
    return single_question;
});

console.log(chalk.greenBright.bold("Welcome to TypeScript Quiz!!"));

let answers = await inquirer.prompt(questionsArr);

let answersArr = Object.values(answers);

questionsObject.forEach( (item, index) => {
    if (answersArr[index] == item.answer) {
        console.log(chalk.blueBright.bold(`\nQuestion # ${index + 1}: ${item.question}`));
        console.log(chalk.yellow.bold(`Your answer is Correct: ${item.answer}`));
    } else {
        console.log(chalk.red.bold(`\nQuestion # ${index + 1}: ${item.question}`));
        console.log(chalk.bgRedBright.bold(`Your answer is wrong, Correct answer is : ${item.answer}`));
        console.log(chalk.bgGreenBright.bold(`Your answer was: ${answersArr[index]}`));
    }
} );