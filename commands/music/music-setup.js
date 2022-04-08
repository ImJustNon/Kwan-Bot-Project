const db = require('../../database/quickmongo.js');
const { MessageEmbed } = require('discord.js');
const setting = require('../../data/setting.js');
const { MessageActionRow, MessageButton } = require('discord-buttons');
const { MessageMenuOption, MessageMenu } = require("discord-buttons");

module.exports = {
    config: {
        name: 'music-setup',
        aliases: [],
        description: 'setup channel for music',
    },
    run: async(client, message, args, prefix) =>{
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
        
        
        const embed = new MessageEmbed()
            .setColor('#ff1c59')
            .setTitle(`หากต้องการจะตั้งค่าระบบห้องเพลงให้กด \`ยืนยัน\` \nหากต้องการยกเลิกให้กด \`ยกเลิก\``)
            .setFooter('K w a n')
            .setTimestamp()

        let yes = new MessageButton()
            .setLabel(`ยืนยัน [Accept]`)
            .setID(`yes`)
            .setStyle(`SUCCESS`)
            .setEmoji(`✅`)
        let no = new MessageButton()
            .setLabel(`ยกเลิก [Cancel]`)
            .setID(`no`)
            .setStyle(`PRIMARY`)
            .setEmoji(`❌`)
        let row = new MessageActionRow()
            .addComponents(yes,no)
        const MESSAGE = await message.channel.send(embed,row)
        const filter = ( button ) => button.clicker.id === message.author.id
        const collector = MESSAGE.createButtonCollector(filter, { time : 30000 });
        collector.on('collect', async (b)  => {
            if(b.id == 'yes'){
                setupMusic()
                await MESSAGE.delete();
            }
            if(b.id == 'no'){
                await message.channel.send('ทำการยกเลิกรายการเรียบร้อยค่ะ');
                await MESSAGE.delete();
            }
            await b.reply.defer();
        });


        async function setupMusic(){
            try{
                await message.guild.channels.create(`${client.user.username} Music`,{
                    type: `text`
                })
                .then(async (channel) => {
                    await db.set(`music_${message.guild.id}_channel`,channel.id);
                    const trackEmbed = new MessageEmbed()
                        .setColor(setting.music.config.embedColor)
                        .setTitle('ยังไม่มีเพลงเล่นอยู่ ณ ตอนนี้ค่ะ')
                        .setImage(setting.music.config.defaultTrackImage)
                        .setFooter('K w a n')
                        .setTimestamp()
                    //----------------- Button -----------------
                    let bpause = new MessageButton()
                        .setID(`pause`)
                        .setStyle(`SUCCESS`)
                        .setEmoji(`⏯`)
                    let bskip = new MessageButton()
                        .setID(`skip`)
                        .setStyle(`SECONDARY`)
                        .setEmoji(`⏭`)
                    let bstop = new MessageButton()
                        .setID(`stop`)
                        .setStyle(`red`)
                        .setEmoji(`⏹`)
                    let bloop = new MessageButton()
                        .setID(`loop`)
                        .setStyle(`SECONDARY`)
                        .setEmoji(`🔁`)
                    let bshuffle = new MessageButton()
                        .setID(`shuffle`)
                        .setStyle(`SUCCESS`)
                        .setEmoji(`🔀`)
                    let bvolumeup = new MessageButton()
                        .setID(`volup`)
                        .setLabel(`เพิ่มเสียง`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`🔊`)
                    let bvolumedown = new MessageButton()
                        .setID(`voldown`)
                        .setLabel(`ลดเสียง`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`🔉`)
                    let bmute = new MessageButton()
                        .setID(`mute`)
                        .setLabel(`ปิด/เปิดเสียง`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`🔈`)
                    let row = new MessageActionRow()
                        .addComponents(bpause,bskip,bstop,bloop,bshuffle)
                    let row2 = new MessageActionRow()
                        .addComponents(bvolumedown,bvolumeup,bmute)
                    //----------------- Select Menu ----------------
                    

                    
                    await channel.send(setting.music.config.defaultSupportImage).then(async(msg) => await db.set(`music_${message.guild.id}_support_message`, msg.id));
                    await channel.send('**คิวเพลง:**\nเข้าช่องเสียง และพิมพ์ชื่อเพลงหรือลิงก์ของเพลง เพื่อเปิดเพลงค่ะ').then(async(msg) => await db.set(`music_${message.guild.id}_queue_message`, msg.id));
                    await channel.send(trackEmbed,{components: [row, row2]}).then(async(msg) => await db.set(`music_${message.guild.id}_track_message`, msg.id));
                    await message.channel.send(':white_check_mark: ทำการตั้งค่าระบบเพลงเรียบร้อยเเล้วค่ะ');
                });
            }
            catch(err){
                console.log(err);
            }
        }
    }
}