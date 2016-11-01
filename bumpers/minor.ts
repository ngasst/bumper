import {readJSON, outputJSON} from 'fs-extra';

export function minor(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
		readJSON(path, (err, data) => {
			if (err) reject(err);
            let versionArray: string[] = data.version.split('.');
            let minor: string = versionArray[1];
            let minorNumber: number = parseInt(minor);
            let newMinorNumber: number = minorNumber + 1;
            let newVersion: string = `${versionArray[0]}.${newMinorNumber}.${versionArray[2]}`
			let newPackage: any = Object.assign({}, data, {version: newVersion});
			outputJSON(path, newPackage, (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    });
}