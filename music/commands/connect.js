const util = require("../util");

module.exports = {
    name: "connect",
    aliases: ["join", "j"],
    exec: async (msg, args) => {
        const channel = msg.member.voice.channel;
        if (!channel)
		return msg.channel.send("เอ๊ะ! คุณต้องเข้าห้องเสียงก่อนน่ะคะ");

        if (!channel.permissionsFor(msg.client.user).has("CONNECT"))
		return error("ขวัญไม่มีสิทธิ์อนุญาติให้เข้าห้องเสียงได้อ่ะ");

        if (!channel.permissionsFor(msg.client.user).has("SPEAK"))
		return error("ขวัญขอสิทธิในการพูดในช่องเสียงด้วยสิ");

        await channel.join();
        return msg.channel.send(util.embed()
		  .setDescription("**ขวัญเข้ามาเเล้วจ้า :white_check_mark: **")
		  .setColor("BLUE")
		);
    },
}