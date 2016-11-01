import {readJSON, outputJSON} from 'fs-extra';

export function patch(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
		readJSON(path, (err, data) => {
			if (err) reject(err);
            let versionArray: string[] = data.version.split('.');
            let patch: string = versionArray[2];
            let patchNumber: number = parseInt(patch);
            let newPatchNumber: number = patchNumber + 1;
            let newVersion: string = `${versionArray[0]}.${versionArray[1]}.${newPatchNumber}`;
			let newPackage: any = Object.assign({}, data, {version: newVersion});
			outputJSON(path, newPackage, (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    });
}