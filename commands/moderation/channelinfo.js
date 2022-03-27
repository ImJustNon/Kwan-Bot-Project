const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "channelinfo",
        aliases: ['ci', 'channeli', 'cinfo'],
        category: "info",
        description: "Shows Channel Info",
        usage: "[ channel mention | channel name | ID] (optional)",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.channel.send("**ไม่พบช่องที่คุณต้องการค่ะ**");

        let channelembed = new MessageEmbed()
            .setTitle(`ข้อมูลของช่อง ${channel.name}`)
            .setThumbnail(message.guild.iconURL())
            .addField("**ชื่อช่อง**", channel.name)
            .addField("**NSFW**", channel.nsfw)
            .addField("**ID ช่อง**", channel.id)
            .addField("**ประเภทช่อง**", channel.type)
            .addField("**คำอธิบายช่อง**", `${channel.topic || "ไม่มีคำอธิบาย"}`) 
            .addField("**สร้างเมื่อ**", channel.createdAt)
            .setColor("#dcf104")
        message.channel.send(channelembed);
    }
}