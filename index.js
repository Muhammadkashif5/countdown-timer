#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import figlet from "figlet";
import chalk from "chalk";
let projectTitle = "COUNTDOWN TIMER";
console.log(chalk.blueBright(figlet.textSync(projectTitle, { font: 'Standard' })));
const response = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: (chalk.greenBright("\nPlease enter the amount of seconds:")),
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter a valid number.";
            }
            else if (input <= 0) {
                return "Please enter a positive number of seconds.";
            }
            else if (input > 60) {
                return "Seconds must be less than or equal to 60.";
            }
            else {
                return true;
            }
        }
    }
]);
let input = response.userInput;
function startTime(val) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTIme = new Date(initialTime);
    setInterval((() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTIme, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.redBright("\nTimer has expired."));
            console.log(chalk.redBright("-".repeat(90)));
            process.exit();
        }
        const minutes = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const seconds = Math.floor(timeDiff % 60);
        console.log(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}: `);
    }), 1000);
}
;
startTime(input);
