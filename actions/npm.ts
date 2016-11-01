import { ReadLine } from 'readline';
import { exec } from 'child_process';
import * as chalk from 'chalk';

export function npm(line: ReadLine, type: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
		exec('npm whoami', (err, stdout, stderr) => {
	        if (err) {
	            console.error(chalk.red(`It appears you are not logged in. Please run "npm login first and try again..."\r\n\t${err.message}`));
	            process.exit(1);
	        }
	        let username: string = stdout;
	        line.question(`Is this your npm username? (${username})\r\n\tPlease write "yes" or "no" explicitly to continue.`, (answer) => {
	            if (answer.trim() === 'no') {
	                console.log(chalk.blue('Log into npm with the desired username/password before trying again.'));
	                process.exit(0);
	            }
	
	            if (answer.trim() === 'yes') {
	                exec('npm publish', (err, stdout, stderr) => {
	                    if (err) {
	                        console.log(chalk.red(`An error occured. Please correct and try again!\r\n\t${err.message}`));
	                        process.exit(1);
	                    }
	
	                    console.info(chalk.green(stdout));
                        resolve(true);
	                });
	            }
	        });		
	    });
	});
}