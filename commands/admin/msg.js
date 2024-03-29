const Discord = require("discord.js")

module.exports = {
    name: "msg", // Coloque o nome do comando do arquivo
    aliases: ["pv"], // Coloque sinônimos aqui

    run: async(client, message, args) => {
        
        const logs = client.channels.cache.get('977970251801194536')
        
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Você não possui permissão para utilizar este comando.`);
        } else {
            let user = message.mentions.users.first() || client.users.cache.get(args[0]);
            let dm_msg = args.slice(1).join(" ");
            if (!user || !args[1]) {
                message.reply({ embeds: [
                    new Discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription(`\`!msg [usuário] [mensagem]\``)
                ] })
            } else {
                    message.reply({ content: `A mensagem foi enviada com sucesso para \`${user.tag}\`.`, embeds: [
                        new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle(`Mensagem:`)
                        .setDescription(`\n${dm_msg}\n`)
                    ] }).then(m => {
                        user.send(dm_msg).catch(e => {m.edit({ content: `\\❌ Ops! A dm do usuário \`${user.tag}\` está bloqueada!`,} `${dm_msg}`)})
                    })
                    logs.send(`${message.author} Utilizou o comando !msg e enviou uma mensagem para <@${user.id}>`)
                }
            }  
        
    }
}