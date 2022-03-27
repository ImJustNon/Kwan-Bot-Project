const { MessageEmbed } = require("discord.js");
const setting = require('../../data/setting.js'); 
const ownerID = setting.mainbot.OwnerID;
module.exports = {
  config: {
    name: "roleadd",
    description: "Add a role to a member",
    usage: "m/roleadd <member mention/id> <role mention/role id>",
    aliases: ['roleadd']
  },
  run: async (client, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"]) && !ownerID.includes(message.author.id)) return message.channel.send("คุณไม่มีสิทธิพอน่ะคะ")

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.channel.send("โปรดระบุผู้ใช้ที่ต้องการจะเพิ่มยศด้วยน่ะคะ")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.channel.send("โปรดระบุยศที่ต้องการจะเพิ่มด้วยน่ะคะ") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("เอ๊ะ! ดูเหมือนว่าสิทธิของขวัญจะหายไปน่ะ")

    if(rMember.roles.cache.has(role.id)) {
        
      return message.channel.send(`${rMember.displayName}, มียศนี้อยู่เเล้วค่ะ`)
    
    } else {
        
      await rMember.roles.add(role.id).catch(e => console.log(e.message))
      
      message.channel.send(`${rMember.displayName} ถูกเพิ่มยศ **${role.name}** เรียบร้อย`)
    
    }

  },
};