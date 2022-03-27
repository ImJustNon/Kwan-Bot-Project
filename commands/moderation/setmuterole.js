const db = require("quick.db");

module.exports = {
  config: {
    name: "setmuterole",
    aliases: ["setmute", "smrole", "smr"],
    description: "Sets A Mute Role For Muted Users!",
    usage: "[role name | role mention | role ID]",
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้น่ะคะ"
      );
    if (!args[0]) {
      let b = await db.fetch(`muterole_${message.guild.id}`);
      let roleName = message.guild.roles.cache.get(b);
      if (message.guild.roles.cache.has(b)) {
        return message.channel.send(
          `**ยศ Mute ของเซิฟเวอร์นี้คือ \`${roleName.name}\` นะคะ**`
        );
      } else
        return message.channel.send(
          "**โปรดระบุชื่อยศหรือเลข ID ยศเพื่อทำการตั้งค่าด้วยน่ะคะ**"
        );
    }

    let role =
      message.mentions.roles.first() ||
      bot.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send("**โปรดระบุชื่อยศหรือเลข ID ยศเท่านั้นน่ะคะ**");

    try {
      let a = await db.fetch(`muterole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send(
          "**ยศยี้ได้ถูกตั้งค่าเป็นยศ Mute อยู่เเล้วน่ะคะ**"
        );
      } else {
        db.set(`muterole_${message.guild.id}`, role.id);

        message.channel.send(
          `**\`${role.name}\` ได้ถูตั้งค่าเป็นยศ Mute เรียบร้อยเเล้วน่ะคะ**`
        );
      }
    } catch (e) {
      return message.channel.send("**Error - สิทธิการจักการเซิฟเวอร์หายไปน่ะคะ**");
    }
  }
};
