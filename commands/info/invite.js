const { MessageEmbed } = require('discord.js');
const { ClientId,Permission } = require('../../config.js')
module.exports = {
    config: {
        name: "invite",
        description: "Help Menu",
        aliases: ['inv'],
        usage: "1) m/inv ",
        example: "1) m/inv",
    },
    run: async (bot, message, args) => {
        const inv = new MessageEmbed()
        .setColor('#32f435')
        .setAuthor('เชิญ ✨ Kwan 💕 #0111 เข้าเซิฟเวอร์ของคุณ')
        .setDescription(`คุณสามารถเชิญ ขวัญเข้าเซิฟเวอร์ของคุณได้ - โดยกด :point_right: [เชิญบอท](https://discord.com/api/oauth2/authorize?client_id=${ClientId}&permissions=${Permission}&scope=bot%20applications.commands)`)
        .setTimestamp()
        .setFooter('K w a n');
		
        await message.channel.send(inv);
    },
};