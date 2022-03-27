const Discord = require('discord.js');
const config = require('../../config');
const random = require("something-random-on-discord").Random

module.exports = {
    config: {
        name: 'fact',
        description: 'send something is fact',
        aliases: [],
        usage: '<query/name>',
        accessableby: "",
    },
    run: async (client, message, args) => {
        let data = await random.getFact()

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(data.embed.description)
            .setFooter('K w a n')
            .setTimestamp()
        await message.channel.send(embed)
    }
}