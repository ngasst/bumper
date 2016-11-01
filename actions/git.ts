import { ReadLine } from 'readline';
import { exec } from 'child_process';
import * as chalk from 'chalk';

export function git(line: ReadLine, type: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
		line.question(`List all files you would you like to commit to git.\n\r\t*)Default is "package.json"\n\r\t*)pass in "--all" to stage and commit all modified files.`, (answer: string) => {
            if (answer.trim() === '') {
                exec('git add package.json', (err, stdout, stderr) => {
                    if (err) {
                        console.error(chalk.red(err.message));
                        process.exit(1);
                    }
                    console.info(chalk.green(stdout));		
                });
            } else {
                exec(`git add ${answer.trim()}`, (err, stdout, stderr) => {
                    if (err) {
                        console.error(chalk.red(err.message));
                        process.exit(1);
                    }

                    console.info(chalk.green(stdout));
                })
            }

            line.question(`Please enter the message to append to this git commit.\n\r\tdefault is: "bump ${type} version number"`, (answer: string) => {
                let message: string;
                answer.trim() === '' ? message = `bump ${type} version number` : message = answer;
                exec(`git commit -m"${message}"`, (err, stdout, stdin) => {
                    if (err) {
                        console.error(chalk.red(err.message));
                        process.exit(1);
                    }
                    console.info(chalk.green(stdout));
                    resolve(true);
                });
            });
        });
    });
}