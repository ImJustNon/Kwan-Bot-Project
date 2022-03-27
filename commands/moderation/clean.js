const setting = require('../../data/setting.js'); 
const ownerID = setting.mainbot.OwnerID;
module.exports = {
    config: {
        name: "clean",
        aliases: [],
        category: "moderation",
        description: "Deletes messages from a channel",
        usage: "m/clean [amount of messages]"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("คุณไม่มีสิทธิพอน่ะคะ - [MANAGE_MESSAGES]")
        if (isNaN(args[0]))
            return message.channel.send('**โปรดใส่จำนวนข้อความที่ต้องการลบค่ะ**');

        if (args[0] > 100)
            return message.channel.send("**โปรดใส่จำนวนข้อความ น้อยกว่า 100 น่ะคะ**");

        if (args[0] < 1)
            return message.channel.send("**โปรดใส่จำนวนข้อความ มากกว่า 1 น่ะคะ**");

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`**ลบข้อความ \`${messages.size}/${args[0]}\` ข้อความเรียบร้อย**`).then(msg => msg.delete({ timeout: 5000 }))).catch(() => null)
    }
}