import * as chalk from 'chalk';

let args: string[] = process.argv.filter((a, i) => i > 1);

if (args.length > 0) {

} else {
    console.log(chalk.magenta('Please specify which level of versioning you which to bump.'))
}