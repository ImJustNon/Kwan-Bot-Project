const Discord = require("discord.js");


module.exports = {
  config : {
        name: "singlevoicemove",
        aliases: ["smove","svm"], 
       example: `c!smove @kalyan`,
        category: "Moderation",
        description: "Can move a user to other vc",
        accessableby: "admin",
        args: true },
    run: async(client,message,args) => {
        if(!message.member.permissions.has("MOVE_MEMBERS")) return message.channel.send("คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [MOVE_MEMBERS] เพื่อใช้คำสั่งนี้น่ะคะ");
        if(!message.guild.me.permissions.has("MOVE_MEMBERS")) return message.channel.send("ขวัญไม่มีสิทธิพอน่ะคะ ต้องการยศ [MOVE MEMBERS] ค่ะ");
        if(!args[0]) return message.channel.send("โปรดระบุตามนี้: singlevoicemove < ชื่อผู้ใช้ >  < ช่องเสียง >");
        if(!args[1]) return message.channel.send("โปรดระบุตามนี้: singlevoicemove < ชื่อผู้ใช้ >  < ช่องเสียง >");
        const channel = message.guild.channels.cache.get(args[1]) ||
        message.guild.channels.cache.find(c=>c.type==="voice"&&c.name.toLowerCase()===args[1].toLowerCase());
        if(!channel) return message.channel.send("เดี๋ยวน่ะ นี่มันไม่ใช้ห้องเสียงน่ะ!");
        if(channel.type!=="voice") return message.channel.send("เดี๋ยวน่ะ นี่มันไม่ใช้ห้องเสียงน่ะ!");
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLowerCase());
        if(!member.voice.channel) return message.channel.send(`ไม่พบ **${member.user.tag}** ในทุกห้องเสียงเลยค่ะ`);
        if(!member) return message.channel.send("ไม่พบชื่อผู้ใช้นี้");
        try {
            member.voice.setChannel(channel, `ใช้คำสั่งโดย ${message.author.tag}`);

            let reason = args.slice(2).join(" ");

        if(!reason) reason = 'ไม่ได้ระบุ';
 
    
const embed = new Discord.MessageEmbed()
      .setDescription(` สมาชิกได้ถูกย้ายจากห้องเสียง\n\nโดย: <@${message.author.id}>\nผู้ใช้: ${member}\nช่อง:<#${message.channel.id}>`)
      .setColor('YELLOW');
            return message.channel.send(embed);
        } catch(err) {
            return message.channel.send("เอ๊ะ! ไม่สามารถย้ายผู้ใช้นี้ได้ค่ะ");
        }
    }
} 