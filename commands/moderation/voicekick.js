module.exports = {
    config: {
        name: "voicekick",
        aliases: ["vckick"],
        description: "kick a member from the vc ",
        usage: "z!vckick [mention]"
    },
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send(
        "ขวัญไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] ค่ะ"
      );

    if (!message.mentions.members.first())
      return message.channel.send(
        `โปรดระบุผู้ใช้ที่ต้องการจะเตะออกจากห้องเสียงด้วยค่ะ`
      );

    let { channel } = message.mentions.members.first().voice;

    if (!channel)
      return message.channel.send(`ไม่พบผู้ใช้นี้อยู่ในห้องเสียงเลยค่ะ`);

    message.mentions.members.first().voice.kick();
    
    message.channel.send(`ได้ทำการเตะผู้ใช้นี้ออกจากห้องเสียงเรียบร้อยค่ะ`)
  }
};