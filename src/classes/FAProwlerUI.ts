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
    mainMenuOptions: Map<number, string> = new Map<number, string>()

    constructor() {
        this.terminalSize = this.getTerminalSize();
        this.mainMenuOptions.set(0, "Close program.");
        this.mainMenuOptions.set(1, "Save FurAffinity information to file.");
        this.mainMenuOptions.set(2, "Account Migration Services");
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
        this.mainMenuOptions.forEach((value: string, key: number): void => {
            console.log(`${ key }) ${ value }`);
        });
    }

    /**
     *  Builds and displays the program's Write to file submenu.
     */
    displayWriteJSONFileMenu(): void {
        console.log(" JSON SAVE WIP");
    }

    /**
     *  Builds and displays the program's account migration submenu.
     */
    displayAccountMigrationMenu(): void {
        console.log("Account migration WIP");
    }




}