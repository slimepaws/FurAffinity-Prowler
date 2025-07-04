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

                        // TODO switch to which write function to use
                        switch (Number(answer)) {
                            // Return to main menu
                            case 0:
                                // TODO write function to return to main menu
                                console.log("WIP");
                                break;

                            // Save user info to file
                            case 1:
                                // TODO write function to save only user data
                                faUser.writeFurAffinityInfoToFile(0);
                                break;

                            // Save artist watch list to file
                            case 2:
                                // TODO write function to save only watch list
                                console.log("WIP");
                                break;

                            // Save all info to respective files.
                            case 3:
                                // TODO write function to save all files to respective locations
                                console.log("WIP");
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