const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const config = require('../../config');
const Zalgo = require('to-zalgo')

module.exports = {
    config: {
        name: 'zalgo',
        description: 'Converts your text to Zalgo',
        aliases: ["zalgo"],
        usage: '<text>',
        accessableby: "",
    },
    run: async (client, message, args) => {
        if(!args[0])return message.channel.send('โปรดระบุข้อความที่ต้องการจะเเปลงด้วยน่ะคะ')
    
        const embed = new MessageEmbed()
            .setColor(config.embedcolor)
            .setDescription(`${Zalgo(args.join(" "))}`)
            .setTimestamp()
    message.channel.send(embed)
    }
}