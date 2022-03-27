const Discord = require('discord.js');
const config = require('../../config');
const AppleStore = require("app-store-scraper");

 
module.exports = {
  config: {
    name: 'applestore',
    description: '',
    aliases: ["astore",'apptore'],
    usage: '',
    accessableby: "",
  },
  run: async (client, message, args) => {
    if (!args[0]) return message.channel.send(`โปรดระบุชื่อเเอปที่ต้องการจะค้นหาด้วยน่ะคะ`);

    AppleStore.search({
      term: args.join(" "),
      num: 1,
      lang: 'th'
    }).then(async (Data) => {
      let App;
      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.channel.send(`เอ๊ะ! ดูเหมือนว่าจะไม่พบแอปพลิเคชันนี้น่ะคะ `);
      }
      let Description = App.description.length > 200 ? `${App.description.substr(0, 200)}...` : App.description
      let Price = App.free ? "ฟรี" : `$${App.price}`;
      let Score = App.score.toFixed(1);

      let Embed = new Discord.MessageEmbed()
        .setColor('#ffffff')
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(Description)
        .addField(`ราคา`, Price, true)
        .addField(`ผู้พัฒนา`, App.developer, true)
        .addField(`คะเเนน`, Score, true)
        .setFooter(`K w a n`)
        .setTimestamp();

      return await message.channel.send(Embed);
    });
  }
}
