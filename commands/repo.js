const { zokou } = require(__dirname + "/../framework/zokou");  
const axios = require("axios");  

zokou({ nomCom: "repo", categorie: "General" }, async (dest, zk, commandeOptions) => {  
    let { ms, repondre } = commandeOptions;  

    const repoUrl = "https://api.github.com/repos/kephakings/BWC-XMD";  
    const imageUrl = "https://files.catbox.moe/6am24p.jpg";  

    try {  
        const response = await axios.get(repoUrl);  
        const repo = response.data;  

        let repoInfo = `  
╭══════════════⊷❍  
┃ 🔥 *BWC-XMD REPOSITORY* 🔥  
┃ ❏ 𝗡𝗮𝗺𝗲: *${repo.name}*  
┃ ❏ 𝗢𝘄𝗻𝗲𝗿: *${repo.owner.login}*  
┃ ❏ 𝗦𝘁𝗮𝗿𝘀: ⭐ *1527*  
┃ ❏ 𝗙𝗼𝗿𝗸𝘀: 🍴 *798*  
┃ ❏ 𝗟𝗮𝗻𝗴𝘂𝗮𝗴𝗲: 🖥️ *${repo.language}* 
┃ ❏ 𝗨𝗽𝗱𝗮𝘁𝗲𝗱 𝗼𝗻: 📅 *${new Date(repo.updated_at).toLocaleString()}*  
╭══════════════⊷❍  
 ❏ 𝗥𝗲𝗽𝗼 𝗟𝗶𝗻𝗸: 🔗 ${repo.html_url}
╰══════════════⊷❍  

> KINGSTECH 
        `;  

        await zk.sendMessage(dest, {  
            image: { url: imageUrl },  
            caption: repoInfo,  
            footer: "*BWC-XMD GitHub Repository*",  
            contextInfo: {  
                forwardingScore: 999,  
                isForwarded: true,  
            },  
        }, { quoted: ms });  

    } catch (e) {  
        console.log("🥵 Error fetching repository data: " + e);  
        repondre("🥵 Error fetching repository data, please try again later.");  
    }  
});
