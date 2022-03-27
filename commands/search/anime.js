const Discord = require('discord.js');
const config = require('../../config');
const Scraper = require('mal-scraper')

module.exports = {
    config: {
        name: 'anime',
        description: 'Shows information about anime',
        aliases: ["anime"],
        usage: '<query/name>',
        accessableby: "",
    },
    run: async (client, message, args) => {
        let Text = args.join(" ");

        if (!Text) return message.channel.send(`โปรดใส่ชื่ออนิเมะที่ต้องการค้นหาด้วยน่ะคะ`);
      
        if (Text.length > 200) return message.channel.send(`เอ๊ะ! สิ่งที่คุณพิมพ์มามันยาวเเปลกๆนะคะ ลองส่งอย่างอื่นที่สั้นลงน่ะคะ`);
      
        let Msg = await message.channel.send(`**กำลังค้นหาให้น่ะคะ**`);
      
        let Replaced = Text.replace(/ /g, " ");
      
        await Msg.delete({ timeout: 3000 });
      
        let Anime;
      
        let Embed;
      
        try {
      
            Anime = await Scraper.getInfoFromName(Replaced);
        
            if (!Anime.genres[0] || Anime.genres[0] === null) Anime.genres[0] = "None";
        
            Embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setURL(Anime.url)
                .setTitle(Anime.title)
                .setDescription(Anime.synopsis)
                .addField(`ประเภทการฉาย`, Anime.type, true)
                .addField(`สถานะการฉาย`, Anime.status, true)
                .addField(`เริ่มฉาย`, Anime.premiered, true)
                .addField(`ตอนทั้งหมด`, Anime.episodes, true)
                .addField(`ความยาว/ตอน`, Anime.duration, true)
                .addField(`ความนิยม`, Anime.popularity, true)
                .addField(`เเนวเรื่อง`, Anime.genres.join(", "), true)
                .addField(`คะเเนน`, Anime.score, true)
                .setThumbnail(Anime.picture)
                .setFooter('K w a n')
                .setTimestamp()
            
        } catch (error) {
            console.log(error)
            return message.channel.send(`ไม่พบอนิเมะเรื่องที่ต้องการค้นหาน่ะคะ`)
            
        };
      
        return message.channel.send(Embed);
    }
}
