const { Message } = require("discord.js");
const ytdl = require("ytdl-core");
const { musicQueue } = require("../assets/musicQueue.js");

module.exports = {
    name: "skip",
    description: "This will skip the song",
    args: false,
    usage: "skip",
    contributor: true,
    async execute(msg) {
        if (!msg.member.voice.channel)
            return msg.channel.send(
                `${msg.author.tag} You need to be in a voice channel to stop music!`
            );
        const serverQueue = musicQueue.get(msg.guild.id);
        if (!serverQueue)
            return msg.channel.send(`There is nothing playing now!`);
        if (serverQueue.loop) serverQueue.loop = false;
        serverQueue.connection.dispatcher.end();
        console.log(serverQueue.songs);
        msg.channel.send(`Music skipped by ${msg.author.toString()}`);
        return undefined;
    },
};
