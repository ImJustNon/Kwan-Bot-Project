const Discord = module.require("discord.js")
const setting = require('../../data/setting.js')
const giphy = require('giphy-api')(setting.api.giphyapi);

module.exports = {
    config : {
        name: "gif",
        description: "Get gifs based on your search",
    },
    run: async (client, message, args) => {
        if (args.length === 0) {
            message.channel.send('No Search terms!')
            return;
        }
        if (args.length === 1) {
            term = args.toString()
        } else {
            term = args.join(" ");
        }
        giphy.search(term).then(async (res) => {
            // Res contains gif data!
            let id = res.data[0].id;
            let msgurl = `https://media.giphy.com/media/${id}/giphy.gif `;
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(`ผลจากการค้นหา  ${term}  ใน GIPHY.COM`)
            .setImage(msgurl)
            .setColor("RANDOM")
            .setFooter('K w a n')
            .setTimestamp()

            await message.channel.send(embed);

        });

    }
}