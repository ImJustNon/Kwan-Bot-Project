const fs = require('fs');
const ytdl = require('ytdl-core');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "ytdownload",
        description: "Get url for download",
        aliases: ["ytdl"],
    },
    run: async(bot, message, args) =>{
        try {
            const text = args.join(' ');
            if(!text) return message.channel.send('โปรดระบุ URL วีดีโอที่ต้องการจะดาวน์โหลดด้วยน่ะคะ')

            //ytdl(text).pipe(fs.createWriteStream('video.mp4'));

            const getid = ytdl.getURLVideoID(text)
            let info = await ytdl.getInfo(getid);

            let format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
            const embed = new MessageEmbed()
                .setColor('#00ff4c')
                .setTitle(`ลิ้งดาวน์โหลดของ\n${info.videoDetails.title}`)
                .setURL(format.url)
                .setThumbnail(`https://i.ytimg.com/vi/${info.videoDetails.videoId}/maxresdefault.jpg`)
                .setTimestamp()
                .setFooter('K w a n');
            await message.channel.send(embed)
        }
        catch(err) {
            message.channel.send('โปรดระบุ URL ให้ถูกต้องด้วยน่ะคะ')
        }
    }
}