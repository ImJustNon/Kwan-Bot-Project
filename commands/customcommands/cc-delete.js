const schema = require('../../models/custom-commands.js');
const { PREFIX } = require('../../config.js');
const db = require('quick.db');

module.exports = {
    config:{
        name: 'cc-delete',
        aliases: ['cc-remove'],
    },
    run: async(client, message, args) => {
        let prefix;
        if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX 
            } 
            else {
                prefix = fetched
            }
        } 
        catch (e) {
            console.log(e)
        };

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('เอ๊ะ! ดูเหมือนว่าคุณจะไม่มีสิทธิในการเข้าถึงคำสั่งนี้น่ะคะ');

        const name = args[0];

        if(!name) return message.channel.send('โปรดระบุคำสั่งที่ต้องการจะลบด้วยน่ะคะ');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.channel.send(`เอ๊ะ! ดูเหมือนว่าจะไม่พบคำสั่งนี้น่ะคะ ลองใช้คำสั่ง ${prefix}cc-list`);
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.channel.send(`ได้นำคำสั่ง **${name}** ออกเรียบร้อยเเล้วค่ะ`);
    }
}