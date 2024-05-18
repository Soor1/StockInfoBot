# Stock Info Discord Bot

StockBot is a Discord bot designed to fetch various stock data based on user input commands. It uses Discord.js for development and Polygon.io to fetch the stock info.

## Usage

### Adding the Bot to Your Discord Server

To add StockBot to your Discord server, follow these steps:

1. Go to this link: https://discord.com/oauth2/authorize?client_id=1241418921014464512

### Running Locally

To run the bot locally on your machine and make custom changes follow these steps:

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications/) and create a new bot with a name of your choice.
2. Navigate to the Bot tab and enable all three Privileged Gateway Intents.
3. Go to the OAuth2 section and, under the OAuth2 URL Generator, check `application.commands` and `bot`. Under BOT PERMISSIONS, grant Administrator privileges.
4. Return to the Bot tab, click on Token, and then click Reset Token. Save the generated token. Remember to reset the token each time the code is compromised or lost.
5. Invite the bot to your server using the OAuth2 URL generated.
6. Go to [Polygon](https://polygon.io/) and create a free account
7. Create a folder on your computer.
8. Clone this repository into the folder.
9. Open a terminal inside the folder and execute the following commands:
   - `npm init -y` (sets up project info) (in the package.json under main change it to src/index.js instead of index.js)
   - `npm install discord.js` (installs the package required to interact with Discord)
   - `npm install -g nodemon` (installs nodemon, a utility that monitors for changes and automatically restarts the server)
   - `npm install dotenv` (allows you to store your API keys in an environment var)
10. Create a .env file at the same directory level as your package.json and inside add two things
   - DISCORD_BOT_TOKEN=Your Discord Token I said to copy earlier
   - POLY_API_KEY=Your Polygon Api key from your Polygon Dashboard
11. After everything above is complete, you can start the bot by running `nodemon` in the terminal.

## Author

StockBot was created by Soor Hansalia.
