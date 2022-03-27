const Discord = module.require("discord.js");

module.exports = {
  config : {
    name: "createvc",
    description: "Create Voice Channels in your Server"},
    run: async(client, message , args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.channel.send("คุณไม่มีสิทธิพอน่ะคะ")
}
    if (!args[0]) {
    return message.channel.send("โปรดใส่ชื่อที่ต้องการจะ**สร้าง**ด้วยค่ะ")
}
    message.guild.channels.create(args.slice(0).join(" "), {type: "voice"});

    const embed = new Discord.MessageEmbed()
    .setDescription(`ได้สร้างช่องเสียงใหม่เเล้ว`)
    .setColor("GREEN");
  message.channel.send(embed);
}
}