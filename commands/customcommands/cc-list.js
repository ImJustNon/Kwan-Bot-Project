const schema = require('../../models/custom-commands.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "cc-list",
        aliases: [],
    },
    run: async(client, message, args) => {
        const data  = await schema.find({ Guild: message.guild.id });
        if(!!data === false) return message.channel.send('ยังไม่มีการสร้างคำสั่งในเซิฟเวอร์นี้ค่ะ');

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(data.map((cmd, i) => `${i + 1}: ${cmd.Command}`).join('\n'))

        message.channel.send(embed);
    }
}