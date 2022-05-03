const Discord = require('discord.js');

require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

let bot = {
    client
}



client.on("ready", () => {
    console.log("lux is online!")
    
})

client.slashcommands = new Discord.Collection()

client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadSlashCommands(bot, false)

client.on("interactionCreate", (interaction) =>{
    if (!interaction.isCommand()) return
    if (!interaction.inGuild()) return interaction.reply("this command can only be used in a server")

    const slashcmd = client.slashcommands.get(interaction.commandName)

    if(!slashcmd) return interaction.reply("invalid slash command")

    if (slashcmd.perms && !interaction.member.persmissions.has(slashcmd.perm))
        return interaction.reply("you do not have persmission for this command.")

    slashcmd.run(client, interaction)
})

client.login(process.env.token)
