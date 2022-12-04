const {Client, GatewayIntentBits } = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")

const Discord = require("discord.js")

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "test"){
        message.reply("Test Succsesful")
    }
} )

const welcomeChanneleId = "1048476413478588496"

client.on("guildMemberAdd",  async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChanneleId).send({
        conetnt:`<@${member.id}> Welcome to the Server!`,
        files: [img]
    })
    .catch(console.error);

})
client.login(process.env.TOKEN)