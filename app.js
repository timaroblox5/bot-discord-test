const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TOKEN = 'YOUR_BOT_TOKEN';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.content === '!send') {
        // Отправка сообщения из Roblox
        const messageToSend = 'Message from Roblox!';
        message.channel.send(messageToSend);
    }
});

client.login(TOKEN);
