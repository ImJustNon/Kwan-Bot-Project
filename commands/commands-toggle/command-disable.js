const schema = require('../../models/command.js');

module.exports = {
    config: {
        name : 'command-disable',
        aliases: ['cmd-disable'],
    },
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('เอ๊ะ! ดูเหมือนว่าคุณจะไม่มีสิทธิในการเข้าถึงคำสั่งนี้น่ะคะ')
        const cmd = args[0];
        if(!cmd) return message.channel.send('โปรดระบุคำสั่งที่ต้องการจะปิดการใช้งานด้วยค่ะ')
        if(!!client.commands.get(cmd) === false) return message.channel.send('เอ๊ะดูเหมือนจะไม่พบคำสั่งนี้น่ะคะ');
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(cmd)) return message.channel.send('คำสั่งนี้ได้ถูดปิดการใช้งานไปก่อนหน้านี้เรียบร้อยเเล้วค่ะ');
                data.Cmds.push(cmd)
            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Cmds: cmd
                })
            }
            await data.save();
            message.channel.send(`ได้ตั้งค่าคำสั่ง **\` ${cmd} \`** ให้ปิดการใช้งานเรียบร้อยเเล้วค่ะ`)
        })
    }
}