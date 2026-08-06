// Togi-native feature layer.
// This file is original Togi Bot code and does not replace the existing core menu.

const DAY = 24 * 60 * 60 * 1000

const JOBS = [
   ['Engenheiro', '🧰', 170],
   ['Médico', '🩺', 180],
   ['Chef', '👨‍🍳', 145],
   ['Astronauta', '🚀', 220],
   ['Detetive', '🕵️', 165],
   ['Mecânico', '🔧', 140],
   ['Programador', '💻', 175],
   ['Designer', '🎨', 135],
   ['Fotógrafo', '📸', 125],
   ['Cantor', '🎤', 150],
   ['Professor', '📚', 155],
   ['Advogado', '⚖️', 185],
   ['Jornalista', '📰', 130],
   ['Arquiteto', '🏗️', 165],
   ['Bombeiro', '🚒', 190],
   ['Policial', '👮', 175],
   ['Fazendeiro', '🌾', 115],
   ['Veterinário', '🐾', 160],
   ['Cientista', '🧪', 200],
   ['Empresário', '💼', 210]
]

const PETS = [
   ['Cachorro', '🐶', 120],
   ['Gato', '🐱', 120],
   ['Coelho', '🐰', 110],
   ['Hamster', '🐹', 100],
   ['Papagaio', '🦜', 130],
   ['Tartaruga', '🐢', 105],
   ['Raposa', '🦊', 220],
   ['Panda', '🐼', 240],
   ['Pinguim', '🐧', 200],
   ['Lontra', '🦦', 230],
   ['Guaxinim', '🦝', 215],
   ['Capivara', '🦫', 250],
   ['Lobo', '🐺', 350],
   ['Tigre', '🐯', 380],
   ['Leão', '🦁', 400],
   ['Leopardo', '🐆', 390],
   ['Urso', '🐻', 360],
   ['Águia', '🦅', 340],
   ['Dragão', '🐉', 750],
   ['Fênix', '🔥', 850],
   ['Kitsune', '🦊', 900],
   ['Grifo', '🪽', 800],
   ['Dragão Oriental', '🐲', 1000]
]

const MENU_IMAGES = {
   battle: 'https://api.waifu.pics/sfw/happy',
   jobs: 'https://api.waifu.pics/sfw/waifu',
   pets: 'https://api.waifu.pics/sfw/neko'
}

async function imageFor(category) {
   try {
      const response = await fetch(MENU_IMAGES[category])
      if (!response.ok) throw new Error('image api')
      const data = await response.json()
      return data.url || botThumbnail
   }
   catch {
      return botThumbnail
   }
}

function tokens(user) {
   if (!Number.isFinite(user.token)) user.token = 0
   return user.token
}

function todayKey() {
   const date = new Date()
   return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function ensureEconomy(user) {
   tokens(user)
   if (!user.job) user.job = ''
   if (!Number.isFinite(user.workUses)) user.workUses = 0
   if (!user.workDay) user.workDay = todayKey()
   if (user.workDay !== todayKey()) {
      user.workDay = todayKey()
      user.workUses = 0
   }
   if (!Array.isArray(user.pets)) user.pets = []
   if (!user.activePet) user.activePet = null
}

function targetOf(m) {
   return m.mentionedJid?.[0] || m.quoted?.sender || null
}

function targetName(m, target) {
   if (!target) return 'alguém'
   return `@${target.split('@')[0]}`
}

function battleReply(action, actor, target) {
   const name = actor?.pushName || 'Alguém'
   const t = targetName(actor, target)
   const lines = {
      tapa: `🫳 ${name} deu um tapinha de brincadeira em ${t}!`,
      chute: `🦵 ${name} deu um chute de brincadeira em ${t}!`,
      empurrar: `🫷 ${name} empurrou ${t} de leve!`,
      provocar: `😈 ${name} provocou ${t} para uma batalha!`,
      highfive: `🙌 ${name} bateu um high-five com ${t}!`
   }
   return lines[action]
}

function battleCommand(command) {
   return ['tapa', 'chute', 'empurrar', 'provocar', 'highfive'].includes(command)
}

export default {
   command: [
      'vagas', 'escolher', 'trabalhar', 'emprego', 'demitir', 'saldo',
      'petshop', 'adotar', 'meupet', 'libertarpet', 'menupets',
      'menubm', 'tapa', 'chute', 'empurrar', 'provocar', 'highfive'
   ],
   category: 'togi',
   async run(m, { command, text, user, sock }) {
      ensureEconomy(user)

      if (command === 'vagas') {
         const lines = JOBS.map(([name, emoji, pay], index) =>
            `${String(index + 1).padStart(2, '0')}. ${emoji} ${name} — 🪙 ${pay} Token`
         )
         await m.react('💼')
         return sock.sendMessage(m.chat, {
            image: { url: await imageFor('jobs') },
            caption: `╭───────────────╮\n│  💼 𝐕𝐀𝐆𝐀𝐒 𝐃𝐄 𝐓𝐑𝐀𝐁𝐀𝐋𝐇𝐎\n╰───────────────╯\n\n${lines.join('\n')}\n\n🪙 Pagamento por trabalho\n🔁 Limite: 3 trabalhos por dia\n\n👉 Escolha com:\n.escolher <número>`,
            footer: botName
         }, { quoted: m })
      }

      if (command === 'escolher') {
         const index = Number.parseInt(text, 10) - 1
         if (!Number.isInteger(index) || !JOBS[index])
            return m.reply('❌ Escolha uma vaga válida usando `.vagas`. Exemplo: `.escolher 1`')
         user.job = JOBS[index][0]
         await m.react('✅')
         return m.reply(`💼 Emprego escolhido: ${JOBS[index][1]} *${JOBS[index][0]}*\n🪙 Pagamento: *${JOBS[index][2]} Token* por trabalho.`)
      }

      if (command === 'emprego') {
         if (!user.job) return m.reply('❌ Você ainda não possui um emprego. Use `.vagas`.')
         const job = JOBS.find(item => item[0] === user.job)
         return m.reply(`💼 *Seu emprego*\n\n${job?.[1] || '💼'} ${user.job}\n🪙 Pagamento: ${job?.[2] || 0} Token\n🔁 Usos hoje: ${user.workUses}/3`)
      }

      if (command === 'demitir') {
         if (!user.job) return m.reply('❌ Você não possui um emprego.')
         const oldJob = user.job
         user.job = ''
         await m.react('📤')
         return m.reply(`📤 Você saiu do emprego *${oldJob}*.`)
      }

      if (command === 'trabalhar') {
         if (!user.job) return m.reply('❌ Escolha um emprego primeiro com `.vagas` e `.escolher <número>`.')
         if (user.workUses >= 3) return m.reply('⏳ Você já trabalhou 3 vezes hoje. Volte amanhã!')
         const job = JOBS.find(item => item[0] === user.job)
         user.workUses++
         user.token += job[2]
         await m.react('🪙')
         return m.reply(`💼 Você trabalhou como *${job[1]} ${job[0]}*.\n\n💰 Pagamento: +${job[2]} Token\n🪙 Saldo: ${user.token} Token\n🔁 Restam ${3 - user.workUses} trabalho(s) hoje.`)
      }

      if (command === 'saldo') {
         await m.react('🪙')
         return m.reply(`🪙 *Saldo Togi*\n\nVocê possui *${tokens(user)} Token*.`)
      }

      if (command === 'petshop' || command === 'menupets') {
         const lines = PETS.map(([name, emoji, price], index) =>
            `${String(index + 1).padStart(2, '0')}. ${emoji} ${name} — 🪙 ${price}`
         )
         await m.react('🐾')
         return sock.sendMessage(m.chat, {
            image: { url: await imageFor('pets') },
            caption: `╭───────────────╮\n│  🐾 𝐏𝐄𝐓 𝐒𝐇𝐎𝐏\n╰───────────────╯\n\n${lines.join('\n')}\n\n🛒 Para adotar:\n.adotar <número>\n\n🐾 Você pode ter vários pets, mas apenas um ativo.`,
            footer: botName
         }, { quoted: m })
      }

      if (command === 'adotar') {
         const index = Number.parseInt(text, 10) - 1
         const pet = PETS[index]
         if (!pet) return m.reply('❌ Pet inválido. Veja `.petshop`.')
         if (user.pets.some(item => item.name === pet[0])) return m.reply('❌ Você já possui esse pet.')
         if (user.token < pet[2]) return m.reply(`❌ Você precisa de ${pet[2]} Token para adotar esse pet.`)
         user.token -= pet[2]
         user.pets.push({ name: pet[0], emoji: pet[1], adoptedAt: Date.now() })
         if (!user.activePet) user.activePet = pet[0]
         await m.react('🐾')
         return m.reply(`🐾 Você adotou ${pet[1]} *${pet[0]}*!\n🪙 Custo: ${pet[2]} Token\n🪙 Saldo: ${user.token} Token`)
      }

      if (command === 'meupet') {
         if (!user.pets.length) return m.reply('🐾 Você ainda não possui pets. Use `.petshop`.')
         const list = user.pets.map((pet, index) => `${index + 1}. ${pet.emoji} ${pet.name}${pet.name === user.activePet ? ' ⭐' : ''}`)
         return m.reply(`🐾 *SEUS PETS*\n\n${list.join('\n')}\n\n⭐ Pet ativo: ${user.activePet || 'nenhum'}`)
      }

      if (command === 'libertarpet') {
         const index = Number.parseInt(text, 10) - 1
         if (!user.pets[index]) return m.reply('❌ Informe o número de um pet de `.meupet`.')
         const [removed] = user.pets.splice(index, 1)
         if (user.activePet === removed.name)
            user.activePet = user.pets[0]?.name || null
         return m.reply(`🐾 ${removed.emoji} ${removed.name} foi removido da sua coleção.`)
      }

      if (command === 'menubm') {
         await m.react('🥊')
         return sock.sendMessage(m.chat, {
            image: { url: await imageFor('battle') },
            caption: `╭───────────────╮\n│  🥊 𝐁𝐀𝐓𝐓𝐋𝐄 𝐌𝐎𝐃𝐄\n╰───────────────╯\n\n🥊 Ações de roleplay entre membros:\n\n🫳 .tapa @user\n🦵 .chute @user\n🫷 .empurrar @user\n😈 .provocar @user\n🙌 .highfive @user\n\n⚔️ Use apenas como brincadeira de RP.`,
            footer: botName
         }, { quoted: m })
      }

      if (battleCommand(command)) {
         const target = targetOf(m)
         if (!target) return m.reply(`❌ Marque alguém para usar .${command}.`)
         if (target === m.sender) return m.reply('😂 Escolha outra pessoa para essa ação.')
         await m.react(command === 'highfive' ? '🙌' : '🥊')
         return m.reply(battleReply(command, m, target), { mentions: [target] })
      }
   }
}
