const { MessageEmbed } = require('discord.js');
const client = require('nekos.life');
const neko = new client();

module.exports = {
    config:{
        name: 'waifuwallpaper',
        description: 'send wallpaper image',
    },
    run:async(bot, message, args) =>{
        
        const output = await neko.sfw.wallpaper()
        
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setImage(output.url)
            .setFooter('K w a n')
            .setTimestamp()

        await message.channel.send(embed);
        
    }
}