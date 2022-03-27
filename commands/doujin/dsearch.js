const nHentai = require('shentai')
const sHentai = new nHentai

module.exports = {
    config: {
        name: 'dsearch',
        description: 'popular doujin from Nhentai',
        aliases: [],
        usage: '<user>',
        accessableby: "",
    },
    run: async(bot, message, args) =>{

        var errMessage = "โปรดใช้คำสั่งประเภท NSFW ในห้อง NSFW น่ะคะ";
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.reply(errMessage).then(msg => {
                msg.delete({ timeout: 3000 })
            }) 
        }

        const Text = args.join(" ");
        if(!Text)return message.channel.send('โปรดระบุสิ่งที่ต้องการค้นหาด้วยน่ะคะ')
        let random = Math.floor(Math.random() * 25);

        const search = await sHentai.search(Text.toLowerCase())

        if (search.status) return message.channel.send('ไม่พบสิ่งที่คุณต้องการจะค้นหาค่ะ');

        await message.channel.send(`https://nhentai.net/g/${search.results[random].id}`)
            

    },
}
