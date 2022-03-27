const Discord = module.require("discord.js");

module.exports = {
  config : {
    name: "deleterole",
    description: "Deletes a role"},
    run: async(client, message, args) => {
    const role = message.mentions.roles.first();
    if (!message.member.hasPermission("MANAGE_ROLES")) {
    return message.channel.send("คุณไม่มีสิทธิพอน่ะคะ")
    }
    if (!role) {
    return message.channel.send("โปรดใส่ชื่อยศที่ต้องการจะ**ลบ**ด้วยค่ะ")
    } 
    role.delete();
    const embed = new Discord.MessageEmbed()
    .setDescription (`${role} ยศนี้ได้ถูกลบเรียบร้อย`)
    .setColor("GREEN");
  await message.channel.send(embed);
}
}