const schema = require('../../models/command.js');

module.exports = {
    config: {
        name : 'command-enable',
        aliases: ['cmd-enable'],
    },
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('เอ๊ะ! ดูเหมือนว่าคุณจะไม่มีสิทธิในการเข้าถึงคำสั่งนี้น่ะคะ')
        const cmd = args[0];
        if(!cmd) return message.channel.send('โปรดระบุคำสั่งที่ต้องการจะเปิดการใช้งานด้วยค่ะ')
        if(!!client.commands.get(cmd) === false) return message.channel.send('เอ๊ะดูเหมือนจะไม่พบคำสั่งนี้น่ะคะ');
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(err) throw err;
          if(data) {
              if(data.Cmds.includes(cmd)) {
                  let commandNumber;

                  for (let i = 0; i < data.Cmds.length; i++) {
                      if(data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                  }

                  await data.save()
                  message.channel.send(`ได้ตั้งค่าคำสั่ง **\` ${cmd} \`** ให้เปิดใช้งานเรียบร้อยเเล้วค่ะ`)
              }  else return message.channel.send('คำสั่งนี้ได้ตั้งค่าเปิดการใช้งานเอาไว้อยู่เเล้วค่ะ')
          }
        })
    }
}