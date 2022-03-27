const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const db = require('../../database/quickmongo.js');
const Levels = require('discord-xp');
const canvacord = require('canvacord');

module.exports = {
    config: {
        name: 'rank',
        aliases: ['level'],
        description: 'show user level', 
    },
    run: async(bot, message, args) => {
        try {
            const checkdata = await db.get(`xp_${message.guild.id}_activate`)
            if (checkdata == null) return message.channel.send(`เซิฟเวอร์นี้ยังไม่ได้มีการตั้งค่าระบบเลเวลเลยน่ะคะ`);

            const target = message.mentions.users.first() || message.author;
            const user = await Levels.fetch(target.id, message.guild.id);
            if(!user) return message.channel.send(`เอ๊ะ! ดูเหมือนว่าผู้ใช้ยังไม่มีเลเวลเลยน่ะคะ ลองส่งข้อความเล่นดูก่อนน่ะคะ`);

            const neededXp = Levels.xpFor(parseInt(user.level) + 1);
            
            const rank = new canvacord.Rank()
                .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png' }))
                .setCurrentXP(user.xp)
                .setLevel(user.level)
                .setRequiredXP(neededXp)
                .setUsername(target.username)
                .setDiscriminator(target.discriminator)
                .setRank(0,'Rank',false)

            const backgroundimage = await db.get(`xp_${message.guild.id}_background_image`);
            const backgroundcolor = await db.get(`xp_${message.guild.id}_background_color`);
            const color = await db.get(`xp_${message.guild.id}_color`);
            const overlay = await db.get(`xp_${message.guild.id}_overlay`);
            const overlaycolor = await db.get(`xp_${message.guild.id}_overlay_color`);
            const overlayvisible = await db.get(`xp_${message.guild.id}_overlay_visible`);
            const status = await db.get(`xp_${message.guild.id}_status`);

            if(backgroundimage !== null) await rank.setBackground('IMAGE',backgroundimage);
            if(backgroundcolor !== null) await rank.setBackground('COLOR',backgroundcolor);
            if(color !== null) {
                await rank.setProgressBar(color,'COLOR');
                await rank.setLevelColor(color,color);
            }
            if(overlay == 'false') await rank.setOverlay('#000000',1, false);
            if(overlay == 'true') await rank.setOverlay(overlaycolor || '#000000', parseInt(overlayvisible) || 0.3, true);
            if(status == null) await rank.setStatus('offline');
            if(status == 'true') await rank.setStatus(target.presence.status);

            rank.build().then( async(data) =>{
                const attatchment = new Discord.MessageAttachment(data, `${message.author.username}-RankCard.png`);
                await message.channel.send(attatchment);
            });
        }
        catch(err){
            console.log(err)
        }
    }
}