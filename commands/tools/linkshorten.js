const shorten = require('isgd');


module.exports = {
    config : {
      name: "linkshorten",
    aliases: ["shorten"],
    category: "Utility",
    description: "Shortens your URL to is.gd format !!",
    example: `c!linkshorten https://discord.gg/RWSEj6JrjJ blob_lab`},

    run: async (client, message, args) => {

        if (!args[0]) return message.reply(`โปรดใส่ชื่อลิ้งที่จะทำให้สั้นลงให้ด้วยน่ะคะ \`${PREFIX}shortenlink <link> <name>\``)

        if (!args[0]) {
            shorten.shorten(args[0], function(res) {
                if(res.startsWith('Error:')) return message.reply(` ไม่สามารถใช้ URL นี้ได้ค่ะ **${res}**`)

                message.channel.send(`**<${res}>**`)
            })

        } else {

            shorten.custom(args[0], args[1], function(res) {
                if(res.startsWith('Error Code:')) return message.reply(` **${res}**`)

                message.channel.send(`**<${res}>**`)
            })
        }
    }
}