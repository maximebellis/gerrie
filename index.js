const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    console.log(`Received a message from ${message.author.username}`);

    if (message.content.startsWith('!voorspel')) {
        // Split the message content into words
        const words = message.content.split(' ');

        // Check if the command has the correct format
        if (words.length !== 3) {
            message.channel.send('Use !voorspel <land1> <land2>');
            return;
        }

        // Generate a random football score for each team
        const score1 = Math.floor(Math.random() * 5);
        const score2 = Math.floor(Math.random() * 5);

        // Send the football score
        message.channel.send(`${words[1]} ${score1} - ${score2} ${words[2]}`);
        return;
    }

    if (message.content === '!pronostiek') {
        message.channel.send('https://ekpronostiek.sporza.be/');
        return;
    }


    // Check if the message is from the user "drawp7"
    if (message.author.username === 'drawp7') {
        console.log(`Message is from drawp7`);

        // Check if the message contains a GIF
        if (message.embeds.length > 0) {
            console.log(`Message contains embeds`);

            message.embeds.forEach(embed => {
                if (embed.image || embed.thumbnail) {
                    console.log(`Found an image or GIF embed`);

                    // Send a message to the channel instead of deleting the message
                    message.channel.send("Ward probeerde zonet een niet grappige gif door te sturen, gelukkig heb ik hem optijd kunnen onderscheppen!");
                }
            });
        }
    }
});

client.login(process.env.TOKEN);