const img = require('images-scraper');
const Discord = require('discord.js');

const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    config: {
        name: 'imagesearch',
        aliases: [],
        description: 'search image from google',
    },
    run : async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.channel.send('โปรดระบุสิ่งที่ต้องการจะค้นหาด้วยน่ะคะ');

        const searching = new Discord.MessageEmbed().setDescription(`กำลังค้นหา...`);

        
        message.channel.send(searching).then(async (m) => {
            await google.scrape(query, 1).then(async (results)=>{
                await m.edit(results[0].url);
            });
        });
    }
}