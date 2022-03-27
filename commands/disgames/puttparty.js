
const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    config: {
        name: 'puttparty',
        description: 'Make Puttparty Link',
        aliases: [],
        usage: 'Puttparty <channel ID>',
    },
	run: async (bot, message, args) => {
        if (!message.member.voice.channel){
			return message.channel.send('โปรดเข้าห้องเสียงด้วยน่ะคะ')
		}
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")){
			return message.channel.send('ขวัญต้องการสิทธิ์ในการสร้างคำเชิญด้วยนะคะ ')
		}
		
        bot.discordTogether.createTogetherCode(message.member.voice.channel.id, 'puttparty').then(async invite => {
            let embed = new MessageEmbed()
			.setAuthor('Putt party')
            .setColor("#33fff8")
            .setThumbnail('https://cdn.discordapp.com/attachments/933667577207611402/939456121893163028/m20olbvy0wy71.png')
            .addFields(
                { name: `:hockey:` +' |  ลิ้งสำหรับเข้า  **Putt party**  ค่ะ :', value: `${invite.code}` },
            )
            .setFooter("K w a n")
            .setTimestamp(new Date())
			
		    await message.channel.send(embed);
        });
    }
}