const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
require("discordjs-activity");

module.exports = {
    config: {
        name: 'youtubetogether',
        description: 'Make youtubetogether Link',
        aliases: ["ytt"],
        usage: 'ytt <channel ID>',
    },
	run: async (bot, message, args) => {
		
		if (!message.member.voice.channel){
			return message.channel.send('โปรดเข้าห้องเสียงด้วยน่ะคะ')
		}
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")){
			return message.channel.send('ขวัญต้องการสิทธิ์ในการสร้างคำเชิญด้วยนะคะ ')
		}
		
		let Invite = await message.member.voice.channel.activityInvite("880218394199220334"); //Made using discordjs-activity package 880218394199220334
		let embed = new MessageEmbed()
			.setAuthor('YouTube-Together')
            .setThumbnail('https://cdn.discordapp.com/attachments/887363452304261140/892020173513564200/2560px-YouTube_full-color_icon_28201729.png')
            .setColor("#ff3d3d")
            .addFields(
                { name: `:tv:` +' |  ลิ้งสำหรับเข้า  **YouTube Together**  ค่ะ :', value: `https://discord.com/invite/${Invite.code}` },
            )
            .setFooter("K w a n")
            .setTimestamp(new Date())
			
		await message.channel.send(embed);	
	},
}