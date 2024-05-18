const { Client, IntentsBitField } = require('discord.js');
const { restClient } = require('@polygon.io/client-js');
const dotenv = require('dotenv');

dotenv.config();

const stockKey = process.env.POLY_API_KEY;
if (!stockKey) {
    console.error('Stock API key is not set in the environment variable POLY_API_KEY');
    process.exit(1);
}

const rest = restClient(stockKey);

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const discKey = process.env.DISCORD_BOT_TOKEN;
client.login(discKey);

client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore messages from bots

    if (message.content === '!commands') {
        message.reply('!commands - List all available commands\n' +
                      '!today SYMBOL - Fetch end-of-day stock data for the given symbol for the current day (does not work on weekends or until market close)\n' +
                      '!history SYMBOL YYYY-MM-DD - Fetch historical stock data for the given symbol on a specific date');
        return;
    }

    if (message.content.startsWith('!today')) {
        const args = message.content.split(' ');
        if (args.length !== 2) {
            message.reply('Please provide a valid stock ticker symbol. Usage: `!today SYMBOL`');
            return;
        }

        const ticker = args[1].toUpperCase();
        const date = new Date();
        const day = date.getDate();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const dateStr = `${year}-${month}-${day}`;

        if (date.getDay() === 0 || date.getDay() === 6) {
            message.reply('The stock market is closed on weekends. Please choose a different command (!commands for tips).');
            return;
        }

        console.log('Fetching stock data for', ticker, 'on', dateStr);

        try {
            const data = await rest.stocks.dailyOpenClose(ticker, dateStr);
            if (data) {
                message.reply(`End of Day Data for ${ticker} on ${dateStr}:\nOpen: ${data.open}\nClose: ${data.close}\nHigh: ${data.high}\nLow: ${data.low}\nVolume: ${data.volume}`);
            } else {
                message.reply(`No data found for the ticker symbol: ${ticker}`);
            }
        } catch (e) {
            console.error('An error happened with daily open/close data:', e);
            message.reply('An error occurred while fetching end-of-day stock data. Please try again later. This command only works on weekdays after market close.');
        }
    }

    if (message.content.startsWith('!history')) {
        const args = message.content.split(' ');
        if (args.length !== 3) {
            message.reply('Please provide a valid stock ticker symbol and date. Usage: `!history SYMBOL YYYY-MM-DD`');
            return;
        }

        const ticker = args[1].toUpperCase();
        const dateStr = args[2];

        console.log('Fetching historical stock data for', ticker, 'on', dateStr);

        try {
            const data = await rest.stocks.dailyOpenClose(ticker, dateStr);
            if (data) {
                message.reply(`Historical Stock Data for ${ticker} on ${dateStr}:\nOpen: ${data.open}\nClose: ${data.close}\nHigh: ${data.high}\nLow: ${data.low}\nVolume: ${data.volume}`);
            } else {
                message.reply(`No data found for the ticker symbol: ${ticker} on ${dateStr}`);
            }
        } catch (e) {
            console.error('An error happened with historical data:', e);
            message.reply('An error occurred while fetching historical stock data. Please try again later. Make sure date is a weekday.');
        }
    }
});
