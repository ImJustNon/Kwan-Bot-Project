const Discord = require('discord.js');
const config = require('../../config');
const { MessageAttachment } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    config: {
        name: 'clyde',
        description: 'Shows your text as Clyde\'s message',
        aliases: ["clyde"],
        usage: '<text>',
        accessableby: "",
    },
    run: async (client, message, args) => {
    
        const text = args.slice().join(' ');
		if (!text) {
			return message.channel.send( '❎ อยากให้บอท clyde บอกว่าอะไรค่ะ?',);
		}

		const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('❎ เกิดข้อผิดพลาด โปรดลองอีกครั้ง');
		}
		const attachment = new MessageAttachment(response.message, 'clyde.png');
		return message.channel.send(attachment);
  
    }
}