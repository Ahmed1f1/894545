const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube');

module.exports = {
    name: "volume",
    description: "Changes/Shows the current volume.",
    cooldown: 5000,
    aliases: ['vol','صوت'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return; 
            const queue = distube.getQueue(message)
            if (!queue) return message.reply('> *No Songs Playing ?*')
            const volume = parseInt(args[0]);
            if (!volume) {
                let embed = new EmbedBuilder()
                    .setDescription(`> :loud_sound: *Current volume is* : \`${queue.volume}\``)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1091536665912299530/1170057890506223647/4f4b99efc0371.png')
                    .setColor('#0e1012');
                return message.reply({ embeds: [embed] });
            }
            if (isNaN(volume)) {
                return message.reply({ content: ':no_entry_sign: Please enter a valid number' });
            }
            if (volume < 0 || volume > 150 || isNaN(volume))
                return message.reply({ content: "> :no_entry_sign: Volume must be a valid integer between 0 and 150!" })
            if (volume < 0) volume = 0;
            if (volume > 150) volume = 150;
   
            let embed = new EmbedBuilder()
                .setTitle(`> ↯ *Volume changed from \`${queue.volume}\` to \`${volume}\`*`)
                .setThumbnail('https://cdn.discordapp.com/attachments/1091536665912299530/1170057890506223647/4f4b99efc0371.png')
                .setColor('#0e1012');
            
            message.reply({ embeds: [embed] });
            distube.setVolume(message, volume);
        } catch (err) {
            console.log(err) 
        }
    },
};

