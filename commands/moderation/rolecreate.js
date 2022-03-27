  
const Discord = require("discord.js");
const toHex = require("colornames");

module.exports = {
  config: {
    name: "rolecreate",
    description: "Add a role to a member",
    usage: "m/roleadd <member mention/id> <role mention/role id>",
    aliases: ['rolecreate']
  },

 run: async (client, message, args) => {
        const name = args.slice(1).join(" ")
        const regex = !/[^a-zA-Z0-9]+/g.test(name)
        if (!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("คุณไม่มีสิทธิพอน่ะคะ")
        }
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("เอ๊ะ! ดูเหมือนว่าสิทธิของขวัญจะหายไปน่ะ")
        }
        if (!args[0]) {
        return message.channel.send("`โปรดระบุสิ่งที่ต้องใช้ตามนี้ค่ะ \` createrole <colorname> <Name> \``")
        }
        if (!name) {
        return message.channel.send("โปรดระบุชื่อยศที่ต้องการจะสร้างด้วยค่ะ")
        }
        if (regex === false) {
        return message.channel.send("ไม่สามารถใช้ชื่อนี้ได้โปรดเช็คว่าตัวอักษรที่ใช้สามารถใช้ได้ ")
        }
        if (name.length > 100) {
        return message.channel.send("ชื่อยศของคุณมีความยาวมากเกิดไปน่ะคะลองลดลงมาไม่ให้**มากกว่า 100 **ตัวดูน่ะคะ")
        }
        message.guild.roles.create({
            data: {
                name: name,
                color: toHex(args[0])
            }
        })
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
        .setColor("RANDOM")
        .setDescription(`
**ชื่อยศ : ** ${name}
**สถานะ : ** สร้างยศใหม่
**สียศ : ** ${args[0]}
**ในช่อง : ** ${message.channel}
**สร้างโดย : ** ${message.member}
      `)
   message.channel.send(embed);
    }
}