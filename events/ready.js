const { joinVoice } = require('../utils/voice');
const { setPresence } = require('../utils/presence');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    setPresence(client, client.config?.presence);
    console.log(`[DurumRol] ${client.user.tag} çevrimiçi.`);
    await joinVoice(client);
  },
};
