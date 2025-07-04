import { Gallery, IAuthor, IPagingResults, Login, MyWatchingList, Search, User } from "furaffinity-api";
import { SearchOptions } from "furaffinity-api/dist/Request";
import * as fs from "fs";
import { promisify } from "util";

export interface ISearchQuery {
    query: string,
    options?: SearchOptions
}

export interface IAuthorGalleryQuery {
    id: string,
    page: number,
    perPage?: number
}

export interface ICookies {
    a: string,
    b: string
}

export class Cookies implements ICookies {
    a: string = "";
    b: string = "";

    constructor(cookieA?: string, cookieB?: string) {
        if (!cookieA === undefined) {
            this.a = <string>cookieA;
        }

        if (!cookieB === undefined) {
            this.b = <string>cookieB;
        }
    }
}

export class FurAffinityUser implements IAuthor {
    id!: string;
    name!: string;
    url!: string;
    avatar?: string;
    shinies?: boolean;
    watchLink?: string;
    isWatchingList: IAuthor[];
    stats?: {
        views: number;
        submissions: number;
        favs: number;
        commentsEarned: number;
        commentsMade: number;
        journals: number;
        watching: boolean;
    };

    cookies!: ICookies;
    JSONuserFilePath: string = "User.json";
    JSONartistWatchListFilePath: string = "WatchList.json";
    JSONcookiesFilePath: string = "FurAffinityCookies.json";

    constructor() {
        /**
         * Writes the response to the user that there is no valid cookies.json file to read from. And creates an empty file to be filled out. Closes program after.
         * @param cookiesFilePath - File path to the location of the FurAffinityCookies.json.
         */
        function writeEmptyCookiesFile(cookiesFilePath:string):void {
            console.log("No FurAffinityCookies.JSON found at expected location or invalid format. Creating a blank one...");
            fs.writeFileSync(cookiesFilePath, JSON.stringify(new Cookies()));
            console.log("Blank file created, please fill in the JSON fields before re-running the program.");
            process.exit(0);
        }

        // Reading if there is a cookies.json file.
        // If so - parses it into this object instance
        // If not - saves an empty cookies.json file to the specified location
        try {
            if (fs.existsSync(this.JSONcookiesFilePath)) {
                const tempCookies: ICookies = JSON.parse(fs.readFileSync(this.JSONcookiesFilePath).toString());
                if (tempCookies.a == "" || tempCookies.b == "") {
                    writeEmptyCookiesFile(this.JSONcookiesFilePath);
                }
                    this.cookies = tempCookies;
            }
            else {
                writeEmptyCookiesFile(this.JSONcookiesFilePath)
            }
        }
        catch (e) {
            console.error(e)
        }

        this.isWatchingList = new Array<IAuthor>();
    }

    writeFurAffinityInfoToFile(writeMode: number) {
        function writeFurAffinityFileFunction(filePath: string, fileContent: IAuthor | IAuthor[]) {
            fs.writeFileSync(filePath, JSON.stringify(fileContent));
        }

        switch (writeMode) {
            // * Write personal user to JSON file.
            case 0:
                console.log("Gathering your user information... (this may take some time");
                this.awaitUserInfo().then((results: IAuthor): void => {
                    console.log("Successfully retrieved your user information.");
                    this.setUserInfo(results);

                    console.log("Writing user information to file...");
                    let promisifiedUserWriteSync: (filePath: string, writeObject: (IAuthor | IAuthor[])) => Promise<unknown> = promisify(writeFurAffinityFileFunction);
                    promisifiedUserWriteSync(this.JSONuserFilePath, this.getUserInfo()).then((): void => {
                        console.log("Successfully save your user info to file");

                        // TODO - write post file write behaviour
                    });
                });
                break;

            // * Write artist watch list to JSON file.
            case 1:
                console.log("");
                break;


            // * Write all info to JSON files.
            case 2:
                console.log("WIP");
                break;
        }
    }

    /**
     * Sets all IAuthor fields into the FAUser instance.
     * @param user - IAuthor logged-in user.
     */
    setUserInfo(user: IAuthor): void {
        this.id = user.id;
        this.name = user.name;
        this.url = user.url;
        this.avatar = user.avatar;
        this.shinies = user.shinies;
        this.watchLink = user.watchLink;
        this.stats = user.stats;
    }

    /**
     * Returns an IAuthor instance built from the FAUser instance.
     */
    getUserInfo(): IAuthor {
        return {
            id: this.id,
            name: this.name,
            url: this.url,
            avatar: this.avatar,
            shinies: this.shinies,
            watchLink: this.watchLink,
            stats: this.stats
        };
    }

    /**
     * @alpha
     * @remarks
     * Not yet implemented, will unwatch the selected author by ID
     */
    unwatchAuthor(): Promise<void> {
        return Promise.resolve(undefined);
    }

    /**
     * @alpha
     * @remarks
     * Not yet implemented, will watch the selected author by ID
     */
    watchAuthor(): Promise<void> {
        return Promise.resolve(undefined);
    }

    /**
     * @returns the await of Login().
     */
    async awaitUserLogin():Promise<void> {
        return Login(this.cookies.a, this.cookies.b);
    }

    /**
     * @returns the await of User().
     */
    async awaitUserInfo():Promise<IAuthor> {
        return await User();
    }

    /**
     * @returns the await of MyWatchingList().
     */
    async awaitMyWatchingList():Promise<IAuthor[]> {
        return await MyWatchingList();
    }

    /**
     * @returns the await of Search().
     */
    async awaitSearch(searchQuery: ISearchQuery):Promise<IPagingResults> {
        return await Search(searchQuery.query, searchQuery.options);
    }

    /**
     * @returns the await of the Gallery().
     */
    async awaitGallery(authorGalleryQuery: IAuthorGalleryQuery): Promise<IPagingResults> {
        return await Gallery(authorGalleryQuery.id, authorGalleryQuery.page, authorGalleryQuery.perPage);
    }
}