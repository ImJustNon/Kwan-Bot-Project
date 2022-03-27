const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
require("discordjs-activity");

module.exports = {
    config: {
        name: 'spellcast',
        description: 'Make SpellCast Link',
        aliases: [],
        usage: 'SpellCast <channel ID>',
    },
	run: async (bot, message, args) => {
		
		if (!message.member.voice.channel){
			return message.channel.send('โปรดเข้าห้องเสียงด้วยน่ะคะ')
		}
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")){
			return message.channel.send('ขวัญต้องการสิทธิ์ในการสร้างคำเชิญด้วยนะคะ ')
		}
		
		let Invite = await message.member.voice.channel.activityInvite("852509694341283871"); 
		let embed = new MessageEmbed()
			.setAuthor('SpellCast')
            .setThumbnail('https://cdn.discordapp.com/attachments/933667577207611402/933981126446415922/unknown.png')
            .setColor("#8833ff")
            .addFields(
                { name: `:purple_circle:` +' |  ลิ้งสำหรับเข้าเกม **SpellCast** ค่ะ :', value: `https://discord.com/invite/${Invite.code}`},
            )
            .setFooter("K w a n")
            .setTimestamp(new Date())
			
		await message.channel.send(embed);	
	},
}