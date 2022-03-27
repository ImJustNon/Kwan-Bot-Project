const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
require("discordjs-activity");

module.exports = {
    config: {
        name: 'chessdevelopment',
        description: 'Make Chess in the Park Development Link',
        aliases: ["chessdev"],
        usage: 'chessdev <channel ID>',
    },
	run: async (bot, message, args) => {
		
		if (!message.member.voice.channel){
			return message.channel.send('โปรดเข้าห้องเสียงด้วยน่ะคะ')
		}
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")){
			return message.channel.send('ขวัญต้องการสิทธิ์ในการสร้างคำเชิญด้วยนะคะ ')
		}
		
		let Invite = await message.member.voice.channel.activityInvite("832012586023256104"); 
		let embed = new MessageEmbed()
			.setAuthor('Discord:Chess In The Park Development')
            .setThumbnail('https://cdn.discordapp.com/attachments/887363452304261140/892232912089534514/chess_banner.png')
            .setColor("#42f542")
            .addFields(
                { name: `:gear:` +' |  ลิ้งสำหรับเข้าเกม **Discord:Chess In The Park Development** ค่ะ :', value: `https://discord.com/invite/${Invite.code}` },
            )
            .setFooter("K w a n")
            .setTimestamp(new Date())
			
		await message.channel.send(embed);	
	},
}