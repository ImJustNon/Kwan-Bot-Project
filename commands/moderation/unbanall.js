const Discord = require('discord.js');
const {MessageEmbed} = require("discord.js");

module.exports = {
  config : {
    name: "unbanall",
    aliases: ['uball'],
    description: 'Can unbanll all the users',
    category: "Moderation",
    example: `c!unbanall`
  },
  run: async(client, message, args) => {
    const noadmin = new Discord.MessageEmbed()
      .setDescription(`**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้น่ะคะ**`);

    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.guild.fetchBans().then(bans => {
        if (bans.size == 0) {{
          const embed = new MessageEmbed()
            .setDescription(`ไม่มีผู้ใช้ที่ถูกเเบนค่ะ`)
            .setColor('RANDOM')
          message.reply(embed)
        }                               
        } else {
          bans.forEach(ban => {
            message.guild.members.unban(ban.user.id);
          })
          const emb = new Discord.MessageEmbed()
	          .setDescription(` ผู้ใช้ที่ถูกเเบนทั้งหมดได้ถูกปลดเเบนเรียบร้อย \n\n โดย:<@${message.author.id}>\n `)
	          .setColor("#00BFFF")
          message.channel.send(emb);                    
        }
      })
    } else {
      return await message.channel.send(noadmin);
    }
  },
};