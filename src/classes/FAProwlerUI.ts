import terminalSize from "terminal-size";

export interface ITerminalSize {
    columns: number,
    rows: number
}

export class FAProwlerUI {
    borderSymbol: string = "#";
    subBorderSymbol: string = "-";
    programTitle: string = "FurAffinity Prowler";
    linePrintOutArray: string[] = new Array<string>();
    terminalSize: ITerminalSize;
    mainMenuOptions: string[] = [
        "Close Program",
        "Write FA data to file"
    ];

    constructor() {
        this.terminalSize = this.getTerminalSize();
    }

    /**
     * @returns - {@inheritDoc ITerminalSize}.
     */
    getTerminalSize(): ITerminalSize {
        return {
            columns: terminalSize().columns,
            rows: terminalSize().rows
        };
    }

    /**
     * Builds and displays the program header bar
     */
    displayHeaderBar(): void {
        const borderLine: string = this.borderSymbol.repeat(this.getTerminalSize().columns);
        this.linePrintOutArray = [
            borderLine,
            this.programTitle,
            borderLine
        ];

        this.linePrintOutArray.forEach((value, index, array) => {
            console.log(value);
        });
    }

    displayMainMenu(): void {
        console.log(this.subBorderSymbol.repeat(this.getTerminalSize().columns));
        this.mainMenuOptions.forEach((value, index, array) => {
            console.log(`${ index }) ${ value }`);
        });

        // TODO make selection text interactable
        console.log("Please make your selection: ");
    }


}