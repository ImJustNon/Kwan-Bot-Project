const { RandomPHUB } = require('discord-phub');
const pornhub = new RandomPHUB(unique = true);

module.exports = {
    config: {
        name: 'porn',
        description: 'select pornhub media',
        aliases: [],
        usage: '<user>',
        accessableby: "",
    },
    run: async(bot,message,args) => {
        var errMessage = "โปรดใช้คำสั่งประเภท NSFW ในห้อง NSFW น่ะคะ";
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.reply(errMessage).then(msg => {
                msg.delete({ timeout: 3000 })
            }) 
        }
        
        if (!args[0])return message.channel.send('โปรดเลือกสิ่งที่ต้องการจะให้ส่งด้วยน่ะคะ')
        if (!args[1])return message.channel.send('โปรดเลือกประเภทของไฟล์ด้วยน่ะคะ')

        const category = args[0].toLowerCase()
        const filetype = args[1].toLowerCase()
        

        try {
            const porn = pornhub.getRandomInCategory(category , filetype);
            await message.channel.send(porn.url);
        }
        catch(err) {
            await message.channel.send('โปรดตรวจสอบข้อมูลให้ถูกต้องด้วยน่ะคะ')
        }

    },
}