import { bumpers } from '../bumpers';
import { resolve as res, join } from 'path';
import { exec } from 'child_process';
import { createInterface, ReadLine } from 'readline';
import { git, npm } from '../actions';
import * as chalk from 'chalk';

let args: string[] = process.argv.filter((a, i) => i > 1);

if (args.length > 0) {
	Promise.resolve()
    .then(() => {
		return new Promise((resolve, reject) => {
			bumpers
	    	.filter((f: ((path: string) => Promise<boolean>)) => f.name === args[0])
	        .forEach((f: ((path: string) => Promise<boolean>)) => {
	            let p: string = res('package.json');
	            console.log(chalk.yellow(`Bumping up ${f.name} version based on version reported in file: \n\r${p}`));
	            f(p)
	            .then(() => {
	                args.shift(); //remove the first element, which happens to be the type of bump, which we already covered.
	                let line: ReadLine = createInterface(process.stdin, process.stdout);
	                Promise.resolve()
	                .then(() => args.indexOf('--git') !== -1 ? git(line, f.name) : false)
	                .then(() => args.indexOf('--npm') !== -1 ? npm(line, f.name) : false)
                    .then(() => {
                        console.log(chalk.bgGreen('Fished!'));
                        resolve(true);
                        process.exit();
                    })
	                .catch((err) => {
                        console.error(chalk.red(err));
                        reject(err);
                    });
	            }) 
	            .catch(err => {
                    console.log(chalk.red(err)); 
                    reject(err);
                });
	        });
        });
    })
    .catch(err => console.error(chalk.red(err)));
} else {
    console.log(chalk.magenta(`Please specify which level of versioning you which to bump.\n\rAcceptable values are: ${chalk.bold('"patch"')}, ${chalk.bold('"minor"')}, ${chalk.bold('"major"')}`));
    process.exit(0);
}