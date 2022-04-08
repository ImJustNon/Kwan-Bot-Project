const { MessageEmbed } = require("discord.js");
const util = require("../util");

const modes = ["none", "track", "queue"];
const aliases = {
    single: "track",
    track: "track",
    song: "track",
    this: "track",
    current: "track",
    all: "queue",
    every: "queue",
    queue: "queue",
    off: "none",
    none: "none",
    nothing: "none"
};

module.exports = {
    name: "loop",
    aliases: ["repeat"],
    exec: (msg, args) => {
        const embed = new MessageEmbed()
            .setColor('#e1eb34')
            .setTitle(`โปรดเลือก \` track \` , \` queue \` หรือ \` none \` ต่อจากคำสั่งด้วยค่ะ`)
            .setFooter('K w a n')
            .setTimestamp()

        const { music } = msg.guild;
        if (!music.player) return msg.channel.send(util.embed().setDescription("❌ | Currently not playing anything."));
        if (!args[0]){
            return msg.channel.send(embed)
        }
        if (args[0]) {
            if (!msg.member.voice.channel)
                return msg.channel.send(util.embed().setDescription("❌ |  คุณจะต้องเข้าห้องเสียงก่อนใช้นะคะ"));
            if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
                return msg.channel.send(util.embed().setDescription(`❌ | คุณจำเป็นต้องอยู่ใน ${msg.guild.me.voice.channel} เพื่อใช้คำสั่งนี้นะคะ`));

            const loopMode = aliases[args[0].toLowerCase()];
            if (loopMode && modes.includes(loopMode)) {
                music.loop = modes.indexOf(loopMode);
                msg.channel.send(util.embed().setColor('#34ebe1').setDescription(music.loop === 0 ? "✅ | **\` ปิดการใช้งาน \`** วนซ้ำเรียบร้อยเเล้วค่ะ" : `✅ | **\` เปิดการใช้งาน \`**  วนซ้ำเเบบ  \`${modes[music.loop]}\`  เรียบร้อยเเล้วค่ะ`));
            } else {
                msg.channel.send(
                    util.embed()
                        .setDescription("❌ |  ไม่พบคำสั่งวนซ้ำที่ต้องการค่ะ โปรดลอง single / all หรือ off.")
                );
            }
        } else {
            msg.channel.send(util.embed().setDescription(`✅ |  ตอนนี้กำลังวนซ้ำเเบบ : ${modes[music.loop]} : อยู่นะคะ`));
        }
    }
};
