const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "warn",
        description: "warn members",
        usage: "m/warn <mention member/member id> [reason]",
        aliases: []
    },
    run: async (bot, message, args) => {

            if(!message.channel.permissionsFor(message.member).has(['MANAGE_MESSAGES'])) return message.channel.send('คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [MANAGE_MESSAGES] เพื่อใช้คำสั่งนี้น่ะคะ');
    
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!member) return message.reply("โปรดระบุชื่อผู้ใช้ด้วยน่ะคะ");
        
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "ไม่ระบุ";
            
            member.send(`คุณได้รับคำเตือนจาก <${message.author.username}> เนื่องจาก: ${reason}`)
            .catch(error => message.channel.send(`<${message.author}> ไม่สามารถรันคำสั่งนี้ได้เนื่องจาก : ${error}`));
            let warnEmbed = new MessageEmbed()
            .setTitle("**__เเจ้งเตือน คำเตือน__**")
            .setDescription(`**<@${member.user.id}> ถูกเตือนโดย <@${message.author.id}>**`)
            .addField(`**เนื่องจาก:**`, ` ${reason} `)
            .addField(`**คำสั่ง:**`, ` Warn `)
            .addField(`**โดย:**`, `${message.author}`)

            message.channel.send(warnEmbed)

    }
}