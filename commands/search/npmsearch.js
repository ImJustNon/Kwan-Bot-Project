const Discord = require('discord.js');
const config = require('../../config');
const random = require("something-random-on-discord").Random

module.exports = {
    config: {
        name: 'npmsearch',
        description: 'send result from npm',
        aliases: [],
        usage: '<query/name>',
        accessableby: "",
    },
    run: async (client, message, args) => {
        let Text = args.join(" ");
        if(!Text)return message.channel.send('โปรดระบุสิ่งที่ต้องการค้นหาใน NPM ด้วยค่ะ')
        try {
            let data = await random.getNPM(Text);
            await message.channel.send(data)
        }
        catch (err){
            await message.channel.send('อืมม...ดูเหมือนว่าจะไม่พบสิ่งที่คุณต้องการจะค้นหาน่ะคะ')
        }
    }
}