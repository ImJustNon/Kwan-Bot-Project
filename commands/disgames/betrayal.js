const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
require("discordjs-activity");

module.exports = {
    config: {
        name: 'betrayal',
        description: 'Make pokernight Link',
        aliases: ["bt"],
        usage: 'bt <channel ID>',
    },
	run: async (bot, message, args) => {
		
		if (!message.member.voice.channel){
			return message.channel.send('โปรดเข้าห้องเสียงด้วยน่ะคะ')
		}
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")){
			return message.channel.send('ขวัญต้องการสิทธิ์ในการสร้างคำเชิญด้วยนะคะ ')
		}
		
		let Invite = await message.member.voice.channel.activityInvite("773336526917861400"); 
		let embed = new MessageEmbed()
			.setAuthor('Betrayal.io')
            .setThumbnail('https://cdn.discordapp.com/attachments/887363452304261140/892033516311830528/uTq81LtO.png')
            .setColor("#9542f5")
            .addFields(
                { name: `:video_game:` +' |  ลิ้งสำหรับเข้า  **Betrayal.io**  ค่ะ :', value: `https://discord.com/invite/${Invite.code}` },
            )
            .setFooter("K w a n")
            .setTimestamp(new Date())
			
		await message.channel.send(embed);	
	},
}