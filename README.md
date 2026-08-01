# ✴️ @itsliaaa/starseed

![Logo](https://files.catbox.moe/75q4r7.jpg)

Starseed adalah bot WhatsApp sederhana yang dikembangkan dengan mengutamakan kemudahan instalasi, kecepatan, dan efisiensi penggunaan. Beragam fitur penting tersedia secara langsung, mulai dari pembuatan stiker, pengunduhan konten media sosial, pengelolaan grup dasar, hingga berbagai utilitas serbaguna yang siap membantu aktivitas sehari-hari melalui WhatsApp.

> [!CAUTION]
> Project ini adalah implementasi langsung dari [`@itsliaaa/starcore`](https://github.com/itsliaaa/starcore#readme).

### ⚙️ Gambaran Struktur

| Prinsip | Implementasi |
|------------|----------------|
| ⚡ Arsitektur Native ESM | Seluruh kode disusun menggunakan ECMAScript Modules (ESM) (`type: module`) dan dirancang untuk berjalan pada lingkungan Node.js **>= 20.18.1**. |
| 🪶 Strategi Dependensi Ringan | Menggunakan dependensi seminimal mungkin dan hanya untuk kebutuhan yang benar-benar diperlukan, sehingga aplikasi tetap ringan dan mudah dipelihara. |
| 🧩 Minimalisme Runtime | Starseed tidak menggunakan proses obfuscation maupun bundling pada kode sumber, sehingga alur eksekusi tetap mudah dipahami, konsisten, dan efisien. |

### 📄 Persyaratan Sistem

| 🔹 Minimal | ✨ Rekomendasi |
|------------|----------------|
| 1 vCPU | 1 vCPU |
| 512 MB RAM | 1 GB RAM |
| Penyimpanan 1 GB | Penyimpanan 2 GB |
| FFmpeg v6.x.x | FFmpeg v6.x.x |
| Node.js v20.18.1 LTS | Node.js v24.x.x LTS |
| Yarn v1.x.x | Yarn v1.22.22 |

### 🗄️ Hosting

Untuk menjalankan bot, sangat direkomendasikan layanan berikut. Layanan ini tidak hanya terjangkau, tetapi juga memastikan bahwa data pengguna yang tersimpan di database termasuk script bot tetap aman:

- [x] NAT VPS [Hostdata](https://hostdata.id/nat-vps-usa/) **(Sangat direkomendasikan)**
- [x] Hosting Panel [The Hoster](https://thehoster.net/bot-hosting/)
- [x] VPS [OVH Hosting](https://www.ovhcloud.com/asia/vps/)

### ⬇️ Cara Download

![DownloadStep](https://files.catbox.moe/4dz3ip.jpg)

1. Klik tombol **"Code"** berwarna **hijau**.
2. Pilih **"Download ZIP"**.
3. Ekstrak file yang didownload.

### 📥 Instalasi & Menjalankan Bot

> [!IMPORTANT]
> Periksa repositori ini secara berkala untuk mendapatkan pembaruan terbaru. Proyek ini masih dalam tahap pengembangan. Jika kamu menemukan masalah atau bug, silakan buat Issue. Terima kasih.

> [!NOTE]
> Installer mendukung sistem operasi berikut:
>
> - 🐧 Linux
> - 🍎 macOS (Darwin)
> - 📱 Android (Termux)
> - 🪟 Windows (PowerShell)

Pastikan sistem kamu telah memenuhi seluruh persyaratan yang diperlukan. Setelah itu, jalankan perintah berikut.

#### 🐧 Linux / 🍎 macOS / 📱 Termux

```bash
bash install.sh
```

#### 🪟 Windows

Jalankan PowerShell sebagai Administrator, kemudian jalankan perintah berikut.

```powershell
powershell -ExecutionPolicy Bypass -File install.ps1
```

#### 🚀 Menjalankan Bot dengan PM2

Setelah proses instalasi selesai, jalankan bot menggunakan PM2.

```bash
pm2 start app.config.cjs && pm2 logs bot
```

### 🔧 Konfigurasi

Edit [config.js](https://github.com/itsliaaa/starseed/blob/main/config.js) untuk mengkustomisasi bot:

```javascript
Object.assign(globalThis.botConfig ??= {}, {
   ownerName: 'Lia Wynn',
   ownerNumber: '628111',

   botName: 'Starseed',
   botFooter: '✦ Starseed',
   botNumber: '628111',
   pairingCode: false,
   customCode: 'starseed',

   packName: '📦 Starseed Sticker',
   packPublisher: 'GitHub: itsliaaa',

   autoTyping: true,

   defaultLimit: 30,

   botThumbnail: './media/image/thumbnail.jpg',
   botMenuMusic: './media/audio/menu-music.mp3',

   pluginsFolder: './plugins',

   localTimezone: 'Asia/Jakarta',

   temporaryFileInterval: 30 * 60 * 1000,
   dataInterval: 10 * 60 * 1000,
   gcInterval: 1 * 60 * 60 * 1000,

   rssLimit: 384 * 1024 * 1024,

   maxNsfwScore: 0.75,

   apiKey: {
      // Google AI Studio untuk Chat Bot @ https://aistudio.google.com/
      GOOGLE_APIKEY: '',

      // SightEngine untuk Anti Porn @ https://sightengine.com/
      API_USER: '',
      API_SECRET: ''
   },

   // ...
})
```

### 📁 Plugins

Kamu dapat mengikuti format berikut untuk membuat plugin kamu sendiri:

```javascript
export default {
   command: 'perintah_kamu',
   hidden: 'perintah_tersembunyi_kamu',
   category: 'kategori_kamu',
   async run(m, {
      client,
      // ...atribut lain dari listener.js
   }) {
      /* LOGIKA KAMU DISINI */
   },
   group: false, // apakah perintah hanya untuk grup?
   private: false, // apakah perintah hanya untuk chat pribadi?
   owner: false, // apakah perintah hanya untuk owner?
   partner: false, // apakah perintah hanya untuk partner?
   admin: false, // apakah perintah hanya untuk admin grup?
   botAdmin: false, // apakah perintah mengharuskan bot menjadi admin?
   limit: 1, // biaya limit untuk perintah
   energy: 30 // biaya untuk perintah unik
}
```

Lihat dokumentasi di [`@itsliaaa/starcore`](https://github.com/itsliaaa/starcore) untuk detail cara mengirim pesan interaktif dan unik.

### 👤 Credits

Starseed merupakan project independen yang dibuat dan dikelola oleh:

- [itsliaaa](https://github.com/itsliaaa) — Pembuat & Maintainer Project

Dukung pengembangan project ini:

- [Saweria](https://saweria.co/itsliaaa)

#### 🌐 Layanan Pihak Ketiga

Starseed memanfaatkan beberapa layanan eksternal berikut:

- [elrayyxml](https://github.com/elrayyxml) — Nexray API
- [faa](https://whatsapp.com/channel/0029Vb7APG9InlqWTBGDnN3d) — Faa API
- [Deline Clarissa](https://whatsapp.com/channel/0029VbB8WYS4CrfhJCelw33j) — Deline API
- [vandebry10-star](https://github.com/vandebry10-star) — Azbry API

Layanan-layanan tersebut digunakan sebagai integrasi eksternal dan tidak berafiliasi secara langsung dengan pengembangan Starseed.

#### 📦 Komponen Perangkat Lunak Pihak Ketiga

Starseed menyertakan berkas `lib/scripts/speedtest.py` yang merupakan salinan tanpa modifikasi dari project [`speedtest-cli`](https://github.com/sivel/speedtest-cli).

- Repositori: https://github.com/sivel/speedtest-cli
- Penulis: Matt Martz beserta para kontributor
- Lisensi: Apache License 2.0

Berkas tersebut disertakan untuk memudahkan proses instalasi sehingga Starseed dapat langsung digunakan tanpa memerlukan pengunduhan komponen tambahan. Seluruh hak cipta atas `speedtest.py` tetap dimiliki oleh penulis aslinya dan penggunaannya mengikuti ketentuan Apache License 2.0 sebagaimana tercantum pada berkas sumber.

#### 🧪 Penguji & Komunitas

Ucapan terima kasih yang sebesar-besarnya kepada:

- Seluruh anggota Grup Starseed
- Dan tentu saja... **Kamu** ✨

Setiap masukan, laporan, ide, serta dukungan yang diberikan menjadi bagian penting dalam perkembangan dan penyempurnaan Starseed. 🌱
