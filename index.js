const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token
const token = '7200744471:AAGEz1CU0ROHQH_XybRM0T5PQXufLZO_18E';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // URL of your web app
    const webAppUrl = 'https://youtube.com';

    // Reply with a button that opens the web app
    bot.sendMessage(chatId, 'Welcome! Click the button to open the web app:', {
        reply_markup: {
            inline_keyboard: [
                [{ 
                    text: 'Open Web App', 
                    web_app: { url: webAppUrl } 
                }]
            ]
        }
    });
});
