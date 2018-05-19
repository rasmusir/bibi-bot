import * as Discord from "discord.js"
import * as dialogflow from "dialogflow"
import * as fs from "fs"
var discordToken : string
if (fs.existsSync("./token"))
    discordToken = fs.readFileSync("./token").toString("utf-8")
else
    discordToken = process.env.discordToken as string

if (!discordToken) throw new Error("No discord token found.")

console.log("Add me to a server using https://discordapp.com/oauth2/authorize?&client_id=447471222536667136&scope=bot&permissions=0.")

process.env.GOOGLE_APPLICATION_CREDENTIALS = "./apikey.json"

const discordClient = new Discord.Client()

discordClient.on("ready", () => {
    console.log("Connected to discord.")
})

discordClient.login(discordToken)


const dialogflowClient = new dialogflow.SessionsClient();
const sessionPath = dialogflowClient.sessionPath("bibi-a9a78", "test")


discordClient.on("message", async message => {
    let reg = /(bibi\W*)(.*)/giu.exec(message.content)
    if (reg!.length === 3) {
        let dialogflowQueryText = reg![2];
        message.reply(await askDialogflow(dialogflowQueryText, message.member.id))
    }
})

async function askDialogflow(query: string, user: string) {
    let responses = await dialogflowClient.detectIntent({ session: sessionPath, queryInput: { text: { text: query, languageCode: "en-UK"} } })
    if (responses.length >= 1) {
        //responses[0].queryResult.fulfillmentText
        if (responses[0].queryResult.fulfillmentText.length > 0)
            return responses[0].queryResult.fulfillmentText
        
        if (responses[0].queryResult.intent.displayName == "RequestRecipe") {
            return `I will be honest with you. I have no idea how to craft ${responses[0].queryResult.parameters.fields["item"].stringValue}. Bite me.`
        }
        return "I know what you're saying, but I have no idea how to respond!";
    }
}