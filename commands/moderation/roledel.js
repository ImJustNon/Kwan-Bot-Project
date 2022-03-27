const { MessageEmbed } = require("discord.js");
module.exports = {
  config: {
    name: "roledel",
    description: "Remove a role from a member",
    usage: "m/roledel <member mention/member id> <role mention/role id>",
    aliases: ['role del', 'role delete', 'rdel']
  },
  run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.channel.send("คุณไม่มีสิทธิพอน่ะคะ")

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.channel.send("โปรดระบุชื่อผู้ใช้ที่ต้องการนำยศออกด้วยค่ะ")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.channel.send("โปรดระบุยศที่ต้องการจะนำออกด้วยค่ะ") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("เอ๊ะ! ดูเหมือนว่าสิทธิของขวัญจะหายไปน่ะคะ")

    if(!rMember.roles.cache.has(role.id)) {
      let rolDEL_err = new MessageEmbed()
      .setColor(`#FF0000`)
      .setDescription(`${rMember.displayName}, ผู้ใช้ผู้นี้ไม่มียศนี้อยู่เเล้วน่ะคะ`);

      return message.channel.send(rolDEL_err)
    
    } else {

      await rMember.roles.remove(role.id).catch(e => console.log(e.message))
      
      let rolDEL = new MessageEmbed()
      .setColor(`#00FF00`)
      .setDescription(`${rMember} ได้ถูกนำยศ **${role.name}** ออกเรียบร้อยเเล้วค่ะ`)

      message.channel.send(rolDEL)
    
    }

  },
};
