import terminalSize from "terminal-size";

export interface ITerminalSize {
    columns: number,
    rows: number
}

export class InvalidMenuSelectionError extends Error {
    constructor() {
        super("Invalid FurAffinity-Prowler menu selection");
    }
}

export class FAProwlerUI {
    private borderSymbol: string = "#";
    private subBorderSymbol: string = "-";
    private programTitle: string = "FurAffinity Prowler";
    terminalSize: ITerminalSize;
    menuDictionaryMain: Map<number, string> = new Map<number, string>();
    menuDictionaryWriteFile: Map<number, string> = new Map<number, string>();

    constructor() {
        // Get terminal size
        this.terminalSize = this.getTerminalSize();

        // Set main menu options
        this.menuDictionaryMain.set(0, "Close program.");
        this.menuDictionaryMain.set(1, "Save FurAffinity information to file.");
        this.menuDictionaryMain.set(2, "Account Migration Services");

        // Set write file menu options
        this.menuDictionaryWriteFile.set(0, "Return to main menu.");
        this.menuDictionaryWriteFile.set(1, "Save personal user information to file.");
        this.menuDictionaryWriteFile.set(2, "Save artist watchlist to file.");
    }

    endProgram(): void {
        process.exit(0);
    }

    /**
     * @returns The ITerminalSize object of the current dimensions of the terminal.
     */
    getTerminalSize(): ITerminalSize {
        this.terminalSize = terminalSize();
        return this.terminalSize;
    }

    /**
     * @returns The constructed string of predetermined characters to subdivide the terminal after desired operations.
     */
    getSubHeaderLine(): string {
        return this.subBorderSymbol.repeat(this.getTerminalSize().columns);
    }

    /**
     * Checks if the numerical selection is a valid menu option from a provided menuDictionary
     * @param answer - numerical user selection, will test for NaN.
     * @param menuOptionMap - dictionary containing the list of all menu items
     * @returns true if a valid selection is contained within the provided dictionary.
     */
    isValidMenuSelection(answer:number, menuOptionMap: Map<number, string>): boolean {
        return menuOptionMap.has(answer);
    }

    /**
     * Builds and displays the program's header bar
     */
    displayHeaderBar(): void {
        const borderLine: string = this.borderSymbol.repeat(this.getTerminalSize().columns);
        console.log(`${ borderLine }\n${ this.programTitle }\n${ borderLine }`);
    }

    /**
     *  Builds and displays the program's main menu
     */
    displayMainMenu(): void {
        this.menuDictionaryMain.forEach((value: string, key: number): void => {
            console.log(`${ key }) ${ value }`);
        });
    }

    /**
     *  Builds and displays the program's Write to file submenu.
     */
    displayWriteJSONFileMenu(): void {
        console.log(`Write FurAffinity information to file.\n${ this.getSubHeaderLine() }`);
        this.menuDictionaryWriteFile.forEach((value: string, key: number): void => {
            console.log(`${ key }) ${ value }`);
        });
    }

    /**
     *  Builds and displays the program's account migration submenu.
     */
    displayAccountMigrationMenu(): void {
        console.log("Account migration WIP");
    }




}