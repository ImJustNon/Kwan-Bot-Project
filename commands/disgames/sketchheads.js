const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
require("discordjs-activity");

module.exports = {
    config: {
        name: 'sketchheads',
        description: 'Make Sketch Heads Link',
        aliases: [],
        usage: 'Sketch Heads <channel ID>',
    },
	run: async (bot, message, args) => {
        if (!message.member.voice.channel){
			return message.channel.send('โปรดเข้าห้องเสียงด้วยน่ะคะ')
		}
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")){
			return message.channel.send('ขวัญต้องการสิทธิ์ในการสร้างคำเชิญด้วยนะคะ ')
		}
		
		let Invite = await message.member.voice.channel.activityInvite("902271654783242291"); //Made using discordjs-activity package 880218394199220334
		let embed = new MessageEmbed()
			.setAuthor('Sketch Heads')
            .setColor("#33fff8")
            .setThumbnail('https://cdn.discordapp.com/attachments/933667577207611402/939444621329694760/unknown.png')
            .addFields(
                { name: `:regional_indicator_a:` +' |  ลิ้งสำหรับเข้า  **Sketch Heads**  ค่ะ :', value: `https://discord.com/invite/${Invite.code}` },
            )
            .setFooter("K w a n")
            .setTimestamp(new Date())
			
		await message.channel.send(embed);	
    }
}