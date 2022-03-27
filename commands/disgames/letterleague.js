const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
require("discordjs-activity");

module.exports = {
    config: {
        name: 'letterleague',
        description: 'Make Letter Tile Link',
        aliases: [],
        usage: 'lettertile <channel ID>',
    },
	run: async (bot, message, args) => {
		
		if (!message.member.voice.channel){
			return message.channel.send('โปรดเข้าห้องเสียงด้วยน่ะคะ')
		}
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")){
			return message.channel.send('ขวัญต้องการสิทธิ์ในการสร้างคำเชิญด้วยนะคะ ')
		}
		
		let Invite = await message.member.voice.channel.activityInvite("879863686565621790"); 
		let embed = new MessageEmbed()
			.setAuthor('Letter League')
            .setThumbnail('https://cdn.discordapp.com/attachments/933667577207611402/933981126446415922/unknown.png')
            .setColor("#c693ed")
            .addFields(
                { name: `:jigsaw:` +' |  ลิ้งสำหรับเข้าเกม **Letter League** ค่ะ :', value: `https://discord.com/invite/${Invite.code}` },
            )
            .setFooter("K w a n")
            .setTimestamp(new Date())
			
		await message.channel.send(embed);	
	},
}