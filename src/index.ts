import { FurAffinityUser } from "./classes/FurAffinityUser";
import { FAProwlerUI, InvalidMenuSelectionError } from "./classes/FAProwlerUI";

let prowlerUI: FAProwlerUI = new FAProwlerUI();

prowlerUI.displayHeaderBar();
console.log("Program starting...");
console.log("Logging user into FurAffinity...");

let faUser:FurAffinityUser = new FurAffinityUser();

faUser.awaitUserLogin().then(() => {
    console.log("Successfully logged in user to FurAffinity!");
    console.log(prowlerUI.getSubHeaderLine());
    prowlerUI.displayMainMenu();

    try {
        const readline = require('readline');
        const mainMenuReadLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        mainMenuReadLine.question("Please make your selection:  ", (answer: number): void => {
            if (isNaN(Number(answer)) || Number(answer) > prowlerUI.menuDictionaryMain.size - 1 || Number(answer) < 0) {
                throw InvalidMenuSelectionError;
            }

            switch (Number(answer)) {
                // * Shut down program
                case 0:
                    console.log("Program shutting down...");
                    prowlerUI.endProgram();
                    break;

                // * Write FurAffinity user to file
                case 1:
                    prowlerUI.displayWriteJSONFileMenu();
                    const readline = require('readline');
                    const fileWriteReadLine = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });

                    fileWriteReadLine.question("Please make your selection: ", (answer: number): void => {
                        if (!prowlerUI.isValidMenuSelection(answer, prowlerUI.menuDictionaryWriteFile)) {
                            throw InvalidMenuSelectionError;
                        }

                        switch (Number(answer)) {
                            // * Return to main menu
                            case 0:
                                // TODO write function to return to main menu
                                console.log("NOT YET IMPLEMENTED");
                                break;

                            // * Save user info to file
                            case 1:
                                faUser.writeFurAffinityDataToFile(0);
                                break;

                            // * Save artist watch list to file
                            case 2:
                                faUser.writeFurAffinityDataToFile(1);
                                break;

                            // * Save all info to respective files.
                            case 3:
                                faUser.writeFurAffinityDataToFile(2);
                                break;
                        }
                        fileWriteReadLine.close();
                    });
                    break;

                // * Account migration tools
                case 2:
                    prowlerUI.displayAccountMigrationMenu();
                    break;
            }
            mainMenuReadLine.close();
        });
    }
    catch (e) {
        console.error(e)
    }
});