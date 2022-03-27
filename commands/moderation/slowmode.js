module.exports = {
    config: {
          name: "slowmode",
          description: "Set the slowmode for the channel!",
          aliases: ['sm']
    },
  run: async (bot, message, args) => {
  
    if (!args[0])
      return message.channel.send(
        `โปรดระบุเวลาที่จะทำการส่งได้ในเเต่ละข้อความ ด้วยน่ะคะ`
      );
      
    if (isNaN(args[0])) return message.channel.send(`โปรดระบุเป็นตัวเลขน่ะคะ`);
    
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `ได้ทำการตั้งค่าการหน่วงเวลาในการส่งข้อความเป็น **${args[0]}**`
    );
  },
};