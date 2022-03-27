var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = require("../../config")
const db = require('quick.db')
const { stripIndents } = require("common-tags");
const setting = require('../../data/setting.js');
const Enbed_Color = '#92eb34';
const disbut = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord-buttons');



module.exports = {
    config: { 
        name: "oldhelp",
        description: "old Help Menu",
        usage: "1) m/help \n2) m/help [module name]\n3) m/help [command (name or alias)]",
        example: "1) m/help\n2) m/help utility\n3) m/help ban",
        aliases: []
    },
    run: async (bot, message, args) => {
        let prefix;
        if (message.author.bot || message.channel.type === "dm") return;
            try {
                let fetched = await db.fetch(`prefix_${message.guild.id}`);
                if (fetched == null) {
                    prefix = PREFIX 
                } else {
                    prefix = fetched
                }
            } catch (e) {
                console.log(e)
            };

        if(!args[0]){
            //-------------------embed-------------------
            const help = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งทั้งหมด')
                //.setDescription('1️⃣   |   คำสั่งเกี่ยวกับบอท - คำสั่งเกี่ยวกับเกม - คำสั่งเกี่ยวกับตัดต่อรูปภาพ - คำสั่งเกี่ยวกับเครื่องมือ - คำสั่งเกี่ยวกับการค้นหา \n\n2️⃣   |   คำสั่งเกี่ยวกับเพลง')
                .addField('1️⃣  :',' คำสั่งเกี่ยวกับบอท / คำสั่งเกี่ยวกับเกม / คำสั่งเกี่ยวกับตัดต่อรูปภาพ / คำสั่งเกี่ยวกับเครื่องมือ / คำสั่งเกี่ยวกับการค้นหา',false)
                .addField('2️⃣  :',' คำสั่งเกี่ยวกับเพลง / คำสั่งเกี่ยวกับมีมเเละGIF / คำสั่งเกี่ยวกับNSFW / คำสั่งเกี่ยวกับการจัดการเซิฟเวอร์ [1] / คำสั่งเกี่ยวกับการจัดการเซิฟเวอร์ [2]' ,false)
                .setImage('https://cdn.discordapp.com/attachments/831877886680104971/935426473337180200/helppanel.gif')
                .setFooter('K w a n')
                .setTimestamp()

            const aboutbot = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับบอท')
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}help \`**`,`การช่วยเหลือเกี่ยวกับคำสั่งบอท`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}invite \`**`,`เชิญบอทเข้าเซิฟเวอร์`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}uptime \`**`,`เช็คเวลาออนไลน์บอท`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}prefix \`**`,`คำสั่งบอท`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}reloadmod \`**`,`รีโหลด`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}stats \`**`,`สถานะบอท`,true)
                .setFooter('K w a n')
                .setTimestamp()

            const discord_activity = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับเกม')
                .addField(`${setting.emoji.rocket}  |  **YouTube Together**`,`\` ${prefix}youtubetogether \` \n\` ${prefix}ytt \``,true)
                .addField(`${setting.emoji.rocket}  |  **Betrayal.io**`,`\` ${prefix}betrayal \` \n\` ${prefix}bt \``,true)
                .addField(`${setting.emoji.rocket}  |  **Poker Night**`,`\` ${prefix}pokernight \` \n\` ${prefix}pn \``,true)
                .addField(`${setting.emoji.rocket}  |  **Fishington.io**`,`\` ${prefix}fishington \` \n\` ${prefix}ft \``,true)
                .addField(`${setting.emoji.rocket}  |  **Chess In The Park**`,`\` ${prefix}chessinthepark \` \n\` ${prefix}chess \``,true)
                .addField(`${setting.emoji.rocket}  |  **Chess In The Park Development**`,`\` ${prefix}chessdevelopment \` \n\` ${prefix}chessdev \``,true)
                .addField(`${setting.emoji.rocket}  |  **Watch Together Dev.**`,`\` ${prefix}watchtogetherdev \``,true)
                .addField(`${setting.emoji.rocket}  |  **Doodle Crew**`,`\` ${prefix}doodlecrew \``,true)
                .addField(`${setting.emoji.rocket}  |  **Word Snacks**`,`\` ${prefix}wordsnacks \``,true)
                .addField(`${setting.emoji.rocket}  |  **Letter League**`,`\` ${prefix}letterleague \``,true)
                .addField(`${setting.emoji.rocket}  |  **Spell Cast**`,`\` ${prefix}spellcast \``,true)
                .addField(`${setting.emoji.rocket}  |  **Checkers In The Park**`,`\` ${prefix}checkers \``,true)
                .addField(`${setting.emoji.rocket}  |  **Ocho**`,`\` ${prefix}ocho \``,true)
                .addField(`${setting.emoji.rocket}  |  **Awkword**`,`\` ${prefix}awkword \``,true)
                .addField(`${setting.emoji.rocket}  |  **Sketchy Artist**`,`\` ${prefix}sketchyartist \``,true)
                .addField(`${setting.emoji.rocket}  |  **Sketch Heads**`,`\` ${prefix}sketchheads \``,true)
                .addField(`${setting.emoji.rocket}  |  **Putt Party**`,`\` ${prefix}puttparty \``,true)
                .addField(`${setting.emoji.rocket}  |  **Decoders Dev.**`,`\` ${prefix}decodersdev \``,true)
                .setFooter('K w a n')
                .setTimestamp() 

            const image = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับตัดต่อรูปภาพ')
                .addField(`${setting.emoji.pic}  :  **\` ${prefix}< คำสั่ง > \`**`,`\`\`\` ad | affect | beautiful | blur | bobross | captcha |\n catsay | circle | clyde | confusedstonk | cowsay |\n delete | discordblack | discordblue | distort | facepalm |\n greyscale | hitler | invert | jail | karaba | lgbt |\n lisapresentation | minecraft | mms | notstonk | poutine |\n rip | sepia | stonk | tatoo | thomas | toilet | trash |\n triggered | wasted | wasted2 | whatsapp | wideavatar |\n 3000years | approved | blurple | brazzers | burn |\n challenger | contrast | crush | ddungeon | deepfry |\n dictator | discordhouse | distort | dither565 | emboss |\n facebook | fire | frame | glitch | greyple | instagram |\n lookwhatkarenhave | magik | missionpassed | moustache |\n pixerize | posterize | ps4 | redple | rejected | rip2 |\n scary | sepia | sharpen | sniper | steamcard | subzero |\n symmetry | thanos | tobecontinued | trinityremastered |\n trinitybasic | twitter | unsharpen | wanted2 | wasted2 | \`\`\``,false)
                .setFooter('K w a n')
                .setTimestamp()

            const tools = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับเครื่องมือ')
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}calculate \`**`,`คำนวนเลข`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}avatar \`**`,`ดาวน์โหลดภาพโปรไฟล์`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}avatar2 \`**`,`ดาวน์โหลดภาพโปรไฟล์เเบบเลือกขนาด`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}linkshorten \`**`,`ทำให้ลิ้งสั้นลง`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}emojify \`**`,`เปลี่ยน Text เป็น Emoji`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}qrcode \`**`,`เปลี่ยนลิ้งเป็น QR-CODE`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}spoiler \`**`,`ทำให้เป็นตัวทึบทุกตัว`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}genpassword \`**`,`สุ่มรหัส`,true)
                .setFooter('K w a n')
                .setTimestamp()

            const search = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับการค้นหา')
                .addField(`${setting.emoji.search}  |  **\` ${prefix}anime \`**`,`ค้นหารายระเอียดอนิเมะ`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}whois \`**`,`รายระเอียดผู้ใช้`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}gif \`**`,`ค้นหาภาพ Gif`, true)
                .setFooter('K w a n')
                .setTimestamp()
                //------------------- 2st page ------------------- 
            const music = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับเพลง')
                .addField(`${setting.emoji.music}  |  **\` ${prefix}clearqueue \`**`,`ล้างคิว`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}loop \`**`,`วนซ้ำ`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}lyrics \`**`,`ค้นหาเนื้อเพลง`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}nowplaying \`**`,`เพลงที่เล่นอยู่`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}pause \`**`,`หยุดชั่วคราว`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}resume \`**`,`ดำเนิดเพลงต่อ`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}play \`**`,`เล่น`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}queue \`**`,`เเสดงรายการคิว`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}remove \`**`,`นำออก`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}removedupes \`**`,`เลือกสิ่งที่จะนำออก`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}search \`**`,`ค้นหาก่อนเปิด`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}seek \`**`,`ข้าม`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}shuffle \`**`,`สลับ`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}skip \`**`,`ข้ามเพลงปัจจุบัน`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}stop \`**`,`หยุด`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}volume \`**`,`ความดังเสียง`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}connect \`**`,`เชื่อมต่อช่องเสียง`, true)
                .addField(`${setting.emoji.music}  |  **\` ${prefix}musicstats \`**`,`สถานะเซิฟเวอร์เพลง`, true)
                .setFooter('K w a n')
                .setTimestamp()

            const fun = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับรูปภาพเเละภาพGif')
                .addField(`Meme  :`,`\`\`\`  meme  \`\`\``,true)
                .addField(`Image & Gif  :`,`\`\`\` baka | cuddle | cuteavatar | cuteholo | feed |\n foxgirl | gecg | goose | gug | kemonomimi |\n kiss | lizard | neko | nekogif | pat | poke |\n slap | smug | tickle | waifu | waifuwallpaper |\n woof | \`\`\``,true)
                .setFooter('K w a n')
                .setTimestamp()

            const nsfw = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับ NSFW [ใช้ได้ในเฉพาะห้อง NSFW เท่านั้น]')
                .addField(`2D Hentai Image & Gif  :  **\` ${prefix}< คำสั่ง > \`**`,`\`\`\` blowjob | boob | cumart | ero | erokitsune | eroyuri |\n femdom | futanari | gasm | girlsolo | hentai | hkisune |\n holo | holoero | kemonomimi | keta | kitsune | lesbian |\n lewneko | neko | nekogif | pussy | pussyart | tits |\n yuri | anal | havatar | bj | classic | cumsluts |\n erofeet | erokemonomimi | eroneko | feet | kemonomimi2 |\n kuni | pussywankgif | r34 | randomhentai | spank | trap \`\`\``,false)
                .addField(`2D Hentai Role-Play  :  **\` ${prefix}< คำสั่ง > \`**`,`\`\`\` rpcum | rpanal | rpfeet | rpfuck | rpkuni |\n rpmasturbation | rpspank | rpsuck \`\`\``,false)
                .addField(`Doujin  :  **\` ${prefix}< คำสั่ง > \`**`,`\`\`\` drandom | dpopular | dsearch | dsearch2 \`\`\``,false)
                .addField(`Real Porn  :  **\` ${prefix}< คำสั่ง > \`**`,`\`\`\` real4k | realanal | realalass | realboobs | realporn |\n realpussy \`\`\``,false)
                .addField(`phchoose  :  **\` ${prefix}phchoose < คำสั่ง >  < ประเภทไฟล์ > \`**`,`\`\`\` ประเภทไฟล์ : jpeg / jpg / png / gif / mp4 \n\n หมวดหมู่ : 3d-porn | aesthetic | amateur | anal | asian |\n asmr | ass | bath-shower | bdsm | boobs | cock | cosplay |\n creampie | cuckhold | cumshots | dilf | double-penetration |\n ebony | feet | femdom | fisting | food-play | funny |\n furry | glory-hole | goth | hands | hentai-no-loli |\n hentai | horror | interracial | joi | lactation | latin |\n lgbt-bisexual | lgbt-femboy | lgbt-gay | lgbt-lesbian |\n lgbt-transgender | lgbt-twink | lingerie | massage |\n mature | milf | naked-wrestling | oral | orgy | pegging |\n petite | plus-size | pornstar | pov | public | pussy |\n rimming | rough | solo | squirting | tattoos-piercings |\n tease | thighs | threesomes | toys | uniform | vintage |\n watersports \`\`\``,false)
                .setFooter('K w a n')
                .setTimestamp()
 
            const moderation1 = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับการจัดการเซิฟเวอร์ [1]')
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}ban \`**`,`เเบน`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}channelinfo \`**`,`รายระเอียดช่อง`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}createchat \`**`,`สร้างช่องเเชท`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}createvc \`**`,`สร้างช่องเสียง`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}delchannel \`**`,`ลบช่องเเชท`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}delrole \`**`,`ลบยศ`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}disablemodlog \`**`,`ปิดการใช้งานช่องบันทึก`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}disablemuterole \`**`,`ปิดการใช้งานยศ Mute`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${PREFIX}lock \`**`,`ล็อคช่อง`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${PREFIX}kick \`**`,`เตะ`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${PREFIX}mute \`**`,`มิวท์`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${PREFIX}clean \`**`,`ลบข้อความในเเชท`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${PREFIX}role \`**`,`จัดการยศของผู้ใช้`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${PREFIX}roleadd \`**`,`เพิ่มยศ`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${PREFIX}rolecreate \`**`,`สร้างยศ`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${PREFIX}roledel \`**`,`นำยศออก`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${PREFIX}rolememberinfo \`**`,`เเสดงรายชื่อตามยศ`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${PREFIX}setmodlog \`**`,`ตั้งค่าห้องการเเจ้งเตือน`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${PREFIX}setmuterole \`**`,`ตั้งค่ายศสำหรับ Mute`,true)
                .setFooter('K w a n')
                .setTimestamp()

            const moderation2 = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับการจัดการเซิฟเวอร์ [2]')
                .setFooter('K w a n')
                .setTimestamp()

            //  <= If want more add here

            //------------------- help buttons-------------------

            let button1 = new MessageButton()
                .setLabel(`1️⃣`)
                .setID(`button1`)
                .setStyle(`SUCCESS`)

            let button2 = new MessageButton()
                .setLabel(`2️⃣`)
                .setID(`button2`)
                .setStyle(`SUCCESS`)

            let button3 = new MessageButton()
                .setLabel(`3️⃣`)
                .setID(`button3`)
                .setStyle(`SUCCESS`)
            
            let button4 = new MessageButton()
                .setLabel(`4️⃣`)
                .setID(`button4`)
                .setStyle(`SUCCESS`)

            let button5 = new MessageButton()
                .setLabel(`5️⃣`)
                .setID(`button5`)
                .setStyle(`SUCCESS`)
           

            //  <= If want more add here

            let rowhelp = new MessageActionRow()
                .addComponents( button1, button2, button3, button4, button5)       //  <= If want more add here


            const MESSAGE = await message.channel.send(help,rowhelp)

            const filter = ( button ) => button.clicker.id === message.author.id

            const collector = MESSAGE.createButtonCollector(filter, { time : 120000 });

            collector.on('collect', async (b)  => {
                if(b.id == 'button1'){
                     //------------------- 1st page buttons-------------------
                    let baboutbot = new MessageButton()
                        .setLabel(`คำสั่งเกี่ยวกับบอท`)
                        .setID(`aboutbot`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`⛄`) //snow man
                    let bgames = new MessageButton()
                        .setLabel(`คำสั่งเกม`)
                        .setID(`game`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`🚀`)
                    let bimage = new MessageButton()
                        .setLabel(`คำสั่งตัดต่อรูปภาพ`)
                        .setID(`image`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`🖼`) //:frame_photo:
                    let btools = new MessageButton()
                        .setLabel(`คำสั่งเครื่องมือ`)
                        .setID(`tool`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`🛠`) //:tools:
                    let bsearch = new MessageButton()
                        .setLabel(`คำสั่งค้นหา`)
                        .setID(`search`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`🔍`)
                    let row1 = new MessageActionRow()
                        .addComponents( baboutbot, bgames, bimage, btools, bsearch)
                    const MESSAGE1 = await message.channel.send(aboutbot,row1)
                    const collector1 = MESSAGE1.createButtonCollector(filter, { time : 45000 });
                    collector1.on('collect', async (b) => {
                        if(b.id == 'aboutbot'){
                            MESSAGE1.edit(aboutbot,row1)
                        }
                        if(b.id == 'game'){
                            MESSAGE1.edit(discord_activity,row1)
                        }
                        if(b.id == 'image'){
                            MESSAGE1.edit(image,row1)
                        }
                        if(b.id == 'tool'){
                            MESSAGE1.edit(tools,row1)
                        }
                        if(b.id == 'search'){
                            MESSAGE1.edit(search,row1)
                        }
                        await b.reply.defer()
                    })
                    collector1.on('end', (b) => {
                        MESSAGE1.delete()
                    })
                }
                if(b.id == 'button2'){
                    //------------------- 2st page buttons-------------------
                    let bmusic = new MessageButton()
                        .setLabel(`คำสั่งเพลง`)
                        .setID(`music`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`🎶`)
                    let bfun = new MessageButton()
                        .setLabel(`คำสั่งมีมเเละภาพ Gif`)
                        .setID(`fun`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`🎉`)
                    let bnsfw = new MessageButton()
                        .setLabel(`คำสั่ง NSFW`)
                        .setID(`nsfw`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`🚫`)
                    let bmod1 = new MessageButton()
                        .setLabel(`คำสั่งการจัดการเซิฟเวอร์ [1]`)
                        .setID(`mod1`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`🦺`) //:safety_vest:
                    let bmod2 = new MessageButton()
                        .setLabel(`คำสั่งการจัดการเซิฟเวอร์ [2]`)
                        .setID(`mod2`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`🦺`) //:safety_vest:
                    let row2 = new MessageActionRow()
                        .addComponents(bmusic,bfun,bnsfw,bmod1,bmod2)
                    const MESSAGE2 = await message.channel.send(music,row2)
                    const collector2 = MESSAGE2.createButtonCollector(filter, { time : 45000 });
                    collector2.on('collect', async (b) => {
                        if(b.id == 'music'){
                            MESSAGE2.edit(music,row2)
                        }
                        if(b.id == 'fun'){
                            MESSAGE2.edit(fun,row2)
                        }
                        if(b.id == 'nsfw'){
                            MESSAGE2.edit(nsfw,row2)
                        }
                        if(b.id == 'mod1'){
                            MESSAGE2.edit(moderation1,row2)
                        }
                        if(b.id == 'mod2'){
                            MESSAGE2.edit(moderation2,row2)
                        }
                        await b.reply.defer()
                    })
                    collector2.on('end', (b) => {
                        MESSAGE2.delete()
                    })
                }
                if(b.id == 'button3'){
                    //------------------- 3st page buttons-------------------
                    message.channel.send('ยังไม่มีคำสั่งเพิมมามากกว่านี้น่ะคะ'); 
                }
                if(b.id == 'button4'){
                    //------------------- 4st page buttons-------------------
                    message.channel.send('ยังไม่มีคำสั่งเพิมมามากกว่านี้น่ะคะ');  
                }
                if(b.id == 'button5'){
                    //------------------- 5st page buttons-------------------
                    message.channel.send('ยังไม่มีคำสั่งเพิมมามากกว่านี้น่ะคะ');
                }
                await b.reply.defer()
                //  <= If want more add here
            })

            collector.on('end', (b) => {
                MESSAGE.edit(`เอ๊ะ!! ดูเหมือนว่าคำสั่งนี้จะหมดเวลาการใช้งานเเล้วน่ะคะ หากต้องการใช้คำสั่งนี้ต่อโปรดพิมพ์ \` ${prefix}help \` อีกครั้งน่ะคะ`).then(msg =>{
                    msg.delete({ timeout : 15000 })
                })
            })
        }
    }
}
