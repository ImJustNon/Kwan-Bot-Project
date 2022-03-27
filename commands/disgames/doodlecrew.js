const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
require("discordjs-activity");

module.exports = {
    config: {
        name: 'doodlecrew',
        description: 'Make Doodle Crew Link',
        aliases: [],
        usage: 'doodlecrew <channel ID>',
    },
	run: async (bot, message, args) => {
		
		if (!message.member.voice.channel){
			return message.channel.send('โปรดเข้าห้องเสียงด้วยน่ะคะ')
		}
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")){
			return message.channel.send('ขวัญต้องการสิทธิ์ในการสร้างคำเชิญด้วยนะคะ ')
		}
		
		let Invite = await message.member.voice.channel.activityInvite("878067389634314250"); 
		let embed = new MessageEmbed()
			.setAuthor('Doodle Crew')
            .setThumbnail('https://cdn.discordapp.com/attachments/933667577207611402/933978004219117578/unknown.png')
            .setColor("#f5b042")
            .addFields(
                { name: `:pencil2:` +' |  ลิ้งสำหรับเข้าเกม **Doodle Crew** ค่ะ :', value: `https://discord.com/invite/${Invite.code}` },
            )
            .setFooter("K w a n")
            .setTimestamp(new Date())
			
		await message.channel.send(embed);	
	},
}