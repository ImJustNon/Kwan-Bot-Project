const Discord = require('discord.js');

module.exports = {
  config : {
    name: "qrcode",
    aliases: ["qr"],
    category: "Utility",
    description: "Coneverts the provided link to a qr code cool ?",
    example: `c!qr https://youtube.com`
    },

    run: async (client, message, args) => {
    
        let link = (args[0])
        let qrlink = `http://api.qrserver.com/v1/create-qr-code/?data=${link}&size=200x200`

        if (!link) 
        return message.channel.send(` โปรดใส่ลิ้งที่ต้องการมาด้วยน่ะคะ`)

        if (require('is-url')(link)) {
            const attachment = new Discord.MessageAttachment(qrlink, 'qrcode.png');

            const embed = new Discord.MessageEmbed()
            .setTitle('นี่คือ QR-CODE ของคุณค่ะ')
            .attachFiles(attachment)
            .setColor('#adfc03')
            .setImage('attachment://qrcode.png')
            .setFooter('K w a n')
            .setTimestamp()

            message.channel.send(embed)

        } else {
            message.reply(`เอ๊ะ! ดูเหมือนว่าลิ้งที่ส่งมานี้จะมีปัญหาน่ะลองเช็คก่อนดูใหม่น่ะ`)
        }

    }
}