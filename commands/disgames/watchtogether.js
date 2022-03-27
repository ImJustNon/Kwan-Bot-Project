const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
require("discordjs-activity");

module.exports = {
    config: {
        name: 'watchtogether',
        description: 'Make Watch Together Dev Link',
        aliases: ["wt"],
        usage: 'wt <channel ID>',
    },
	run: async (bot, message, args) => {
		
		if (!message.member.voice.channel){
			return message.channel.send('โปรดเข้าห้องเสียงด้วยน่ะคะ')
		}
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")){
			return message.channel.send('ขวัญต้องการสิทธิ์ในการสร้างคำเชิญด้วยนะคะ ')
		}
		
		let Invite = await message.member.voice.channel.activityInvite("880218832743055411"); 
		let embed = new MessageEmbed()
			.setAuthor('Watch Together Dev')
            .setThumbnail('https://cdn.discordapp.com/attachments/933667577207611402/933973836020482048/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3835393037343830373133323139323736392f3839313839303632353135333232343735352f756e6b6e6f776e2e706e67.png')
            .setColor("BLACK")
            .addFields(
                { name: `:tv:` +' |  ลิ้งสำหรับเข้า  **Watch Together Dev**  ค่ะ :', value: `https://discord.com/invite/${Invite.code}` },
            )
            .setFooter("K w a n")
            .setTimestamp(new Date())
			
		await message.channel.send(embed);	
	},
}