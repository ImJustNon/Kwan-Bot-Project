const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
require("discordjs-activity");

module.exports = {
    config: {
        name: 'pokernight',
        description: 'Make pokernight Link',
        aliases: ["pn"],
        usage: 'pn <channel ID>',
    },
	run: async (bot, message, args) => {
		
		if (!message.member.voice.channel){
			return message.channel.send('โปรดเข้าห้องเสียงด้วยน่ะคะ')
		}
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")){
			return message.channel.send('ขวัญต้องการสิทธิ์ในการสร้างคำเชิญด้วยนะคะ ')
		}
		
		let Invite = await message.member.voice.channel.activityInvite("755827207812677713"); 
		let embed = new MessageEmbed()
			.setAuthor('Discord:Poker Night')
            .setThumbnail('https://cdn.discordapp.com/attachments/887363452304261140/892229295991312384/Screen_Shot_2021-05-06_at_1.46.50_PM_2.png')
            .setColor("#9542f5")
            .addFields(
                { name: `:game_die:` +' |  ลิ้งสำหรับเข้า  **Discord:Poker Night**  ค่ะ :', value: `https://discord.com/invite/${Invite.code}` },
            )
            .setFooter("K w a n")
            .setTimestamp(new Date())
			
		await message.channel.send(embed);	
	},
}