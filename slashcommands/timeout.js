const durations = [
    {name: "60 seconds", value: 60 * 1000},
    {name: "5 minutes", value: 5 * 60 * 1000},
    {name: "10 minutes", value: 10 * 60 * 1000},
    {name: "30 minutes", value: 30 * 60 * 1000},
    {name: "1 hour", value: 60 * 60 * 1000},
    {name: "1 day", value: 24 * 60 * 60 * 1000},
    {name: "1 week", value: 7 * 24 * 60 * 60 * 1000},
]

const run = async (client, interaction) => {
    let member = interaction.options.getMember ("user")
    let reason = interaction.options.getString ("reason") || "no reason given"
    
    if (!member) return interaction.reply ("invalid member")

    try {
        await member.timeout(duration, reason)
        return interaction.reply(`${member.user.tag} has been timed out for ${durations.find(d=> duration === d.value)?.name} with a reason of ${reason}`)
    }
    catch(err){
        if (err){
            console.error(err)
            return interaction.reply(`failed to timeout ${member.user.tag}`)
        }
    }
}

module.exports = {
    name: "timeout",
    description: "timeout a member",
    perm: "MODERATE_MEMBERS",
    options: [
        {
            name: "user", description: "the user to timeout",
            type: "USER", required: true
        },
        {
            name: "duration",
            description: "the duration of the timeout",
            type:"NUMBER",
            choices: durations,
            require: true
        },
        {
            name: "reason",
            description: "reason for punishment",
            type: "STRING",
            required: false
        }
    ],run
}