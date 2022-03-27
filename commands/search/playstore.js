const Discord = require("discord.js");
const PlayStore = require("google-play-scraper");

module.exports = {
  config: {
    name: "playstore",
    aliases: ["googleplaystore", "googleps"],
    category: "info",
    description: "Show Playstore Application Information Of Your Given Name!",
    usage: "<Application Name>",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
	  if (!args[0]) return message.channel.send(`โปรดระบุชื่อเเอปที่ต้องการจะค้นหาด้วยน่ะคะ`);

    PlayStore.search({
      term: args.join(" "),
      num: 1
    }).then(async (Data) => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.channel.send(`เอ๊ะ! ดูเหมือนว่าจะไม่พบแอปพลิเคชันนี้น่ะคะ `);
      }

      let Embed = new Discord.MessageEmbed()
        .setColor("#38ff4c")
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(App.summary)
        .addField(`ราคา`, App.priceText)
        .addField(`ผู้พัฒนา`, App.developer)
        .addField(`คะเเนน`, App.scoreText)
        .setFooter(`K w a n`)
        .setTimestamp();

      return message.channel.send(Embed);
    });
  }
}