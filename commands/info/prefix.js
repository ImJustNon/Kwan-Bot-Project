const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config")


module.exports = {
    config: {
        name: "prefix",
        description: "Chnage/Know The server's Prefix or the Global Prefix",
        usage: "m/prefix <new prefix/reset>", 
        example: "1) m/prefix = \n2) m/prefix reset",
        aliases: ["prefix"]
    },
    run: async (bot, message, args) => {
        let option = args[0];

            //PERMISSION
		if(!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send("คุณไม่มีสิทธิพอที่จะตั้งค่า Prefix ได้น่ะคะ")
        }
            
        if(!option) {
            let prefix;
            prefix = db.fetch(`prefix_${message.guild.id}`)
            if (!prefix) prefix = PREFIX;
            let prefEmbed = new MessageEmbed()
            .setColor('YELLOW')
			.setAuthor(`Prefix ของขวัญสำหรับ   ${message.guild.name} \n คือ  ${prefix} ค่ะ `)
            .setThumbnail(message.guild.iconURL())
			.addFields(
				{ name: 'รีเซต Prefix', value: `\` ${prefix}prefix reset \``, inline: true },
				{ name: 'ตั้งค่า Prefix', value: `\` ${prefix}prefix <คำสั่งใหม่> \``, inline: true }
			)
			.setTimestamp()
			.setFooter('K w a n')
				
            return await message.channel.send(prefEmbed)
        }

        if(args[0].toLowerCase() === "reset") {
            db.delete(`prefix_${message.guild.id}`)
            return await message.channel.send("รีเซตเรียบร้อยค่ะ ✅")
        }
            
        if(args[1]) {
            return message.channel.send("ไม่สามารถตั้งค่าลักษณะนี้ได้นะคะ")
        }
            
        if(args[0].length > 4) {
            return message.channel.send("คุณไม่สามารถตั้งค่า Prefix ได้เกิน 4 ตัวอักษรได้น่ะคะ")
        }
            
        if(args.join("") === PREFIX) {
            db.delete(`prefix_${message.guild.id}`)
			return await message.channel.send("รีเซตเรียบร้อยค่ะ ✅")
        }
            
        db.set(`prefix_${message.guild.id}`, args[0])
        await message.channel.send(`เรียบร้อยค่ะ ✅ | ขวัญได้ถูกตั้งค่า Prefix เป็น \` ${args[0]} \`เรียบร้อยเเล้วค่ะ`)
            

    }
        
}