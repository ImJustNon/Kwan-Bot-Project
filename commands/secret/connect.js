const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "_connect",
        aliases: ["join", "j"],
        description: "Bans the user",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
    },

run: async (bot, message) => {
		const channel = message.member.voice.channel;
		if (!channel)
		return message.channel.send("เอ๊ะ! คุณต้องเข้าห้องเสียงก่อนน่ะคะ");

		if (!channel.permissionsFor(message.client.user).has("CONNECT"))
		return error("ขวัญไม่มีสิทธิ์อนุญาติให้เข้าห้องเสียงได้อ่ะ");

	  	if (!channel.permissionsFor(message.client.user).has("SPEAK"))
		return error("ขวัญขอสิทธิในการพูดในช่องเสียงด้วยสิ");

		await channel.join();

		return message.channel.send(new MessageEmbed()
		  .setDescription("**ขวัญเข้ามาเเล้วจ้า :white_check_mark: **")
		  .setColor("BLUE")
		);
	}
}