const fetch = require("node-fetch");
const util = require("../util");

const getLyrics = async (query) => {
    const body = await (await fetch(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(query)}`)).json();
    if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "lyrics",
    aliases: ["ly"],
    exec: async (msg, args) => {
        let query;
        if (args.length) {
            query = args.join(" ");
        } else if (msg.guild.music.current) {
            const separatedArtistAndTitle = /(.+) - (.+)/.test(msg.guild.music.current.info.title);
            query = `${separatedArtistAndTitle ? msg.guild.music.current.info.title : msg.guild.music.current.info.author.replace(" - Topic", "")} - ${msg.guild.music.current.info.title}`;
        } else {
            return msg.channel.send(util.embed().setDescription("❌ | เอ๊ะ! เหมือนมีอะไรหายไปน่ะลองดูดีๆก่อนสิ"));
        }

        try {
            const res = await getLyrics(query);
            const splittedLyrics = util.chunk(res.lyrics, 1024);

            const embed = util.embed()
                .setAuthor(res.author)
                .setTitle(res.title)
                .setURL(res.links.genius)
                .setThumbnail(res.thumbnail.genius)
                .setDescription(splittedLyrics[0])
                .setFooter(`หน้าที่ 1 จาก ${splittedLyrics.length}.`);

            const lyricsMsg = await msg.channel.send(embed);
            if (splittedLyrics.length > 1) await util.pagination(lyricsMsg, msg.author, splittedLyrics);
        } catch (e) {
            if (e.message === "อืมม ดูเหมือนจะไม่พบเนื้อเพลงที่คุณค้นหาน่ะคะ") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`มีปัญหารหัส : ${e.message}.`);   
        }
    }
};
