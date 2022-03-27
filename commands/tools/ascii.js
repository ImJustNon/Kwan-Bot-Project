const Discord = require("discord.js");
const figlet = require("figlet");

module.exports = {
  config : {
  name: 'ascii'},

  run : async (client, message , args) => {
 let p = args.join(" ")
figlet(p, function(err, data) {
    if (err) {
        message.channel.send('เอ๊ะ! โปรดลองใหม่อีกครั้งน่ะคะ');
        console.dir(err);
        return;
    }
    message.channel.send(`\`\`\`${data}\`\`\``)
});
  }
}