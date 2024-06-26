const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube');

module.exports = {
    name: "nowplaying",
    description: "Shows what is song that the bot is currently playing.",
    cooldown: 5000,
    aliases: ['الان', 'np', 'status'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel) return;

            const queue = distube.getQueue(message);
            if (!queue) return;

            const song = queue.songs[0];
            const uni = song.playing ? ':notes: | ' : ':notes: | ';
            const part = Math.floor((queue.currentTime / song.duration) * 30);

            let embed = new EmbedBuilder()
                .setTitle(song.name)
                .setURL(song.url)
                .setDescription(`Current Duration: [${queue.formattedCurrentTime}/${song.formattedDuration}]\n${uni}${'▇'.repeat(part) + '▇' + '—'.repeat(24 - part)}`)
                .setThumbnail(`https://cdn.discordapp.com/attachments/1091536665912299530/1169715395293368330/NowPlaying2.png`)
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() });

            message.reply({ embeds: [embed] });
        } catch (err) {
            console.log(err);
        }
    },
};
