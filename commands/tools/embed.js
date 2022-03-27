const { MessageEmbed } = require("discord.js");

module.exports = {
  config : {
    name: "embed",
    aliases: [],
    usage: "<prefix>embed"
  },
  run : async (client, msg, args) => {
    if (!msg.member.hasPermission("ADMINISTRATOR"))
      return msg.channel
        .send("คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้น่ะคะ")
        .then(m => {
          setTimeout(() => {
            m.delete();
          }, 3000);
        });
    let embed = new MessageEmbed();
    msg
      .reply("จะตั้ง **title** ว่าอะไรดีค่ะ? ถ้าไม่มีให้พิมพ์ `none`")
      .then(m => m.delete({ timeout: 30000 }));
    let title = await msg.channel.awaitMessages(
      res => res.author.id === msg.author.id,
      {
        max: 1,
        time: 30000
      }
    );

    if (title.size) {
      if (title.first().content !== "none") {
        if (title.first().length > 256)
          return msg
            .reply("**Title** ไม่สามารถมีตัวอักษรเกิน **256** ได้ค่ะ")
            .then(m => m.delete({ timeout: 5000 }));
        embed.setTitle(title.first().content);
      }
    }

    msg
      .reply(
        "จะตั้ง **description** ว่าอะไรดีค่ะ? ถ้าไม่มีให้พิมพ์ `none`"
      )
      .then(m => m.delete({ timeout: 30000 }));
    let description = await msg.channel.awaitMessages(
      res => res.author.id === msg.author.id,
      {
        max: 1,
        time: 30000
      }
    );

    if (description.size) {
      if (description.first().content !== "none") {
        if (description.first().length > 2048)
          return msg
            .reply("**Description** ไม่สามารถมีตัวอักษรเกิน **2048** ได้ค่ะ")
            .then(m => m.delete({ timeout: 5000 }));
        embed.setDescription(description.first().content);
      }
    }

    msg
      .reply("จะตั้ง **image** เป็นอะไรดีค่ะ? ถ้าไม่มีให้พิมพ์ `none`")
      .then(m => m.delete({ timeout: 30000 }));
    let image = await msg.channel.awaitMessages(
      res => res.author.id === msg.author.id,
      {
        max: 1,
        time: 30000
      }
    );

    if (image.size) {
      if (image.first().content !== "none") {
        if (!/\.(jpe?g|png|gif)$/i.test(image.first().content)) {
          return msg
            .reply("โปรดระบุ URL ของภาพให้ถูกต้องด้วยน่ะคะ")
            .then(m => m.delete({ timeout: 5000 }));
        }
        embed.setImage(image.first().content);
      }
    }

    msg
      .reply(
        "จะตั้ง **color** เป็นอะไรดีค่ะ? สามารถระบุเป็น Hex หรือชื่อสีได้ค่ะ"
      )
      .then(m => m.delete({ timeout: 30000 }));
    let color = await msg.channel.awaitMessages(
      res => res.author.id === msg.author.id,
      {
        max: 1,
        time: 30000
      }
    );

    embed.setColor(color.first().content);

    msg
      .reply("จะตั้ง **footer** เป็นอะไรดีค่ะ? ถ้าไม่มีให้พิมพ์ `none`")
      .then(m => m.delete({ timeout: 30000 }));
    let footer = await msg.channel.awaitMessages(
      res => res.author.id === msg.author.id,
      {
        max: 1,
        time: 30000
      }
    );

    if (footer.size) {
      if (footer.first().content !== "none") {
        if (footer.first().length > 2048)
          return msg
            .reply("**Footer** ไม่สามารถมีตัวอักษรเกิน **2048** ได้ค่ะ")
            .then(m => m.delete({ timeout: 5000 }));
        embed.setFooter(footer.first().content);
      }
    }

    msg.channel.send(embed);
  }
}

