const setting = require('../../data/setting.js'); 
const ownerID = setting.mainbot.OwnerID;

module.exports = {
    config: {
        name: "undeafen",
        description: "Undeafen a member in a voice channel",
        usage: "Undeafen <user>",
        aliases: ["undeaf"]
    },

    run: async(bot, message, args) => {
     if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [DEAFEN_MEMBERS] เพื่อใช้คำสั่งนี้น่ะคะ**");

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("ไม่พบผู้ใช้นี้ในเซิฟเวอร์นี้")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "ไม่ระบุ"


        try {
            member.voice.setDeaf(false, reason);
            message.channel.send(" ✅ : เรียบร้อยค่ะ")
        } 
        
        catch (error) {
            console.log(error)
            message.channel.send("error")
        }

    }
}