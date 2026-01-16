require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const memes = JSON.parse(fs.readFileSync('./data/memes.json', 'utf-8'));
const songs = JSON.parse(fs.readFileSync('./data/songs.json', 'utf-8'));

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

client.once('ready', () => {
  console.log(`✅ ${client.user.tag} is online!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'meme') {
    const meme = getRandomItem(memes);
    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setImage(meme)
      .setFooter({ text: 'vibe-bot says: enjoy this meme' });
    
    await interaction.reply({ embeds: [embed] });
  }

  if (commandName === 'song') {
    const song = getRandomItem(songs);
    const embed = new EmbedBuilder()
      .setColor('#1DB954')
      .setTitle(`🎵 ${song.title}`)
      .setDescription(`**${song.artist}**\n*${song.vibe}*`)
      .setURL(song.link)
      .setFooter({ text: 'vibe-bot says: here\'s something to listen to' });
    
    await interaction.reply({ embeds: [embed] });
  }

  if (commandName === 'vibes') {
    const meme = getRandomItem(memes);
    const song = getRandomItem(songs);
    
    const memeEmbed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setImage(meme);
    
    const songEmbed = new EmbedBuilder()
      .setColor('#1DB954')
      .setTitle(`🎵 ${song.title}`)
      .setDescription(`**${song.artist}**\n*${song.vibe}*`)
      .setURL(song.link)
      .setFooter({ text: 'vibe-bot says: double dose of good energy' });
    
    await interaction.reply({ embeds: [memeEmbed, songEmbed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
