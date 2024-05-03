import { GatewayIntentBits, Client, Message } from "discord.js";
import dotenv from "dotenv";
import cron from "node-cron";

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
  const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  if (!channel || !("send" in channel)) return;

  cron.schedule("0 0 * * * *", () => {
    channel.send(`${new Date()} now.`);
  });
});

client.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.channel.send("pong.");
  }
  if (message.content === "!time") {
    message.channel.send(new Date().toLocaleString());
  }
});

client.login(process.env.TOKEN);
