import { Gallery, Login, MyWatchingList, Search, User, IAuthor, IPagingResults } from "furaffinity-api";
import { Cookies, ICookies} from "./FurAffinityCookie";
import { SearchOptions } from "furaffinity-api/dist/Request";
import { promisify } from "util";
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

    cookiesUser!: ICookies;
    cookiesMigration!: ICookies;

    private JSONuserFilePath: string = "User.json";
    private JSONartistWatchListFilePath: string = "WatchList.json";

    constructor() {
        this.cookiesUser = new Cookies(1);
        this.isWatchingList = new Array<IAuthor>();
    }

    /**
     * Writes specified data to JSON file.
     * @param writeMode
     * 0 - write user to file.
     * 1 - write watchlist to file.
     * 2 - write user & watchlist to file.
     */
    writeFurAffinityDataToFile(writeMode: number): void {
        function furAffinityFileWriteSync(filePath: string, data: IAuthor | IAuthor[]): void {
            fs.writeFileSync(filePath, JSON.stringify(data));
        }
        const promisifiedFurAffinityFileWriteSync: (filePath: string, data: (IAuthor | IAuthor[])) => Promise<unknown> = promisify(furAffinityFileWriteSync);

        switch (writeMode) {
            // * Write personal user to JSON file.
            case 0:
                console.log("Retrieving user data... (this may take a while)");
                this.awaitUserInfo().then((result: IAuthor): void => {
                    console.log("Successfully retrieved user data.");

                    this.setUserInfo(result);

                    console.log("Writing user data to file... (this may take a while)");
                    promisifiedFurAffinityFileWriteSync(this.JSONuserFilePath, result).then((): void => {
                        console.log("Successfully written!");
                        // TODO - return to main menu / write menu after completion
                    });
                });
                break;

            // * Write artist watch list to JSON file.
            case 1:
                console.log("Retrieving author watchlist... (this may take a while)");
                this.awaitMyWatchingList().then((result: IAuthor[]): void => {
                    console.log("Successfully retrieved watchlist data.");

                    this.isWatchingList = result;

                    console.log("Writing author watchlist to file... (this may take a while)");
                    promisifiedFurAffinityFileWriteSync(this.JSONartistWatchListFilePath, result).then((): void => {
                        console.log("Successfully written!");
                        // TODO - return to main menu / write menu after completion
                    });
                });
                break;

            // * Write all info to JSON files.
            case 2:
                console.log("Retrieving all information... (this may take a while)");
                Promise.all([this.awaitUserInfo(), this.awaitMyWatchingList()]).then((results: [IAuthor, IAuthor[]]): void => {
                    console.log("Successfully retrieved all data.");

                    this.setUserInfo(results[0]);
                    this.isWatchingList = results[1];

                    Promise.all(
                        [
                            promisifiedFurAffinityFileWriteSync(this.JSONuserFilePath, this.getUserInfo()),
                            promisifiedFurAffinityFileWriteSync(this.JSONartistWatchListFilePath, this.isWatchingList)
                        ]
                    ).then((): void => {
                        console.log("Successfully written!");
                        // TODO - return to main menu / write menu after completion
                    })
                });
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
        return Login(this.cookiesUser.a, this.cookiesUser.b);
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