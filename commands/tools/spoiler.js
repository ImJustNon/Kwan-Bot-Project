const { MessageEmbed } = require('discord.js');
const client = require('nekos.life');
const neko = new client();

module.exports = {
    config:{
        name: 'spoiler',
        description: 'Creates an individual spoiler per letter for Discord',
    },
    run: async(bot, message, args) => {
        
        if(!args[0]) return message.channel.send('โปรดระบุข้อความที่ต้องการด้วยน่ะคะ')

        const texts = args.join(" ");

        if(texts.length > 99) return message.channel.send('ข้อความของคุณยาวเกินไปน่ะคะ')
        
        const output = await neko.sfw.spoiler({text: texts})
        
        await message.channel.send(output.owo);       
    }
}