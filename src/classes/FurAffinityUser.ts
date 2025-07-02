import {IAuthor, IPagingResults, Login, MyWatchingList, Search, User, Gallery} from "furaffinity-api";
import {SearchOptions} from "furaffinity-api/dist/Request";
import * as fs from "fs";

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