# Durum Rol Bot

Discord üyelerinin özel durum mesajlarını izleyerek otomatik rol veren/kaldıran bir bot. Tüm ayarlar `config.json` üzerinden yapılır, komut gerekmez.

## Kurulum

1. Bağımlılıkları yükle:
   ```bash
   npm install
   ```

2. `config.example.json` dosyasını `config.json` olarak kopyala:
   ```bash
   cp config.example.json config.json
   ```

3. `config.json` içindeki alanları doldur.

## config.json

```json
{
  "token": "BOT_TOKEN_BURAYA",
  "guildId": "SUNUCU_ID_BURAYA",
  "ownerId": "SAHIP_ID_BURAYA",
  "voiceChannelId": "SES_KANAL_ID_BURAYA",
  "logChannelId": "LOG_KANAL_ID_BURAYA",
  "presence": {
    "status": "online",
    "type": "Watching",
    "text": "durumburaya"
  },
  "statusRules": [
    {
      "keyword": "örnek kelime",
      "roleId": "ROL_ID_BURAYA"
    }
  ]
}
```

| Alan | Açıklama |
|------|----------|
| `token` | Bot token'ı (Discord Developer Portal) |
| `guildId` | Botun çalışacağı sunucunun ID'si |
| `ownerId` | Bot sahibinin kullanıcı ID'si |
| `voiceChannelId` | Botun bağlanacağı ses kanalı ID'si |
| `logChannelId` | Rol ekleme/kaldırma loglarının gönderileceği kanal ID'si |
| `presence` | Botun Discord'da görünen durumu |
| `statusRules` | Kelime → rol eşleşme kuralları dizisi |


## Nasıl Çalışır

- Üyenin özel durum mesajı bir `keyword` ile **tam olarak** eşleşirse ilgili rol verilir.
![Resim](https://cdn.discordapp.com/attachments/1424419339498557555/1526165300884672582/image.png?ex=6a5607b2&is=6a54b632&hm=bf71d0d72f05e9d728da0f5b6b827fd84f11e3d1d83a8adf5de2dd14dab0b8e0&)
- Durum değiştiğinde veya kaldırıldığında eşleşme ortadan kalkarsa rol geri alınır.
![Resim](https://cdn.discordapp.com/attachments/1424419339498557555/1526165197293752443/image.png?ex=6a560799&is=6a54b619&hm=5f0a5c15ba8bf643989c8366aba8faa45adcbe0c1616d30d95d751c7c2d49b21&)
- Her iki işlemde de `logChannelId` kanalına bildirim gönderilir.

## Başlatma

```bash
npm start
```

## Gereksinimler

- Node.js 18+
- Discord bot token'ı
- Discord Developer Portal'da `GuildPresences` ve `GuildMembers` intent'leri aktif olmalı
