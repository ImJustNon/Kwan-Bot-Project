const weather = require('weather-js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "weather",
        category: "info",
        description: "Shows weather of a city",
        usage: "[city name]",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        try {
            if(!args[0]) return message.channel.send('**โปรดระบุตำเเหน่งด้วยน่ะคะ**')
      
            weather.find({search: args.join(" "), degreeType: 'C'}, async(err, result) => {
            
                if(err) message.channel.send(err.message);

                if(result.length === 0) {
                    message.channel.send('**โปรดระบุตำเเหน่งให้ถูกต้องด้วยน่ะคะด้วยน่ะคะ**')
                    return undefined;
                }

                var current = result[0].current;
                var location = result[0].location;

                const embed = new MessageEmbed()
                    .setDescription(`**${current.skytext}**`)
                    .setAuthor(`${current.observationpoint}`)
                    .setThumbnail(current.imageUrl)
                    .setColor("GREEN")
                    .addField('**โซนเวลา**', `UTC ${location.timezone}`, true)
                    .addField('**หน่วยอุณหภูมิ**', `${location.degreetype}`, true)
                    .addField('**อุณหภูมิ**', `${current.temperature} องศา`, true)
                    .addField('**ความรู้สึก**', `${current.feelslike} องศา`, true)
                    .addField('**ความเร็วลม**', `${current.winddisplay}`, true)
                    .addField('**ความชื้น**', `${current.humidity}%`, true)
                    .addField('**วันที่**', `${current.date}`, true)
                    .addField('**วัน**', `${current.day}`, true)
                    .setFooter('K w a n')
                    .setTimestamp()

                await message.channel.send(embed)
            });
        }
        catch(err){
            message.channel.send('เอ๊ะ! ดูเหมือนว่าจะมีอะไรเเปลกๆน่ะ โปรดรองดูอีกครั้งน่ะคะ')
            console.log(err)
        }
    }
}