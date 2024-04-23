const { ActivityType } = require('discord.js');
const Discord = require('discord.js');
const db = require('quick.db');
const { prefix } = require('../config.json');
const { joinVoiceChannel } = require('@discordjs/voice');
const distube = require('../client/distube');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    try {
      console.log((`Logged in as ${client.user.tag}`).red);
      console.log(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
      console.log((`Servers: ${client.guilds.cache.size}`).magenta, (`Users: ${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}`).yellow, (`Commands: ${client.commands.size}`).green);
      client.user.setStatus("idle")
       client.user.setActivity(`D A R K`, { type: ActivityType.Streaming , url: "https://www.twitch.tv/V0rRteX" })
      setInterval(async () => {
        client.guilds.cache.forEach(async g => {
          let vch = await db.get(`24_7`)
          if (vch == null) return;
          let ch = client.channels.cache.get(vch);
          if (ch == null) return db.delete(`24_7`)
          const clientMember = g.members.cache.get(client.user.id);
          const checkJoined = clientMember?.voice?.channelId == ch.id;
          if (!checkJoined) {
            console.log(checkJoined)
            try {
              await distube.voices.join(ch)
            } catch (e) {
              console.log("connection", e);
            }
          }
        })
      }, 7000)
    } catch (err) {
      console.log(err) 
    }
  }
};
