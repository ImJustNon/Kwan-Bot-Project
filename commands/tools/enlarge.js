const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Color = `#ffffff`;

module.exports = {
    config : {
        name: "enlarge",
        category: "fun",
        description: "Converting Server emoji to PNG/GIF!"
    },
    run: async(client, message, args) => {

        const authoravatar = message.author.avatarURL();
        const emoji = args[0];
        if (!emoji) return message.channel.send(`โปรดระบุอีโมจิด้วยน่ะคะ`);

        let customemoji = Discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"
                }`;

            const Added = new MessageEmbed()
                .setAuthor(`ขยายอีโมจิ`, authoravatar)
                .setColor(`${Color}`)
                .setDescription(`\`${customemoji.name}\` \`${customemoji.id}\``)
                .setImage(Link
                );
            return message.channel.send(Added);
        } else {
            let CheckEmoji = parse(emoji, { assetType: "png" });
            if (!CheckEmoji[0])
                return message.channel.send(`โปรดระบุอีโมจิที่อยู่ในเซิฟเวอร์นี้เท่านั้นน่ะคะ`);
            message.channel.send(
                `คุณสามารถใช้อีโมจินี้ทุกที่ได้ค่ะ`
            );
        }
    }
};