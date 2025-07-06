# FurAffinity-Prowler
A [FurAffinity](https://www.furaffinity.net/) web crawler using the [FurAffinity-API](https://github.com/recallfuture/furaffinity-api) to provide a collection of tools and services that the original developers of [FurAffinity](https://www.furaffinity.net/) will not supply us with or refuses to help with.

> **WIP**: This project is still under construction. Please be patient ;3

> **Important**: This project can only be used with FurAffinity's Modern style.

## Features:
- **WIP** Migrate your account to a new account</li>
- Export your user account info to JSON</li>
- Export your account watchlist to JSON</li>
- **WIP** Import watchlist</li>

## Usage:
Just launch index.ts, or build. Up to you, I'm not your Mom.

### Cookies:
To use this program, two cookies ("a", "b") must be provided.
To locate these cookies you must:
1. Open browser and navigate to [FurAffinity](https://www.furaffinity.net/).
2. Open up DevTools (F12).
3. Navigate to "Storage".
4. Find the "Cookies" sub-menu.
5. There should be a small database containing at least 2 cookies key-value pairs ("a", "b").
6. Enter these values into the FurAffinityCookies.json file and save.
7. Relaunch the program.

> **Important**: If you do not find any of the required .json files in your directory. Do not worry. Any required files will be generated, and you will be informed as needed.

#### Example FurAffinityCookies.json:
`{
a: "XXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
b: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}`

## Dependencies:
- furaffinity-api</li>
- terminal-size</li>
- typescript</li> 

