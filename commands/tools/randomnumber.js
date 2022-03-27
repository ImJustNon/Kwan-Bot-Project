const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = '#34eb49';

module.exports = {
	config : {
		name: "randomnumber",
		aliases: ["rn"],
		category: "fun",
		description: "Get Random Number!",
		usage: "Randomnumber",
	},
  run: async (bot, message, args) => {
    //Start
    try {
    if(!args[0] || !args[1]) return message.channel.send(`จะสุ่มเลขอะไรถึงเลขอะไรดีค่ะ \` randomnumber < เลขที่1 >  < เลขที่2 > \``)
    
    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min;
    }
    let result = getRandomArbitrary(parseInt(args[0]),parseInt(args[1]))

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`ผลการสุ่มระหว่าง : ${args[0]}-${args[1]}`)
      .setDescription(result)
      .setFooter(`K w a n`)
      .setTimestamp();

    await message.channel.send(embed);
  }
  catch(err){
    console.log(err)
    message.channel.send('โปรดระบุสิ่งที่จำเป็นตามนี้ให้ถูกต้องด้วยน่ะคะ \` randomnumber < เลขที่1 >  < เลขที่2 > \`')
  }//End
  }
};