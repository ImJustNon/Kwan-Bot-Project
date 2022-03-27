const { MessageEmbed } = require('discord.js');
const setting = require('../../data/setting.js');

module.exports = {
    config: {
        name: "source",
        description: "send my github link",
        usage: "<prefix>src",
        example: "<prefix>src",
        aliases: ['src','github','code']
    },
    run: async(bot, message, args) =>{
        
        const embed = new MessageEmbed()
            .setColor('WHITE')
            .setThumbnail(bot.user.avatarURL())
            .setTitle('นี่คือลิ้ง Source Code ของขวัญค่ะ')
            .setURL(setting.information.github)
            .setFooter('K w a n')
            .setTimestamp()
        await message.channel.send(embed);     
    },
}