const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'find-channel-id',
        aliases: ['channel-id','ch-id'],
    },
    run: async(bot, message, args) => {
        try {
            let Text = args.join(" ");
            if (!Text) return message.channel.send('โปรดระบุชื่อช่องที่ต้องการจะค้นหาด้วยน่ะ');

            let channel = await message.guild.channels.cache.find(channel => channel.name === Text);

            if (!channel) return message.channel.send('ดูเหมือนว่าจะไม่พบช่องที่คุณต้องการจะค้นหาน่ะคะ');

            let embed = new MessageEmbed()
                .setColor('#6835f2')
                .setTitle(`ID ห้อง ${channel.name} `)
                .setDescription(`\`\`\` ${channel.id} \`\`\``)
                .setFooter('K w a n')
                .setTimestamp()
            await message.channel.send(embed);
        }
        catch(err) {
            console.log(err);
        }
    }
}