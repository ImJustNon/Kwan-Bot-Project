const schema = require('../../models/custom-commands.js');
const { PREFIX } = require('../../config.js');
const db = require('quick.db');

module.exports = {
    config: {
        name: 'cc-create',
        aliases: ['cc-add'],
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
        const response = args.slice(1).join(" ");

        if(!name) return message.channel.send(`โปรดระบุชื่อคำสั่งที่ต้องการต้องการตามนี้เลยค่ะ \` ${prefix}cc-create < ชื่อคำสั่ง >  < สิ่งที่ต้องการให้ทำ > \``);
        if(!response) return message.channel.send('โปรดระบุสิ่งที่ต้องการจะให้ส่งหลังจากใช้คำสั่งนี้ด้วยค่ะ');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(data) return message.channel.send('เอ๊ะ! ดูเหมือนว่าจะมีคำสั่งนี้อยู่เเล้วน่ะคะ ลองใช้ชื่ออื่นๆดูก็ได้น่ะ');
        const newData =  new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(`บันทึกการตั้งค่าคำสั่ง **${name}** เรียบร้อยเเล้วค่ะ`);
    }
}