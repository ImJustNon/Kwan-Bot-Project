const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
require("discordjs-activity");

module.exports = {
    config: {
        name: 'wordsnacks',
        description: 'Make Word Snacks Link',
        aliases: [],
        usage: 'wordsnacks <channel ID>',
    },
	run: async (bot, message, args) => {
		
		if (!message.member.voice.channel){
			return message.channel.send('โปรดเข้าห้องเสียงด้วยน่ะคะ')
		}
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")){
			return message.channel.send('ขวัญต้องการสิทธิ์ในการสร้างคำเชิญด้วยนะคะ ')
		}
		
		let Invite = await message.member.voice.channel.activityInvite("879863976006127627"); 
		let embed = new MessageEmbed()
			.setAuthor('Word Snacks')
            .setThumbnail('https://cdn.discordapp.com/attachments/933667577207611402/933979248622964746/unknown.png')
            .setColor("#f58742")
            .addFields(
                { name: `:lollipop:` +' |  ลิ้งสำหรับเข้าเกม **Word Snacks** ค่ะ :', value: `https://discord.com/invite/${Invite.code}` },
            )
            .setFooter("K w a n")
            .setTimestamp(new Date())
			
		await message.channel.send(embed);	
	},
}