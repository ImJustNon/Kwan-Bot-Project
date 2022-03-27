const Discord = require('discord.js');
const embedcolor = '#ffffff';
const fetch = require('node-fetch')

module.exports = {
    config: {
        name: 'wiki',
        description: 'Shows information about query from wikipedia',
        aliases: ["wikipedia"],
        usage: '<query>',
        accessableby: "",
    },
    run: async (client, message, args) => {
        
        const text = args.join(" ");
        if(!text) return message.channel.send("โปรดระบุที่ต้องกาจะค้นหาด้วยน่ะคะ")
    
        const body = await fetch(`https://th.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(text)}`,).then(res => res.json().catch(() => {}));
        
        if (!body) return message.channel.sendmessage.channel.send({
            embed: {
                color: embedcolor,
                title: "เอ๊ะ! ดูเหมือนจะไม่พบสิ่งที่ต้องกาจะค้นหาน่ะคะ"
            }   
        });
        if (body.title && body.title === "Not found.") return message.channel.send({
            embed: {
                color: embedcolor,
                title: "เอ๊ะ! ดูเหมือนจะไม่พบสิ่งที่ต้องกาจะค้นหาน่ะคะ"
            }
        });
      
        const embed = new Discord.MessageEmbed()
            .setTitle(`🌐 ${body.title} `)
            .setURL(body.content_urls.desktop.page)
            .setDescription(`** ${body.extract}**`)
            .setColor(embedcolor)
            .setTimestamp()
            .setFooter('K w a n')
        
        if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);

        await message.channel.send(embed);
    }
}

