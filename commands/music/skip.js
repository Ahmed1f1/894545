const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')

module.exports = {
    name: "skip",
    description: "Skip the current song.",
    aliases: ['s', 'التالي', 'تخطي','س','سكب','سكيب'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return; 
            const queue = distube.getQueue(message)

            if (!queue) return;
           if (!queue.autoplay && queue.songs.length <= 1) { 
               distube.stop(message);
               message.react("⏭️");
            } 
            const embed = new EmbedBuilder()
                .setTitle("⏭️ Skipped Successfully")
                .setThumbnail("https://cdn.discordapp.com/attachments/1091536665912299530/1169738053892460724/d4c0f597a003.png") 
                .setFooter({
                    text: client.user.username,
                    iconURL: client.user.displayAvatarURL()
                });
            message.channel.send({ embeds: [embed] });
        } catch (err) {
            console.log(err) 
        }
    },
};
