const Discord = module.require("discord.js");

module.exports = {
  config : {
    name: "catsay",
    description: "Make the cat say your message"
  },
  run: async(client, message, args) => {
   
    const state = "enabled";
    if (state === "disabled") {
    return message.channel.send("คำสั่งนี้ได้ปิดการใช้งานไปเเล้วน่ะคะ");
    }
    const msg = args.join(" ");
    if (!msg) {
    return message.channel.send("อยากให้ภาพเเมวพูดว่าอะไรหรอค่ะ ?");
    }
    message.channel.send({files: [{attachment: `https://cataas.com/cat/cute/says/${msg}`, name: "catsay.png"}]});
  }
}