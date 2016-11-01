import {readJSON, outputJSON} from 'fs-extra';

export function major(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
		readJSON(path, (err, data) => {
			if (err) reject(err);
            let versionArray: string[] = data.version.split('.');
            let major: string = versionArray[0];
            let majorNumber: number = parseInt(major);
            let newMajorNumber: number = majorNumber + 1;
            let newVersion: string = `${newMajorNumber}.${versionArray[1]}.${versionArray[2]}`
			let newPackage: any = Object.assign({}, data, {version: newVersion});
			outputJSON(path, newPackage, (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    });
}