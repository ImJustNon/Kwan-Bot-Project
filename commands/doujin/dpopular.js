const nHentai = require('shentai')
const sHentai = new nHentai

module.exports = {
    config: {
        name: 'dpopular',
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
        let random = Math.floor(Math.random() * 5);
        const doujins = await sHentai.getPopular()
        await message.channel.send(`https://nhentai.net/g/${doujins[random].id}`)
            

    },
}
