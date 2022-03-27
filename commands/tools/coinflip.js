const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = '#ebd834';

module.exports = {
	config : {
		name: "coinflip",
		aliases: ["toss", "flip"],
		description: "Flip A Coin!",
		usage: "Coinflip",
	},
  run: async (bot, message, args) => {
    //Start

    const coins = ["Heads", "Tails", "Center"];

    let result = Math.floor(Math.random() * coins.length);

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`ด้านที่ออกคือ`)
      .setDescription(coins[result])
      .setFooter(`โยนโดย ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};