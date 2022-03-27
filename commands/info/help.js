const Discord = require('discord.js');
const disbut = require("discord-buttons");
const { MessageMenuOption, MessageMenu } = require("discord-buttons");
const db = require("quick.db")
const { MessageButton } = require("discord-buttons")
const { MessageActionRow } = require("discord-buttons")
const { PREFIX } = require("../../config")
const setting = require('../../data/setting.js');
const Enbed_Color = '#92eb34';

module.exports = {
    config: {
        name: "help",
        description: "Help Menu",
        usage: "1) m/help \n2) m/help [module name]\n3) m/help [command (name or alias)]",
        example: "1) m/help\n2) m/help utility\n3) m/help ban",
        aliases: ['h']
    },
    run: async (bot, message, args) => {
        let prefix;
        if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX 
            } 
            else {
                prefix = fetched
            }
        } 
        catch (e) {
            console.log(e)
        };

        let randombanner = Math.floor(Math.random() * setting.mainbot.embed.helpbanner.length);

        if(!args[0]) {
            //-------------------embed-------------------
            const help = await new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('📋・หน้าต่างช่วยเหลือ')
                .addField(`:green_circle: เชิญบอท :`,`╰ [เชิญบอท](https://discord.com/api/oauth2/authorize?client_id=${setting.mainbot.ClientID}&permissions=${setting.mainbot.Permission}&scope=bot%20applications.commands)`, false)
                .addField(`:large_blue_diamond: Support Server :`,`╰ [เข้าร่วมเซิฟเวอร์](${setting.information.supportServer})`, true)
                .addField(`:large_orange_diamond: เว็บไซต์ :`,`╰ [เข้าหน้าเว็บ](${setting.information.website})`, true)
                .setImage(setting.mainbot.embed.helpbanner[parseInt(randombanner)])
                .setFooter('K w a n')
                .setTimestamp()

            const aboutbot = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับบอท')
                .setThumbnail( bot.user.avatarURL())
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}help \`**`,`การช่วยเหลือเกี่ยวกับคำสั่งบอท`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}invite \`**`,`เชิญบอทเข้าเซิฟเวอร์`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}uptime \`**`,`เช็คเวลาออนไลน์บอท`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}reloadmod \`**`,`รีโหลด`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}botstats \`**`,`สถานะบอท`,true)
                .addField(`${setting.emoji.bot}  |  **\` ${prefix}source \`**`,`ลิ้ง Github โค้ดบอท`,true)
                .setFooter('K w a n')
                .setTimestamp()

            const discord_activity = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับเกม')
                //.setThumbnail(setting.mainbot.helpthumbnail.game)
                .addField(`${setting.emoji.rocket}  |  **YouTube Together**`,`\` ${prefix}ytt \``,true)
                .addField(`${setting.emoji.rocket}  |  **Betrayal.io**`,`\` ${prefix}betrayal \``,true)
                .addField(`${setting.emoji.rocket}  |  **Poker Night**`,`\` ${prefix}pokernight \``,true)
                .addField(`${setting.emoji.rocket}  |  **Fishington.io**`,`\` ${prefix}fishington \``,true)
                .addField(`${setting.emoji.rocket}  |  **Chess In The Park**`,`\` ${prefix}chess \``,true)
                .addField(`${setting.emoji.rocket}  |  **Chess In The Park Development**`,`\` ${prefix}chessdev \``,true)
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
                //.setThumbnail(setting.mainbot.helpthumbnail.imagegen)
                .addField(`${setting.emoji.pic}  :  **\` ${prefix}< คำสั่ง > \`**`,`\`\`\` ad | affect | beautiful | blur | bobross | captcha |\n catsay | circle | clyde | confusedstonk | cowsay |\n delete | discordblack | discordblue | distort | facepalm |\n greyscale | hitler | invert | jail | karaba | lgbt |\n lisapresentation | minecraft | mms | notstonk | poutine |\n rip | sepia | stonk | tatoo | thomas | toilet | trash |\n triggered | wasted | wasted2 | whatsapp | wideavatar |\n 3000years | approved | blurple | brazzers | burn |\n challenger | contrast | crush | ddungeon | deepfry |\n dictator | discordhouse | distort | dither565 | emboss |\n facebook | fire | frame | glitch | greyple | instagram |\n lookwhatkarenhave | magik | missionpassed | moustache |\n pixerize | posterize | ps4 | redple | rejected | rip2 |\n scary | sepia | sharpen | sniper | steamcard | subzero |\n symmetry | thanos | tobecontinued | trinityremastered |\n trinitybasic | twitter | unsharpen | wanted2 | wasted2 | \`\`\``,false)
                .setFooter('K w a n')
                .setTimestamp()

            const tools = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับเครื่องมือ')
                //.setThumbnail(setting.mainbot.helpthumbnail.tool)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}calculate \`**`,`คำนวนเลข`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}avatar \`**`,`ดาวน์โหลดภาพโปรไฟล์`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}avatar2 \`**`,`ดาวน์โหลดภาพโปรไฟล์เเบบเลือกขนาด`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}linkshorten \`**`,`ทำให้ลิ้งสั้นลง`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}emojify \`**`,`เปลี่ยน Text เป็น Emoji`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}qrcode \`**`,`เปลี่ยนลิ้งเป็น QR-CODE`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}spoiler \`**`,`ทำให้เป็นตัวทึบทุกตัว`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}genpassword \`**`,`สุ่มรหัส`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}ascii \`**`,`เปลี่ยนข้อความเป็น Ascii`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}binary \`**`,`เลขฐานสอง`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}coinflip \`**`,`โยนเหรียญ`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}decode \`**`,`เเปลงจากเลขฐานสอง`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}embed \`**`,`สร้าง Embed`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}enlarge \`**`,`ขยายอีโมจิ`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}fliptext \`**`,`ตัวหนังสือกลับหัว`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}randomnumber \`**`,`สุ่มตัวเลข`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}zalgo \`**`,`เเปลงเป็นตัวหนังสือเเปลกๆ`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}ytdownload \`**`,`ดาวน์โหลดวีดีโอจาก Youtube`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}channel-id \`**`,`หา ID ห้อง`,true)
                .addField(`${setting.emoji.tool}  |  **\` ${prefix}say \`**`,`พูดในห้องเสียง`,true)
                .setFooter('K w a n')
                .setTimestamp()

            const search = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับการค้นหา')
                //.setThumbnail(setting.mainbot.helpthumbnail.search)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}anime \`**`,`ค้นหารายระเอียดอนิเมะ`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}whois \`**`,`รายระเอียดผู้ใช้`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}gif \`**`,`ค้นหาภาพ Gif`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}npmsearch \`**`,`ค้นหาใน NPM`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}ytsearch \`**`,`ค้นหาวีดีโอใน Youtube`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}github \`**`,`ค้นหาผู้ใช้ Github`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}imdb \`**`,`ค้นหาคะเเนนหนัง`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}weather \`**`,`สภาพอากาศ`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}wiki \`**`,`ค้นหาใน Wiki`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}playstore \`**`,`ค้นหาเเอปใน PlayStore`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}appstore \`**`,`ค้นหาเเอปใน AppStore`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}covid \`**`,`สถานะการ Covid-19`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}translate \`**`,`เเปลภาษาเป็นภาษาไทย`, true)
                .addField(`${setting.emoji.search}  |  **\` ${prefix}imagesearch \`**`,`ค้นหาภาพใน Google`, true)
                .setFooter('K w a n')
                .setTimestamp()
                //------------------- 2st page ------------------- 
            const music = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับเพลง')
                //.setThumbnail(setting.mainbot.helpthumbnail.music)
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

            const music_filter = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับฟิลเตอร์เพลง')
                //.setThumbnail(setting.mainbot.helpthumbnail.filter)
                .addField(`${setting.emoji.music_filter}  |  **\` ${prefix}undefined \`**`,`undefined`, true)
                .setFooter('K w a n')
                .setTimestamp()

            const fun = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับรูปภาพเเละภาพGif')
                //.setThumbnail(setting.mainbot.helpthumbnail.meme)
                .addField(`Meme  :`,`\`\`\`  meme  \`\`\``,true)
                .addField(`Image & Gif  :`,`\`\`\` baka | cuddle | cuteavatar | cuteholo | feed |\n foxgirl | gecg | goose | gug | kemonomimi |\n kiss | lizard | neko | nekogif | pat | poke |\n slap | smug | tickle | waifu | waifuwallpaper |\n woof | \`\`\``,true)
                .setFooter('K w a n')
                .setTimestamp()

            const nsfw = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับ NSFW [ใช้ได้ในเฉพาะห้อง NSFW เท่านั้น]')
                //.setThumbnail(setting.mainbot.helpthumbnail.nsfw)
                .addField(`2D Hentai Image & Gif  :  **\` ${prefix}< คำสั่ง > \`**`,`\`\`\` blowjob | boobs | cumart | ero | erokitsune | eroyuri |\n femdom | futanari | gasm | girlsolo | hentai | hkisune |\n holo | holoero | kemonomimi | keta | kitsune | lesbian |\n lewneko | hneko | nekogif | pussy | pussyart | tits |\n yuri | anal | havatar | bj | classic | cumsluts |\n erofeet | erokemonomimi | eroneko | feet | kemonomimi2 |\n kuni | pussywankgif | r34 | randomhentai | spank | trap \`\`\``,false)
                .addField(`2D Hentai Role-Play  :  **\` ${prefix}< คำสั่ง > \`**`,`\`\`\` rpcum | rpanal | rpfeet | rpfuck | rpkuni |\n rpmasturbation | rpspank | rpsuck \`\`\``,false)
                .addField(`Doujin  :  **\` ${prefix}< คำสั่ง > \`**`,`\`\`\` drandom | dpopular | dsearch | dsearch2 \`\`\``,false)
                .addField(`Real Porn  :  **\` ${prefix}< คำสั่ง > \`**`,`\`\`\` real4k | realanal | realalass | realboobs | realporn |\n realpussy \`\`\``,false)
                .addField(`Porn selection :  **\` ${prefix}porn < คำสั่ง >  < ประเภทไฟล์ > \`**`,`\`\`\` ประเภทไฟล์ : jpeg / jpg / png / gif / mp4 \n\n หมวดหมู่ : 3d-porn | aesthetic | amateur | anal | asian |\n asmr | ass | bath-shower | bdsm | boobs | cock | cosplay |\n creampie | cuckhold | cumshots | dilf | double-penetration |\n ebony | feet | femdom | fisting | food-play | funny |\n furry | glory-hole | goth | hands | hentai-no-loli |\n hentai | horror | interracial | joi | lactation | latin |\n lgbt-bisexual | lgbt-femboy | lgbt-gay | lgbt-lesbian |\n lgbt-transgender | lgbt-twink | lingerie | massage |\n mature | milf | naked-wrestling | oral | orgy | pegging |\n petite | plus-size | pornstar | pov | public | pussy |\n rimming | rough | solo | squirting | tattoos-piercings |\n tease | thighs | threesomes | toys | uniform | vintage |\n watersports \`\`\``,false)
                .setFooter('K w a n')
                .setTimestamp()

            const moderation1 = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับการจัดการเซิฟเวอร์ [1]')
                //.setThumbnail(setting.mainbot.helpthumbnail.moderation)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}ban \`**`,`เเบน`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}channelinfo \`**`,`รายระเอียดช่อง`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}createchat \`**`,`สร้างช่องเเชท`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}createvc \`**`,`สร้างช่องเสียง`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}delchannel \`**`,`ลบช่องเเชท`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}delrole \`**`,`ลบยศ`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}lock \`**`,`ล็อคช่อง`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}kick \`**`,`เตะ`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}mute \`**`,`มิวท์`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}clean \`**`,`ลบข้อความในเเชท`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}role \`**`,`จัดการยศของผู้ใช้`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}roleadd \`**`,`เพิ่มยศ`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}warn \`**`,`เตือน`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}cc-create \`**`,`สร้างคำสั่ง`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}cc-delete \`**`,`ลบคำสั่งที่สร้าง`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}cc-list \`**`,`ดูรายการคำสั่งที่สร้าง`,true)
                .setFooter('K w a n')
                .setTimestamp()

            const moderation2 = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับการจัดการเซิฟเวอร์ [2]')
                //.setThumbnail(setting.mainbot.helpthumbnail.moderation)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}rolecreate \`**`,`สร้างยศ`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}roledel \`**`,`นำยศออก`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}rolememberinfo \`**`,`เเสดงรายชื่อตามยศ`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}setnick \`**`,`ตั้งค่าชื่อผู้ใช้`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}singlevoicemove \`**`,`ย้ายผู้ใช้ไปช่องอื่น`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}slowmode \`**`,`ตั้งเวลาในการส่งข้อความ`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}unban \`**`,`ปลดเเบน`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}unbanall \`**`,`ปลดเเบนทั้งหมด`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}undeafen \`**`,`ปลดรับรู้ผู้ใช้ในห้องเสียง`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}unlock \`**`,`ปลดล็อกห้อง`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}unmute \`**`,`ปลด Mute`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}voicekick \`**`,`เตะผู้ใช้ออกจากห้องเสียง`,true)
                .addField(`${setting.emoji.mod}  |  **\` ${prefix}voicemove \`**`,`ย้ายทั้งหมด`,true)
                .setFooter('K w a n')
                .setTimestamp()

            const setup = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับการตั้งค่า')
                //.setThumbnail(setting.mainbot.helpthumbnail.setting)
                .addField(`${setting.emoji.setup}  |  **\` ${prefix}setmodlog \`**`,`ตั้งค่าห้องการเเจ้งเตือน`,true)
                .addField(`${setting.emoji.setup}  |  **\` ${prefix}setmuterole \`**`,`ตั้งค่ายศสำหรับ Mute`,true)
                .addField(`${setting.emoji.setup}  |  **\` ${prefix}disablemodlog \`**`,`ปิดการใช้งานช่องบันทึก`,true)
                .addField(`${setting.emoji.setup}  |  **\` ${prefix}disablemuterole \`**`,`ปิดการใช้งานยศ Mute`,true)
                .addField(`${setting.emoji.setup}  |  **\` ${prefix}prefix \`**`,`ตั้งค่าคำสั่งบอท`,true)
                .addField(`${setting.emoji.setup}  |  **\` ${prefix}cmd-disable \`**`,`ปิดการใช้งานคำสัั่ง`,true)
                .addField(`${setting.emoji.setup}  |  **\` ${prefix}cmd-enable \`**`,`เปิดการใช้งานคำสัั่ง`,true)
                .addField(`${setting.emoji.setup}  |  **\` ${prefix}chatbot-setup \`**`,`ตั้งค่าระบบคนเหงา`,true)
                .addField(`${setting.emoji.setup}  |  **\` ${prefix}chatbot-delete \`**`,`ปิดใช้งานระบบคนเหงา`,true)
                .addField(`${setting.emoji.setup}  |  **\` ${prefix}cmd-channel \`**`,`ตั้งค่าช่องใช้คำสั่ง`,true)
                .setFooter('K w a n')
                .setTimestamp() 

            const random = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับการสุ่ม')
                //.setThumbnail(setting.mainbot.helpthumbnail.random)
                .addField(`${setting.emoji.random}  |  **\` ${prefix}advice \`**`,`สุ่มคำเเนะนำ`,true)
                .addField(`${setting.emoji.random}  |  **\` ${prefix}fact \`**`,`ความจีงง`,true)
                .setFooter('K w a n')
                .setTimestamp() 

            const autovoice = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับตั้งค่าห้องเสียงอัตโนมัติ')
                .addField(`${setting.emoji.voicechannel}  |  **\` ${prefix}voice-add \`**`,`ตั้งค่าห้องเสียงอัตโนมัติ [1]`,true)
                .addField(`${setting.emoji.voicechannel}  |  **\` ${prefix}voice-add2 \`**`,`ตั้งค่าห้องเสียงอัตโนมัติ [2]`,true)
                .addField(`${setting.emoji.voicechannel}  |  **\` ${prefix}voice-add3 \`**`,`ตั้งค่าห้องเสียงอัตโนมัติ [3]`,true)
                .addField(`${setting.emoji.voicechannel}  |  **\` ${prefix}voice-delete \`**`,`ลบห้องเสียงอัตโนมัติ`,true)
                .setFooter('K w a n')
                .setTimestamp() 
            
            const serverstats = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับตั้งค่าเเสดงสถานะเซิฟเวอร์')
                .addField(`${setting.emoji.stats}  |  **\` ${prefix}ss-setup \`**`,`ตั้งค่าช่องเเสดงสถานะเซิฟเวอร์`,true)
                .addField(`${setting.emoji.stats}  |  **\` ${prefix}ss-delete \`**`,`ลบช่องเเสดงสถานะเซิฟเวอร์`,true)
                .addField(`${setting.emoji.stats}  |  **\` ${prefix}ss-add \`**`,`ตั้งค่าช่องสถานะเพิ่มเติม`,true)
                .setFooter('K w a n')
                .setTimestamp()  
                
            const xp = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับตั้งค่าระบบเลเวล')
                .addField(`${setting.emoji.xp}  |  **\` ${prefix}rank \`**`,`ดูเลเวลของตัวเอง`,true)
                .addField(`${setting.emoji.xp}  |  **\` ${prefix}xp-setchannel \`**`,`ตั้งค่าช่องเเจ้งเตือนเลเวล`,true)
                .addField(`${setting.emoji.xp}  |  **\` ${prefix}xp-setlevel \`**`,`ตั้งค่าเลเวลผู้ใช้`,true)
                .addField(`${setting.emoji.xp}  |  **\` ${prefix}xp-set \`**`,`ตั้งค่าการ์ดเลเวล`,true)
                .addField(`${setting.emoji.xp}  |  **\` ${prefix}xp-setup \`**`,`ตั้งค่าระบบเลเวล`,true)
                .addField(`${setting.emoji.xp}  |  **\` ${prefix}xp-setxp \`**`,`ตั้งค่า XP ผู้ใช้`,true)
                .addField(`${setting.emoji.xp}  |  **\` ${prefix}xp-delete \`**`,`ลบการตั้งค่าระบบเลเวล`,true)
                .addField(`${setting.emoji.xp}  |  **\` ${prefix}xp-removech \`**`,`ลบช่องเเจ้งเตือนเลเวล`,true)
                .setFooter('K w a n')
                .setTimestamp()  

            const captcha = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับตั้งค่าระบบยืนยันตัวตน')
                .addField(`${setting.emoji.shield}  |  **\` ${prefix}captcha-setup \`**`,`เปิดการใช้งานยืนยันตัวตน`,true)
                .addField(`${setting.emoji.shield}  |  **\` ${prefix}captcha-disable \`**`,`ปิดการใช้งานยืนยันตัวตน`,true)
                .addField(`${setting.emoji.shield}  |  **\` ${prefix}captcha-config \`**`,`ตั้งค่าระบบยืนยันตัวตน`,true)
                .setFooter('K w a n')
                .setTimestamp() 
            const welcome = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับตั้งค่าระบบข้อความต้อนรับ')
                .addField(`${setting.emoji.inbox}  |  **\` ${prefix}welcome-setup \`**`,`เปิดใช้งานข้อความต้อนรับ`,true)
                .addField(`${setting.emoji.inbox}  |  **\` ${prefix}welcome-disable \`**`,`ปิดการใช้งานข้อความต้อนรับ`,true)
                .addField(`${setting.emoji.inbox}  |  **\` ${prefix}welcome-config \`**`,`ตั้งค่าระบบข้อความต้อนรับ`,false)
                .setFooter('K w a n')
                .setTimestamp() 

            const goodbye = new Discord.MessageEmbed()
                .setColor(Enbed_Color)
                .setTitle('คำสั่งเกี่ยวกับตั้งค่าระบบข้อความลาสมาชิก')
                .addField(`${setting.emoji.outbox}  |  **\` ${prefix}goodbye-setup \`**`,`เปิดใช้งานข้อความลาสมาชิก`,true)
                .addField(`${setting.emoji.outbox}  |  **\` ${prefix}goodbye-disable \`**`,`ปิดใช้งานข้อความลาสมาชิก`,true)
                .addField(`${setting.emoji.outbox}  |  **\` ${prefix}goodbye-config \`**`,`ตั้งค่าระบบข้อความลาสมาชิก`,false)
                .setFooter('K w a n')
                .setTimestamp() 

            //  <= If want more add here

            //------------------- help buttons-------------------

            let bmain = new MessageMenuOption()
                .setLabel('หน้าหลัก')
                .setEmoji('🏡')
                .setValue('main')
                .setDescription('[สำหรับกลับหน้าหลัก]')
            let baboutbot = new MessageMenuOption()
                .setLabel('บอท')
                .setEmoji('⛄')
                .setValue('aboutbot')
                .setDescription('[สำหรับดูคำสั่งเกี่ยวกับบอท]')
            let bgames = new MessageMenuOption()
                .setLabel('เกม')
                .setEmoji('🚀')
                .setValue('games')
                .setDescription('[สำหรับดูคำสั่งเกี่ยวกับเกม]')
            let bimage = new MessageMenuOption()
                .setLabel('ตัดต่อรูปภาพ')
                .setEmoji('🖼')
                .setValue('image')
                .setDescription('[สำหรับดูคำสั่งเกี่ยวกับตัดต่อรูปภาพ]')
            let btools = new MessageMenuOption()
                .setLabel('เครื่องมือ')
                .setEmoji('🛠')
                .setValue('tools')
                .setDescription('[สำหรับดูคำสั่งเกี่ยวกับเครื่องมือ]')
            let bsearch = new MessageMenuOption()
                .setLabel('การค้นหา')
                .setEmoji('🔍')
                .setValue('search')
                .setDescription('[สำหรับดูคำสั่งเกี่ยวกับการค้นหา]')
            let bmusic = new MessageMenuOption()
                .setLabel('เพลง')
                .setEmoji('🎶')
                .setValue('music')
                .setDescription('[สำหรับดูคำสั่งเกี่ยวกับเพลง]')
            let bmusic_filter = new MessageMenuOption()
                .setLabel('ฟิลเตอร์เพลง')
                .setEmoji('🎛') //:control_knobs:
                .setValue('music_filter')
                .setDescription('[สำหรับดูคำสั่งฟิลเตอร์เพลง]')
            let bfun = new MessageMenuOption()
                .setLabel('รูปภาพเเละGif')
                .setEmoji('🎉')
                .setValue('fun')
                .setDescription('[สำหรับดูคำสั่งเกี่ยวกับรูปภาพเเละGif]')
            let bnsfw = new MessageMenuOption()
                .setLabel(' NSFW ')
                .setEmoji('⛔')
                .setValue('nsfw')
                .setDescription('[ใช้ได้ในเฉพาะห้อง NSFW เท่านั้น]')
            let bmod1 = new MessageMenuOption()
                .setLabel('การจัดการเซิฟเวอร์ [1]')
                .setEmoji('🦺')
                .setValue('mod1')
                .setDescription('[สำหรับดูคำสั่งจัดการเซิฟเวอร์]')
            let bmod2 = new MessageMenuOption()
                .setLabel('การจัดการเซิฟเวอร์ [2]')
                .setEmoji('🦺')
                .setValue('mod2')
                .setDescription('[สำหรับดูคำสั่งจัดการเซิฟเวอร์]')
            let bsetup = new MessageMenuOption()
                .setLabel('ตั้งค่า')
                .setEmoji('⚙')
                .setValue('setup')
                .setDescription('[สำหรับดูคำสั่งตั้งค่า]')
            let brandom = new MessageMenuOption()
                .setLabel('สุ่ม')
                .setEmoji('🎭')
                .setValue('random')
                .setDescription('[สำหรับดูคำสั่งสุ่ม]')
            let bautovoice = new MessageMenuOption()
                .setLabel('ห้องเสียงอัตโนมัติ')
                .setEmoji('🎙') //:microphone2:
                .setValue('autovoice')
                .setDescription('[สำหรับดูคำสั่งตั้งค่าห้องเสียงอัตโนมัติ]')
            let bserverstats = new MessageMenuOption()
                .setLabel('ระบบเเสดงสถานะเซิฟเวอร์')
                .setEmoji('📊') 
                .setValue('serverstats')
                .setDescription('[สำหรับดูคำสั่งตั้งค่าห้องการเเสดงสถานะเซิฟเวอร์]')
            let bxp = new MessageMenuOption()
                .setLabel('ระบบเลเวล')
                .setEmoji('📈') 
                .setValue('xp')
                .setDescription('[สำหรับดูคำสั่งตั้งค่าระบบเลเวล]')
            let bcaptcha = new MessageMenuOption()
                .setLabel('ระบบยืนยันตัวตน')
                .setEmoji('🛡️') 
                .setValue('captcha')
                .setDescription('[สำหรับดูคำสั่งตั้งค่าระบบยืนยันตัวตนสมาชิก]')
            let bwelcome = new MessageMenuOption()
                .setLabel('ระบบข้อความต้อนรับ')
                .setEmoji('📥') 
                .setValue('welcome')
                .setDescription('[สำหรับดูคำสั่งระบบข้อความต้อนรับสมาชิกใหม่]')
            let bgoodbye = new MessageMenuOption()
                .setLabel('ระบบข้อความลาสมาชิก')
                .setEmoji('📤') 
                .setValue('goodbye')
                .setDescription('[สำหรับดูคำสั่งระบบข้อความลาสมาชิกที่ออก]')
            
            let select = new MessageMenu()
                .setID('selector')
                .setPlaceholder('กดเพื่อดูคำสั่งทั้งหมด')
                .setMaxValues(1)
                .setMinValues(1)
                .addOptions(bmain,baboutbot,bgames,bimage,btools,bsearch,bmusic,bmusic_filter,bfun,bnsfw,bmod1,bmod2,bsetup,brandom,bautovoice,bserverstats,bxp,bcaptcha,bwelcome,bgoodbye)

            //-----------------------------OPTIONS----------------------
            //send private massage - message.author.send
            const Sendmenu = await message.channel.send(help, select);
            const filter = ( button ) => button.clicker.id === message.author.id;
            let collector = Sendmenu.createMenuCollector(filter, { time : 180000 });

            collector.on("collect", (b, menu) => {   
                if(b.values[0] == "main") {
                    Sendmenu.edit(help, select, true)
                }
                else if(b.values[0] == "aboutbot") {
                    Sendmenu.edit(aboutbot, select, true)
                }
                else if(b.values[0] == "games") {
                    Sendmenu.edit(discord_activity, select, true)
                }
                else if(b.values[0] == "image") {
                    Sendmenu.edit(image, select, true)
                }
                else if(b.values[0] == "tools") {
                    Sendmenu.edit(tools, select, true)
                }
                else if(b.values[0] == "search") {
                    Sendmenu.edit(search, select, true)
                }
                else if(b.values[0] == "music") {
                    Sendmenu.edit(music, select, true)
                }
                else if(b.values[0] == "fun") {
                    Sendmenu.edit(fun, select, true)
                }
                else if(b.values[0] == "nsfw") {
                    Sendmenu.edit(nsfw, select, true)
                }
                else if(b.values[0] == "mod1") {
                    Sendmenu.edit(moderation1, select, true)
                }
                else if(b.values[0] == "mod2") {
                    Sendmenu.edit(moderation2, select, true)
                }
                else if(b.values[0] == "setup") {
                    Sendmenu.edit(setup, select, true)
                }
                else if(b.values[0] == "random") {
                    Sendmenu.edit(random, select, true)
                }
                else if(b.values[0] == "music_filter") {
                    Sendmenu.edit(music_filter, select, true)
                }
                else if(b.values[0] == "autovoice") {
                    Sendmenu.edit(autovoice, select, true)
                }
                else if(b.values[0] == "serverstats") {
                    Sendmenu.edit(serverstats, select, true)
                }
                else if(b.values[0] == "xp") {
                    Sendmenu.edit(xp, select, true)
                }
                else if(b.values[0] == "captcha") {
                    Sendmenu.edit(captcha, select, true)
                }
                else if(b.values[0] == "welcome") {
                    Sendmenu.edit(welcome, select, true)
                }
                else if(b.values[0] == "goodbye") {
                    Sendmenu.edit(goodbye, select, true)
                }
                b.reply.defer();
            });
            collector.on("end", (b) => {
                Sendmenu.edit(`เอ๊ะ!! ดูเหมือนว่าคำสั่งนี้จะหมดเวลาการใช้งานเเล้วน่ะคะ หากต้องการใช้คำสั่งนี้ต่อโปรดพิมพ์ \` ${prefix}help \` อีกครั้งน่ะคะ`).then(msg => {
                    msg.delete({ timeout : 15000 })
                })
            });
        }

    }
}