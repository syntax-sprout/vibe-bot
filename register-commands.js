require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'meme',
    description: 'Get a random wholesome meme',
  },
  {
    name: 'song',
    description: 'Get a random song recommendation',
  },
  {
    name: 'vibes',
    description: 'Get both a meme and a song',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );
    console.log('✅ Slash commands registered!');
  } catch (error) {
    console.error(error);
  }
})();
