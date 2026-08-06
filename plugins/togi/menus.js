// Togi-native visual menus. These are separate from the protected legacy menu.

const IMAGES = {
   main: 'https://api.waifu.pics/sfw/waifu',
   economy: 'https://api.waifu.pics/sfw/smile',
   social: 'https://api.waifu.pics/sfw/happy',
   games: 'https://api.waifu.pics/sfw/dance'
}

async function getImage(type) {
   try {
      const response = await fetch(IMAGES[type])
      if (!response.ok) throw new Error('image api')
      const data = await response.json()
      return data.url || botThumbnail
   }
   catch {
      return botThumbnail
   }
}

async function sendMenu(m, type, title, body, reaction = '📋') {
   await m.react(reaction)
   return m.sock?.sendMessage?.(m.chat, {
      image: { url: await getImage(type) },
      caption: `╭──────────────────╮\n│  ${title}\n╰──────────────────╯\n\n${body}\n\n✦ •𝚃𝚘𝚐𝚒 𝚋𝚘𝚝•`,
      footer: botName
   }, { quoted: m })
}

export default {
   command: ['menutogi', 'menueconomia', 'menusocial', 'menugames'],
   category: 'togi',
   async run(m, { command, sock }) {
      if (command === 'menutogi') {
         await m.react('✨')
         return sock.sendMessage(m.chat, {
            image: { url: await getImage('main') },
            caption: `╭──────────────────╮\n│  ✨ 𝐓𝐎𝐆𝐈 𝐁𝐎𝐓\n│  𝐌𝐄𝐍𝐔 𝐃𝐄 𝐀́𝐑𝐄𝐀𝐒\n╰──────────────────╯\n\n💼 Economia\n.menueconomia\n\n🐾 Pets\n.menupets\n\n🥊 Battle Mode\n.menubm\n\n🛡️ Administração\n.menuadm\n\n🎮 Jogos\n.menugames\n\n💬 Social / RP\n.menusocial`,
            footer: botName
         }, { quoted: m })
      }

      if (command === 'menueconomia')
         return sock.sendMessage(m.chat, {
            image: { url: await getImage('economy') },
            caption: `╭──────────────────╮\n│  🪙 𝐄𝐂𝐎𝐍𝐎𝐌𝐈𝐀\n╰──────────────────╯\n\n💼 .vagas\nEscolha uma profissão.\n\n📝 .escolher <número>\nEscolha sua vaga.\n\n💼 .trabalhar\nTrabalhe até 3 vezes por dia.\n\n👔 .emprego\nVeja seu emprego atual.\n\n📤 .demitir\nSaia do emprego.\n\n🪙 .saldo\nVeja seus Tokens.`,
            footer: botName
         }, { quoted: m })

      if (command === 'menusocial')
         return sock.sendMessage(m.chat, {
            image: { url: await getImage('social') },
            caption: `╭──────────────────╮\n│  💜 𝐒𝐎𝐂𝐈𝐀𝐋 / 𝐑𝐏\n╰──────────────────╯\n\n💞 Área reservada para os sistemas sociais e de roleplay do Togi.\n\n👨‍👩‍👧 Família\n💑 Casal\n💗 Namoro\n🤝 Amizades\n🎭 Roleplay\n\nOs comandos dessa área serão conectados ao sistema social do Togi nas próximas etapas.`,
            footer: botName
         }, { quoted: m })

      if (command === 'menugames')
         return sock.sendMessage(m.chat, {
            image: { url: await getImage('games') },
            caption: `╭──────────────────╮\n│  🎮 𝐉𝐎𝐆𝐎𝐒\n╰──────────────────╯\n\n🥊 .menubm\nBattle Mode de roleplay.\n\n🐾 .menupets\nColecione seus pets.\n\n✨ Mais minijogos serão adicionados aqui sem transformar o sistema em aposta ou cassino.`,
            footer: botName
         }, { quoted: m })
   }
}
