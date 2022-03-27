const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
require("discordjs-activity");

module.exports = {
    config: {
        name: 'fishington',
        description: 'Make Fishington.io Link',
        aliases: ["ft"],
        usage: 'ft <channel ID>',
    },
	run: async (bot, message, args) => {
		
		if (!message.member.voice.channel){
			return message.channel.send('โปรดเข้าห้องเสียงด้วยน่ะคะ')
		}
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")){
			return message.channel.send('ขวัญต้องการสิทธิ์ในการสร้างคำเชิญด้วยนะคะ ')
		}
		
		let Invite = await message.member.voice.channel.activityInvite("814288819477020702"); 
		let embed = new MessageEmbed()
			.setAuthor('Fishington.io')
            .setThumbnail('https://cdn.discordapp.com/attachments/887363452304261140/892230059979575336/cover-1615371400662.png')
            .setColor("#12b0ff")
            .addFields(
                { name: `:diving_mask:` +' |  ลิ้งสำหรับเข้าเกม **Fishington.io** ค่ะ :', value: `https://discord.com/invite/${Invite.code}` },
            )
            .setFooter("K w a n")
            .setTimestamp(new Date())
			
		await message.channel.send(embed);	
	},
}