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
    "text": "Durumları Takip Ediyorum 💬"
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

### statusRules

Her kural şu alanları içerir:

| Alan | Tip | Açıklama |
|------|-----|----------|
| `keyword` | string | Durumda aranacak kelime/ifade (tam eşleşme) |
| `roleId` | string | Eşleşince verilecek rolün ID'si |

Birden fazla kural tanımlanabilir:

```json
"statusRules": [
  { "keyword": "@sunucu", "roleId": "111" },
  { "keyword": "yayındayım", "roleId": "222" }
]
```

## Nasıl Çalışır

- Üyenin özel durum mesajı bir `keyword` ile **tam olarak** eşleşirse ilgili rol verilir.
- Durum değiştiğinde veya kaldırıldığında eşleşme ortadan kalkarsa rol geri alınır.
- Her iki işlemde de `logChannelId` kanalına Discord Components V2 formatında bildirim gönderilir.

## Başlatma

```bash
npm start
```

## Gereksinimler

- Node.js 18+
- Discord bot token'ı
- Discord Developer Portal'da `GuildPresences` ve `GuildMembers` intent'leri aktif olmalı
