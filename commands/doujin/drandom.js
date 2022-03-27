const nHentai = require('shentai')
const sHentai = new nHentai

module.exports = {
    config: {
        name: 'drandom',
        description: 'randomdoujin from Nhentai',
        aliases: ['rdoujin'],
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
        
        const randomnhentai = await sHentai.getRandom()
        await message.channel.send(`https://nhentai.net/g/${randomnhentai.id}`)
            

    },
}
/*
function nhentai() {
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    let random = getRndInteger(0,390139)
    const url = message.channel.send(`https://nhentai.net/g/${random}`)
    return url
}*/