const {
  ContainerBuilder,
  SectionBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  ThumbnailBuilder,
  MessageFlags,
} = require('discord.js');
const e = require('../emoji.json');

module.exports = {
  name: 'presenceUpdate',
  async execute(oldPresence, newPresence, client) {
    if (!newPresence || !newPresence.guild) return;

    const member = newPresence.member;
    if (!member || member.user.bot) return;

    const { statusRules, logChannelId } = client.config;
    if (!statusRules || !statusRules.length) return;

    const customStatus = newPresence.activities?.find(a => a.type === 4);
    const statusText = customStatus?.state?.toLowerCase() || '';

    for (const rule of statusRules) {
      const keyword = rule.keyword.toLowerCase();
      const role = newPresence.guild.roles.cache.get(rule.roleId);
      if (!role) continue;

      const matches = statusText === keyword;
      const hasRole = member.roles.cache.has(rule.roleId);

      try {
        if (matches && !hasRole) {
          await member.roles.add(role);

          if (logChannelId) {
            const logChannel = newPresence.guild.channels.cache.get(logChannelId);
            if (logChannel) {
              const container = new ContainerBuilder()
                .setAccentColor(0x57F287)
                .addSectionComponents(
                  new SectionBuilder()
                    .addTextDisplayComponents(
                      new TextDisplayBuilder().setContent(
                        `### ${e.wave} Hoşgeldin, <@${member.id}>!\n` +
                        `## Bizi Desteklediğin İçin Teşekkürler!`
                      )
                    )
                    .setThumbnailAccessory(
                      new ThumbnailBuilder().setURL(member.displayAvatarURL({ size: 256 }))
                    )
                )
                .addSeparatorComponents(
                  new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                )
                .addTextDisplayComponents(
                  new TextDisplayBuilder().setContent(
                    `> Durumuna \`${rule.keyword}\` yazdığın için teşekkürler! Artık topluluğumuzu temsil ediyorsun. Bu mesajı taşıdığın sürece <@&${role.id}> rolüne sahip olacaksın.`
                  )
                );
              await logChannel.send({ components: [container], flags: MessageFlags.IsComponentsV2 }).catch(() => {});
            }
          }

        } else if (!matches && hasRole) {
          await member.roles.remove(role);

          if (logChannelId) {
            const logChannel = newPresence.guild.channels.cache.get(logChannelId);
            if (logChannel) {
              const container = new ContainerBuilder()
                .setAccentColor(0xED4245)
                .addSectionComponents(
                  new SectionBuilder()
                    .addTextDisplayComponents(
                      new TextDisplayBuilder().setContent(
                        `### ${e.wave} Görüşürüz, <@${member.id}>!\n` +
                        `## Seni Özleyeceğiz.`
                      )
                    )
                    .setThumbnailAccessory(
                      new ThumbnailBuilder().setURL(member.displayAvatarURL({ size: 256 }))
                    )
                )
                .addSeparatorComponents(
                  new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
                )
                .addTextDisplayComponents(
                  new TextDisplayBuilder().setContent(
                    `> Durumundaki \`${rule.keyword}\` mesajını kaldırdığın için <@&${role.id}> rolün de kaldırıldı. Yeniden topluluğu temsil etmek istersen, mesajı durumuna eklemen yeterli!`
                  )
                )
              await logChannel.send({ components: [container], flags: MessageFlags.IsComponentsV2 }).catch(() => {});
            }
          }
        }
      } catch (err) {
        console.error(`[DurumRol] Rol işlemi hatası (${member.id} - ${rule.roleId}):`, err.message);
      }
    }
  },
};
