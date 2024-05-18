# Stock Info Discord Bot

StockBot is a Discord bot designed to fetch various stock data based on user input commands.

## Usage

### Adding the Bot to Your Discord Server

To add StockBot to your Discord server, follow these steps:

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications/) and create a new bot with a name of your choice.
2. Navigate to the Bot tab and enable all three Privileged Gateway Intents.
3. Go to the OAuth2 section and, under the OAuth2 URL Generator, check `application.commands` and `bot`. Under BOT PERMISSIONS, grant Administrator privileges.
4. Return to the Bot tab, click on Token, and then click Reset Token. Save the generated token. Remember to reset the token each time the code is compromised or lost.
5. Invite the bot to your server using the OAuth2 URL generated.

### Running Locally

To run the bot locally on your machine, follow these steps:

1. Create a folder on your computer.
2. Clone this repository into the folder.
3. Open a terminal inside the folder and execute the following commands:
   - `npm install discord.js` (installs the package required to interact with Discord)
   - `npm install -g nodemon` (installs nodemon, a utility that monitors for changes and automatically restarts the server)
4. After installation, you can start the bot by running `nodemon` in the terminal.

## Author

StockBot was created by Soor Hansalia.
