const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
require("discordjs-activity");

module.exports = {
    config: {
        name: 'checkersinthepark',
        description: 'Make Checkers In The Park Link',
        aliases: ['checkers'],
        usage: 'Sketch Heads <channel ID>',
    },
	run: async (bot, message, args) => {
        if (!message.member.voice.channel){
			return message.channel.send('โปรดเข้าห้องเสียงด้วยน่ะคะ')
		}
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")){
			return message.channel.send('ขวัญต้องการสิทธิ์ในการสร้างคำเชิญด้วยนะคะ ')
		}
		
		let Invite = await message.member.voice.channel.activityInvite("832013003968348200"); //Made using discordjs-activity package 880218394199220334
		let embed = new MessageEmbed()
			.setAuthor('Checkers In The Park')
            .setColor("#33fff8")
            .setThumbnail('https://cdn.discordapp.com/attachments/933667577207611402/939444621329694760/unknown.png')
            .addFields(
                { name: `:nazar_amulet:` +' |  ลิ้งสำหรับเข้า  **Checkers In The Park**  ค่ะ :', value: `https://discord.com/invite/${Invite.code}` },
            )
            .setFooter("K w a n")
            .setTimestamp(new Date())
			
		await message.channel.send(embed);	
    }
}