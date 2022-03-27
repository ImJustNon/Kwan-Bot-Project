const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch")

module.exports = {
    config: {
        name: "github",
        description: "Github User Account Information!",
        usage: "m/github <name>",
        example: "1) m/github MSVFORYOU",
        aliases: ["git"]
    },
    run: async (client, message, args) => {
        try {
            if (!args[0]) return message.channel.send(`โปรดระบุชื่่อผู้ใช้ของ GitHub ด้วยน่ะคะ`)

            fetch(`https://api.github.com/users/${args.join('-')}`).then(res => res.json()).then(body => {
                if(body.message) return message.channel.send(`เอ๊ะ! ดูเหมือนว่าจะไม่พบชื่อผู้ใช้นี้น่ะคะ โปรดลองดูอีกครั้งน่ะคะ`);
                let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;

                const embed = new MessageEmbed()
                    .setAuthor(`ข้อมูล GitHub ของ ${login}`, avatar_url, html_url)
                    .setColor(`#63ffd6`)
                    .setThumbnail(`${avatar_url}`)
                    .addField(`ชื่อผู้ใช้`, `${login}`)
                    .addField(`เลข ID`, `${id}`)
                    .addField(`คำอธิบายเพิ่มเติม`, `${bio || "ไม่ระบุ"}`)
                    .addField(`ผลงานสาธารณะ`, `${public_repos || "ไม่มี"}`, true)
                    .addField(`ผู้ติดตาม`, `${followers}`, true)
                    .addField(`กำลังติดตาม`, `${following}`, true)
                    .addField(`ตำเเหน่ง`, `${location || "ไม่ระบุ"}`)
                    .addField(`บัญชีถูกสร้างเมื่อ`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
                    .setFooter(`K w a n`)
                message.channel.send(embed)
            })
        } catch (error) {
            console.log(`[Commands] [github] Getting Error In github Command :\n`, error);
            return message.channel.send(`เอ๊ะ! ดูเหมือนว่าจะมีอะไรเเปลกๆน่ะ โปรดรองดูอีกครั้งน่ะคะ`)
        }
    }
};