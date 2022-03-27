const Discord = require('discord.js');
const fetch = require('node-fetch');
const setting = require('../../data/setting.js');
const { PREFIX } = require('../../config.js');
const db = require("quick.db");

module.exports = {
  config : {
    name: "covid",
    category: "Utility",
    aliases: ["corona"],
    description: "Gives you the stats of the covid with your provided code",
    example: `c!covid India`,
  },
    run: async (client, message, args) => {
        let prefix;
        if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX;
            } 
            else {
                prefix = fetched;
            }
        } 
        catch (e) {
            console.log(e);
        }

        let countries = args.join(" ");
        const noArgs = new Discord.MessageEmbed()
        .setTitle('โปรดระบุข้อมูลเพื่อทการค้นหาด้วยค่ะด้วยค่ะ')
        .setColor('ff0000')
        .addField(`\` ${prefix}covid  < ชื่อประเทศ >\``,'ระบุชื่อประเทศ',true)
        .addField(`\` ${prefix}covid  all \``,'ทั้งโลก',true)
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`สถานะการ COVID-19 ทั้งโลก 🌎`)
                .addField('ผู้ป่วยที่ได้รับการยืนยันว่าติดเชื้อ', confirmed)
                .addField('ไดัรับการรักษา', recovered)
                .addField('เสียชีวิต', deaths)
                .setFooter(`K w a n`)
                .setTimestamp()

                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`สถานะการ COVID-19 ของ **${countries}**`)
                .addField('ผู้ป่วยที่ได้รับการยืนยันว่าติดเชื้อ', confirmed)
                .addField('ไดัรับการรักษา', recovered)
                .addField('เสียชีวิต', deaths)
                .setFooter(`K w a n`)
                .setTimestamp()

                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send(`${setting.emoji.error} : โปรดระบุชื่อประเทศให้ถูกต้องด้วยน่ะคะ`)
            })
        }
    }
}