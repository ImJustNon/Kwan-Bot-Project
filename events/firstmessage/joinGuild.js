const setting = require('../../data/setting.js');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord-buttons');

module.exports = async (bot, guild) => {
    const channel = guild.channels.cache.get(guild.systemChannelID);
    if(channel){
        const embed = new MessageEmbed()
            .setAuthor('ขอขอบคุณที่เชิญ ขวัญเข้าเซิฟเวอร์ของคุณน่ะคะ', bot.user.displayAvatarURL())
            .setDescription(`ขวัญเป็นบอทที่สามารถทำอะไรได้มากมายค่ะเช่น จัดการเซิฟเวอร์\nเกมดิสคอร์ด เพลง เเละทีเด็ด NSFW ค่ะ\nเดี๋ยวจะหาว่าขวัญโม้ลองมาดูคำสั่งเริ่มต้นกันดีไหมค่ะ`)
            .setColor('#ff26c9')
            .addField('🕹 | ดูคำสั่งทั้งหมด ',`\` ${setting.mainbot.Prefix}help \``, true)
            .addField('🛠 | ตั้งค่า Prefix ',`\` ${setting.mainbot.Prefix}prefix \``, true)
            .setImage(setting.mainbot.embed.rainbow_line_1)
            .setFooter('K w a n')
            .setTimestamp()

        let binvite = new MessageButton()
            .setStyle('url')
            .setLabel('Invite')
            .setEmoji(`🚀`)
            .setURL(setting.information.invitelink)
        let bsupport = new MessageButton()
            .setStyle('url')
            .setLabel('Support')
            .setEmoji(`☎`)
            .setURL(setting.information.supportServer)
        let bclose = new MessageButton()
            .setLabel(`Close`)
            .setID(`close`)
            .setStyle(`red`)
            .setEmoji(`❌`) 
        let row = new MessageActionRow()
            .addComponents(bclose, bsupport, binvite)

        const MESSAGE = await channel.send(embed,row);
        const filter = ( button ) => button.clicker.id === button.clicker.id
        const collector = MESSAGE.createButtonCollector(filter);
        collector.on('collect', async (b) => {
            if(b.id == 'close'){
                MESSAGE.delete();
            } 
            await b.reply.defer()
        });
    }
}