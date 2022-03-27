const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
    config: {
        name: 'meme',
        usage: '<prefix> meme ',
        description: "Sends an epic meme",
    },
    run: async (bot, message, args) => {
        try{
        const subReddits = ["DiWHY", "meme", "me_irl","thaithai","cursedimages","cursedcomments","therewasanattempt","CrappyDesign","PerfectTiming","dankmemes","Memes_Of_The_Dank","WatchPeopleDieInside","maybemaybemaybe","nextfuckinglevel"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const image = await randomPuppy(random);
    
        await message.channel.send(image);
        }
        catch(err){
            console.log('โปรดลองอีกครั้งน่ะคะ')
        }
    },
}
