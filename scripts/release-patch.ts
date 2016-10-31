import {readJSON, outputJSON} from 'fs-extra';
import { resolve } from 'path';
import { inspect } from 'util';
import * as chalk from 'chalk';

let path: string = resolve('package.json');
incrementPatchVersion(path)
.then(() => {
    console.log(chalk.green('Successfully bumped patch version up!'));
    process.exit(0);
})
.catch(err => {
    console.log(chalk.red(err));
    process.exit(1);
});

function incrementPatchVersion(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
		readJSON(path, (err, data) => {
			if (err) reject(err);
            let versionArray: string[] = data.version.split('.');
            let patch: string = versionArray.pop();
            let patchNumber: number = parseInt(patch);
            let newPatchNumber: number = patchNumber + 1;
            let newVersion: string = [...versionArray, `${newPatchNumber}`].join('.');
			let newPackage: any = Object.assign({}, data, {version: newVersion});
			outputJSON(path, newPackage, (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    });
}