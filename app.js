const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const fetch = require('node-fetch'); // Для запросов к API

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TOKEN = process.env.DISCORD_TOKEN;

// Замените на свой API для Roblox
const ROBLOX_API_URL = 'https://api.your-roblox-server/ban'; // API URL для бана

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Команда !ban
client.on('messageCreate', async message => {
    // Игнорируем сообщения от самого бота
    if (message.author.bot) return;

    // Пробуем распознать команду
    if (message.content.startsWith('!ban')) {
        // Проверяем права пользователя на выполнение команды (например, по роли)
        if (!message.member.roles.some(role => role.name === 'OWNER')) {
            return message.reply("У вас нет прав на выполнение этой команды.");
        }

        // Извлекаем ID пользователя Roblox
        const userId = message.content.split(' ')[1]; // Предположим, что после команды следует ID

        if (!userId) {
            return message.reply("Пожалуйста, укажите ID пользователя Roblox.");
        }

        try {
            // Выполняем запрос к API Roblox для бана
            const response = await fetch(`${ROBLOX_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при выполнении запроса к Roblox API');
            }

            const data = await response.json();
            if (data.success) {
                message.channel.send(`Пользователь с ID ${userId} успешно забанен в Roblox.`);
            } else {
                message.channel.send(`Не удалось забанить пользователя с ID ${userId}. Причина: ${data.message}`);
            }
        } catch (error) {
            console.error(error);
            message.channel.send('Произошла ошибка. Пожалуйста, попробуйте позже.');
        }
    }
});

client.login(TOKEN);
