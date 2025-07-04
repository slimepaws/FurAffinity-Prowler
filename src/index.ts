import { FurAffinityUser } from "./classes/FurAffinityUser";
import {FAProwlerUI, InvalidMenuSelectionError} from "./classes/FAProwlerUI";

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
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("Please make your selection:  ", (answer: number): void => {
            if (isNaN(Number(answer)) || Number(answer) > prowlerUI.mainMenuOptions.size - 1 || Number(answer) < 0) {
                throw InvalidMenuSelectionError;
            }

            switch (Number(answer)) {
                case 0:
                    console.log("Program shutting down...");
                    prowlerUI.endProgram();
                    break;

                case 1:
                    prowlerUI.displayWriteJSONFileMenu();
                    break;

                case 2:
                    prowlerUI.displayAccountMigrationMenu();
                    break;
            }
            rl.close();
        });
    }
    catch (e) {
        console.error(e)
    }
});