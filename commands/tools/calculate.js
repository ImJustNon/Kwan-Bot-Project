const Discord = require('discord.js');
const math = require('mathjs');

module.exports = {
    config: {
        name: "calculate",
        aliases: [],
        description: "Shows Calculated Answers Of User's Query",
        usage: "[query](mathematical)",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {

        if (!args[0]) return message.channel.send("**ลองใส่อะไรก็ได้ให้ขวัญลองคิดดูสิ**");

        let result;
        try {
            result = math.evaluate(args.join(" ").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/"));
        } catch (e) {
            return message.channel.send("**มีข้อผิดพลาดในการคำนวณ** \n\n\n [ขวัญรู้น่ะว่าคุณเเกล้งพิมพ์ผิดน่ะ :kissing_smiling_eyes:]");
        }

        let embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .addField("**จากสมการ**", `\`\`\`Js\n${args.join("").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/")}\`\`\``)
            .addField("**ผลการคำนวณ**", `\`\`\`Js\n${result}\`\`\``)
            .setFooter('K w a n')
            .setTimestamp()
        await message.channel.send(embed);
    }
}