const Discord = module.require("discord.js");

module.exports = {
  config : {
	name: "delchannel",
	description: "Delete Channels From your Server"},
	run: async(client, message, args) => {
	if (!message.member.hasPermission("MANAGE_CHANNELS")) {
	return message.channel.send("คุณไม่มีสิทธิพอน่ะคะ")
	}
        const fetchedChannel = message.mentions.channels.first();
	if (!fetchedChannel) {
	return message.channel.send("โปรดใส่ชื่อช่องที่ต้องการจะ**ลบ**ด้วยค่ะ")
        }
	fetchedChannel.delete()

	const embed = new Discord.MessageEmbed()
	.setDescription ("ได้ลบช่องนั้นเเล้ว")
	.setColor("GREEN");
	
	await message.channel.send(embed);
}
}