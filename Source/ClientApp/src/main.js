require('dotenv').config();

const { Client, Intents, Message, GuildMember } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX = '$';

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

client.on('messageCreate', (msg) => {
    if (!msg.author.bot && msg.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = msg.content.trim().substring(PREFIX.length).split(/\s+/);

        // fake kick command
        if (CMD_NAME === 'kick') {
            if (msg.member.permissions.any('KICK_MEMBERS')) {
                if (args.length != 1) return msg.reply('Please provide a valid ID.');

                let member = msg.guild.members.cache.get(args[0]);

                if (member) return msg.channel.send(`${member} has been kicked.`);
                else return msg.reply('Member not found.');
            } else return msg.channel.send(`${msg.member}, you do not have permission to use that command.`);
            
        }

    }
});


client.login(process.env.IP_BUDDY_BOT_TOKEN);

