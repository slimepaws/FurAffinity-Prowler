import {FurAffinityUser} from "./classes/FurAffinityUser";
import {FAProwlerUI} from "./classes/FAProwlerUI";

let prowlerUI: FAProwlerUI = new FAProwlerUI();
let faUser:FurAffinityUser = new FurAffinityUser();

prowlerUI.displayHeaderBar();
console.log("Program starting...");

console.log("Logging user into FurAffinity...");
faUser.awaitUserLogin().then(() => {
    console.log("Successfully logged in user to FurAffinity!");

    // IMPORTANT work from in this scope for login to work.





});