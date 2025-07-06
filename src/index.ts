import { FurAffinityUser } from "./classes/FurAffinityUser";
import { FAProwlerUI, InvalidMenuSelectionError } from "./classes/FAProwlerUI";
import { IAuthor } from "furaffinity-api";

let prowlerUI: FAProwlerUI = new FAProwlerUI();

prowlerUI.displayHeaderBar();
console.log("Program starting...");
console.log("Logging user into FurAffinity...");

let faUser: FurAffinityUser = new FurAffinityUser();

faUser.awaitUserLogin().then((): void => {
    console.log("Successfully logged in user to FurAffinity!");
    console.log(prowlerUI.getSubHeaderLine());
    prowlerUI.displayMainMenu();

    function redrawMenu(displayMenu?: Function): void {
        console.clear();
        prowlerUI.displayHeaderBar();
        if (displayMenu != undefined) {
            displayMenu();
        }
    }

    try {
        const readline = require('readline');
        const mainMenuReadLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        mainMenuReadLine.question("Please make your selection:  ", (answer: number): void => {
            if (isNaN(Number(answer)) || Number(answer) > prowlerUI.menuDictionaryMain.size - 1 || Number(answer) < 0) {
                mainMenuReadLine.close();
                throw InvalidMenuSelectionError;
            }

            mainMenuReadLine.close();

            switch (Number(answer)) {
                // * Shut down program
                case 0:
                    console.log("Program shutting down...");
                    prowlerUI.endProgram();
                    break;

                // * Display user data
                case 1:
                    redrawMenu();
                    console.log("Retrieving user data... (this may take a while)");

                    faUser.awaitUserInfo().then((result: IAuthor): void => {
                        console.log("Successfully retrieved user data.")
                        const strippedUser = {
                            id: result.id,
                            name: result.name,
                            url: result.url,
                            avatar: result.avatar
                        }

                        const strippedUserStats = {
                            commentsEarned: result.stats?.commentsEarned,
                            commentsMade: result.stats?.commentsMade,
                            favs: result.stats?.favs,
                            journals: result.stats?.journals,
                            submissions: result.stats?.submissions,
                            views: result.stats?.views,
                            watching: result.stats?.watching,
                        }

                        console.table(strippedUser);
                        console.table(strippedUserStats);
                    })

                    break;

                // * Write FurAffinity user to file
                case 2:
                    redrawMenu(prowlerUI.displayWriteJSONFileMenu);

                    const readline = require('readline');
                    const fileWriteReadLine = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });

                    fileWriteReadLine.question("Please make your selection: ", (answer: number): void => {
                        if (!prowlerUI.isValidMenuSelection(Number(answer), prowlerUI.menuDictionaryWriteFile)) {
                            fileWriteReadLine.close();
                            throw InvalidMenuSelectionError;
                        }

                        fileWriteReadLine.close();

                        switch (Number(answer)) {
                            // * Return to main menu
                            case 0:
                                redrawMenu(prowlerUI.displayMainMenu);
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

                            // * Catch-all input safety
                            default:
                                throw InvalidMenuSelectionError;
                        }
                        fileWriteReadLine.close();
                    });
                    break;

                // * Account migration tools
                case 3:
                    prowlerUI.displayAccountMigrationMenu();
                    break;
            }
        });
    }
    catch (e) {
        console.error(e)
    }
});