const Discord = require('discord.js');
const config = require('../../config');


module.exports = {
    config: {
        name: 'emojify',
        description: 'Emojifies your text message',
        aliases: ["emojify"],
        usage: '<text>',
        accessableby: "",
    },
    run: async (client, message, args) => {
    
        if(!args[0]) {
			return message.channel.send('โปรดใส่ตัวอักษรหรือประโยคด้วยน่ะคะ   [ภาษาอังกฤษนะเพราะมันไม่มี imoji ภาษาไทยน่ะสิ]',);
		}

		const specialChars = {
			'0': ':zero:',
			'1': ':one:',
			'2': ':two:',
			'3': ':three:',
			'4': ':four:',
			'5': ':five:',
			'6': ':six:',
			'7': ':seven:',
			'8': ':eight:',
			'9': ':nine:',
			'#': ':hash:',
			'*': ':asterisk:',
			'?': ':grey_question:',
			'!': ':grey_exclamation:',
			' ': '   ',
		};

		const emojified = `${args.join(' ')}`.toLowerCase().split('').map(letter => {
			if (/[a-z]/g.test(letter)) {
				return `:regional_indicator_${letter}: `;
			}
			else if (specialChars[letter]) {
				return `${specialChars[letter]} `;
			}
			return letter;
		}).join('');

		if(emojified.length > 2000) {
			return message.channel.send(`${client.emotes.error} อ๊าาาา! ขวัญถึงขีดจำกัดเเล้วสิลองส่งสิ่งที่ต้องการเเปลงน้อยกว่านี้หน่อยน่ะ`);
		}

		message.channel.send(emojified);

    }
}

