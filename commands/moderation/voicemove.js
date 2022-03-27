const {MessageEmbed} = require("discord.js");

module.exports = {
    config: {
        name: "voicemove",
        aliases: [],
    },
    run: async (client, message, args) => {
        if (!message.member.permissions.any(["MOVE_MEMBERS"])) {
            return message.channel.send("คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [Move_Members] เพื่อใช้คำสั่งนี้น่ะคะ");
        }

        let channel = message.member.voice.channel;

        if (!channel) return message.channel.send("คุณจะต้องเข้าช่องเสียงก่อนใช้คำสั่งนี้น่ะคะ");

        if (!message.guild.me.voice.connection) {

        channel.join().then((connection) => {

            message.guild.me.voice.setSelfDeaf(true);

            const e = new MessageEmbed()
                .setAuthor('| Voicemove', message.author.avatarURL({dynamic: true}))
                .setDescription('**ได้ทำการย้ายเรียบร้อย**')
                .setColor('#010030')

            message.channel.send(e)

            client.on("voiceStateUpdate", async (oldmem, newmem) => {

                if (newmem.member.voice.channel && newmem.member.voice.channel.id !== channel.id) {

                    let newchannel = message.guild.channels.cache.get(newmem.member.voice.channel.id);

                    if (client.user.id === newmem.member.user.id) {

                        channel.members.forEach(e => {

                            e.voice.setChannel(newchannel);

                            newchannel.leave();

                        })

                    }

                }

            })

        })

    }

    else {

        message.channel.send(`**ได้ทำการย้ายเสร็จสมบูรณ์**`);

    }
}}