import * as fs from "fs";

export interface ICookies {
    a: string,
    b: string
}

export class Cookies implements ICookies {
    a!: string;
    b!: string;

    private JSONcookiesFilePath: string = "FurAffinityCookies.json";
    private JSONmigrationCookiesFilePath: string = "FurAffinityMigrationCookies.json";

    constructor(constructorMode: number) {
        /**
         * parses the discovered cookies.json file into this object's instance and returns the results. If no file is found at that location it will create an empty cookies.json file.
         * @param filePath
         */
        function detectCookiesFile(filePath: string): ICookies {
            // if cookies file exists - read it
            if (fs.existsSync(filePath)) {
                tempCookies = JSON.parse(fs.readFileSync(filePath).toString());
            }
            // if none present - write an empty one and stop the program.
            else {
                fs.writeFileSync(filePath, JSON.stringify(tempCookies));
                throw new CookiesJSONNotFoundError(filePath);
            }
            return tempCookies;
        }

        let tempCookies: ICookies = {
            a: "",
            b: ""
        };

        switch (constructorMode) {
            // * Create new FurAffinityCookies.json and object instance.
            case 1:
                tempCookies = detectCookiesFile(this.getJSONcookiesFilePath());
                break;

            // * Create new FurAffinityMigrationCookies.json and object instance.
            case 2:
                tempCookies = detectCookiesFile(this.getJSONmigrationCookiesFilePath())
                break;

            // * Create new cookies instance without file saving.
            default:
                break;
        }

        this.a = tempCookies.a;
        this.b = tempCookies.b;
    }

    /**
     * Gets the current cookies and returns it as an ICookies object.
     * @private
     * @returns ICookies object.
     */
    private getCookies(): ICookies {
        return {
            a: this.a,
            b: this.b
        };
    }

    /**
     *  @returns filepath for the cookies.json
     */
    getJSONcookiesFilePath(): string {
        return this.JSONcookiesFilePath;
    }

    /**
     *  @returns filepath for the migration cookies.json
     */
    getJSONmigrationCookiesFilePath(): string {
        return this.JSONmigrationCookiesFilePath;
    }
}


class CookiesJSONNotFoundError extends Error {
    constructor(filePath: string) {
        super(`No valid ${filePath} at expected location, please relaunch the program once you have filled in the file ${filePath}.`);
    }
}