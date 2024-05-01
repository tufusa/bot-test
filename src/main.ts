import { GatewayIntentBits, Client, Message } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("Ready.");
  console.log(client.user?.tag);
});

client.on("messageCreate", async (message: Message) => {
  console.log({ message });
  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.channel.send("pong.");
  }
});

client.login(process.env.TOKEN);
