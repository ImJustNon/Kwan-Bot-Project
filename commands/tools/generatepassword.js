const { MessageEmbed } = require("discord.js");
const generator = require('generate-password');

module.exports = {
    config : {
    name: "generatepassword",
    aliases: ["genpassword"],
    category: "tools",
    description: "generate-password"
    },
    run: async (client, message, args) => {
        try {
            if(!args[0] || !args[1] || !args[2])return message.channel.send('โปรดระบุสิ่งที่จำเป็นตามนี้น่ะคะ \` genpassword  <ความยาวของรหัส>  <มีตัวเลขหรือไม่(true/false)>  <มีตัวอักษรพิเศษหรือไม่(true/false)> \`')
            let number = getBoolean(args[1])
            let symbole = getBoolean(args[2])

            function getBoolean(value){ 
                switch(value) { 
                  case true: 
                  case "true": 
                  case "yes": 
                    return true; 
                  default: 
                    return false; 
                } 
            }
                var passwords = generator.generate({
                    length: parseInt(args[0]),
                    numbers: number,
                    symbols: symbole,
                });
                const embed = new MessageEmbed()
                    .setTitle('นี้คือพาสเวิร์ดของคุณค่ะ')
                    .setColor('RANDOM')
                    .setDescription(`||${passwords}||`)
                    .setFooter('K w a n')
                    .setTimestamp()
                await message.channel.send(embed)
                return

        }
        catch(err){
            message.channel.send('โปรดระบุสิ่งที่จำเป็นตามนี้ \` genpassword  <ความยาวของรหัส>  <มีตัวเลขหรือไม่(true/false)>  <มีตัวอักษรพิเศษหรือไม่(true/false)> \` ให้ถูกต้องด้วยน่ะคะ')
            console.log(err)
        }
    }
};