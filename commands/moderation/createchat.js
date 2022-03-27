const Discord = module.require("discord.js");

module.exports = {
  config : {
    name: "createchat",
    description: "Create Voice Channels in your Server"},
    run: async(client, message , args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("คุณไม่มีสิทธิพอน่ะคะ")
    }
    if (!args[0]) {
    return message.channel.send("โปรดใส่ชื่อที่ต้องการจะ**สร้าง**ด้วยค่ะ")
}
    message.guild.channels.create(args.slice(0).join(" "), {type: "chat"});

    const embed = new Discord.MessageEmbed()
    .setDescription(`ได้สร้างช่องเเชทใหม่เเล้ว`)
    .setColor("GREEN");
  message.channel.send(embed);
}
}