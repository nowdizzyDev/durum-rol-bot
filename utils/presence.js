const { ActivityType } = require('discord.js');

const TYPE_MAP = {
  Playing: ActivityType.Playing,
  Watching: ActivityType.Watching,
  Listening: ActivityType.Listening,
  Competing: ActivityType.Competing,
  Streaming: ActivityType.Streaming,
};

function setPresence(client, presenceCfg) {
  if (!presenceCfg) return;
  client.user.setPresence({
    activities: [{
      name: presenceCfg.text || 'Discord',
      type: TYPE_MAP[presenceCfg.type] ?? ActivityType.Playing,
    }],
    status: presenceCfg.status || 'online',
  });
}

module.exports = { setPresence };
