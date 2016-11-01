import { bumpers } from '../bumpers';
import { resolve } from 'path';
import { exec } from 'child_process';
import { createInterface, ReadLine } from 'readline';
import * as chalk from 'chalk';

let args: string[] = process.argv.filter((a, i) => i > 1);

if (args.length > 0) {
	bumpers
    	.filter((f: ((path: string) => Promise<boolean>)) => f.name === args[0])
        .forEach((f: ((path: string) => Promise<boolean>)) => {
            let p: string = resolve('package.json');
            console.log(chalk.yellow(`Bumping up ${f.name} version based on version reported in file: \n\r${p}`));
            f(p)
            .then(() => {
                args.shift(); //remove the first element, which happens to be the type of bump, which we already covered.
                let line: ReadLine = createInterface(process.stdin, process.stdout);
                args.forEach((ar: string) => {
					switch (ar.trim()) {
                        case '--git':
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

                                line.question(`Please enter the message to append to this git commit.\n\r\tdefault is: "bump ${f.name} version number"`, (answer: string) => {
                                    let message: string;
                                    answer.trim() === '' ? message = `bump ${f.name} version number` : message = answer;
                                    exec(`git commit -m"${message}"`, (err, stdout, stdin) => {
	                                    if (err) {
	                                        console.error(chalk.red(err.message));
	                                        process.exit(1);
	                                    }
                                        
	                                    console.info(chalk.green(stdout));
	                                });
                                });
                            });
                        	//git add package.json

                            //git commit -m"some message"
                            
                            break;
                        
                        case '--npm':
                        	console.log('deal with npm!');
                            //login npm user

                            //handle possible errors

                            //publish file
                            break;
                    
                        default:
                            break;
                    }
                });
            })
            .catch(er => console.log(chalk.red(er)));
        });
} else {
    console.log(chalk.magenta(`Please specify which level of versioning you which to bump.\n\rAcceptable values are: ${chalk.bold('"patch"')}, ${chalk.bold('"minor"')}, ${chalk.bold('"major"')}`));
}