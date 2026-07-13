const { joinVoiceChannel, VoiceConnectionStatus, entersState } = require('@discordjs/voice');

async function joinVoice(client) {
  const config = client.config;
  if (!config?.voiceChannelId || !config?.guildId) return;

  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) return;

  const channel = guild.channels.cache.get(config.voiceChannelId);
  if (!channel || channel.type !== 2) return;

  try {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: true,
    });

    connection.on(VoiceConnectionStatus.Disconnected, async () => {
      try {
        await Promise.race([
          entersState(connection, VoiceConnectionStatus.Signalling, 5000),
          entersState(connection, VoiceConnectionStatus.Connecting, 5000),
        ]);
      } catch {
        setTimeout(() => joinVoice(client), 5000);
      }
    });

    connection.on('error', () => {
      setTimeout(() => joinVoice(client), 10000);
    });

    console.log(`[Voice] ${channel.name} kanalına bağlandı.`);
  } catch (err) {
    console.error('[Voice] Ses kanalına bağlanılamadı:', err.message);
    setTimeout(() => joinVoice(client), 10000);
  }
}

module.exports = { joinVoice };
