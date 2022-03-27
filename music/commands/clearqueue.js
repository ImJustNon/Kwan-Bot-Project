const util = require("../util");

module.exports = {
    name: "clearqueue",
    description:"Clean up the queue.",
    aliases: ["clearq"],
    exec: (msg) => {
        const { music } = msg.guild;
        if (!music.player) return msg.channel.send(util.embed().setDescription("❌ |  ตอนนี้ไม่ได้ยังไม่มีีคิวเล่นอย่น่ะคะ"));
        if (!music.queue.length) return msg.channel.send(util.embed().setDescription("❌ |  คิวยังว่างอยู่น่ะคะ"));

        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setDescription("❌ |  คุณจะต้องเข้าห้องเสียงก่อนใช้นะคะ"));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setDescription(`❌ |  คุณจำเป็นต้องอยู่ใน ${msg.guild.me.voice.channel} เพื่อใช้คำสั่งนี้นะคะ`));
            
        music.queue.splice(0, 1);
        msg.channel.send(util.embed().setDescription("✅ |  เคลียร์คิวเรียบร้อยเเล้วค่ะ")).catch(e => e);
    }
};
