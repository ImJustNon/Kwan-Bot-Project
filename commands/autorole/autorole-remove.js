const db = require('../../database/quickmongo.js');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord-buttons');


module.exports = {
    config: {
        name: 'autorole-remove',
        aliases: ['autorole-delete'],
        description: 'remove auto role',
    },
    run: async(bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention("**คุณไม่มีสิทธิพอน่ะคะ ต้องการยศ [ADMINISTRATOR] เพื่อใช้คำสั่งนี้่ค่ะ**");
        
        const getRoleCount = await db.get(`autorole_${message.guild.id}_count`);
        if(getRoleCount == null || getRoleCount == '0') return message.lineReplyNoMention('คุณยังไม่มีการตั้งค่าเพิ่มยศอัตโนมัติเลยน่ะคะ');

        const embed = new MessageEmbed()
        .setColor('#ff1c59')
        .setTitle(`หากต้องการจะลบการตั้งค่าระบบเพิ่มยศอัตโนมัติให้กด \`ยืนยัน\` \nหากต้องการยกเลิกให้กด \`ยกเลิก\``)
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
                await b.reply.defer();
                await removeAutoRoleData();
            }
            if(b.id == 'no'){
                await message.channel.send('ทำการยกเลิกรายการเรียบร้อยค่ะ');
                await MESSAGE.delete();
            }
            await b.reply.defer();
        });

        let removeAutoRoleData = async() => {
            let i;
            for(i = 1; i < parseInt(getRoleCount) + 1; i++){
                await db.delete(`autorole_${message.guild.id}_${i}`);
            }
            await db.delete(`autorole_${message.guild.id}_count`).then(() =>{
                message.channel.send(':white_check_mark: ทำการลบการตั้งค่าระบบเพิ่มยศอัตโนมัติเรียบร้อยค่ะ');
                MESSAGE.delete();
            });
        }
    }
}

/*
let allRole = [];
let i;
for(i = 1; i < parseInt(getRoleCount) + 1; i++){
    let getRole = await db.get(`autorole_${message.guild.id}_${i}`);
    allRole.push(getRole);
}

let embed = new MessageEmbed()
    .setAuthor(`การตั้งค่าเพิ่มยศอัตโนมัติของ ${message.guild.name}`, message.guild.iconURL())
    .setColor('#ff29bb')
    .setDescription('โปรดเลือกยศที่มีอยู่ต่อไปนี้เพื่อลบค่ะ')
    .setFooter('K w a n')
    .setTimestamp()

let ii;
for(ii = 0; ii < allRole.length; ii++){
    let ROLE = await message.guild.channels.cache.get(allRole[ii]);
    if(!ROLE) continue;
    embed.addField(`${ii + 1}) ${ROLE.name}`, `\` ${ROLE.id} \``, false);
}

message.channel.send(embed);

if(args[0]){
    if(isNaN(args[0])) return message.lineReplyNoMention('โปรดระบุเฉพาะ')
}
*/