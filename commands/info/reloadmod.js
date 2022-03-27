const Discord = require("discord.js")
const { readdirSync } = require("fs");
const { OWNER_ID }  = require('../.././config.js')

module.exports = {
    config: {
        name: "reloadmod",
        description: "Reload command- Dev Only",
        aliases: ['rmod','reload']
    },

    run: async (bot, message, args) => {

        let embed = new Discord.MessageEmbed()
        .setTitle("Reload")
        .setDescription("ขออภัยด้วยน่ะคะ, คำสั่ง `reload` อนุญาติให้ใช้ได้เฉพาะ Dev.เท่านั้นนะค่ะ")
        .setColor("#cdf785");
        if(message.author.id !== OWNER_ID) return message.channel.send(embed);

        if(!args[0]) return message.channel.send(`โปรดระบุข้อมูลตามนี้ค่ะ \` k/reloadmod <Folder> <File> \``)
        if(!args[1]) return message.channel.send('โปรดใส่ **ไฟล์** ที่ต้องการด้วยน่ะคะ')
       
        let folder = args[0].toLowerCase()
        let commandName = args[1].toLowerCase()
        
        try {
          delete require.cache[require.resolve(`../${folder}/${commandName}.js`)]
          const pull = require(`../${folder}/${commandName}.js`)
          bot.commands.set(pull.config.name, pull)
          message.channel.send(`Successfully reloaded: \` ${folder}/${commandName}.js \``)
        }
        catch (e) {
          console.log(e)
          return message.channel.send(`Could not Reload Command: ${folder}/${commandName} From Moderation Module Because: \n${e}`)
        }


      }
} 