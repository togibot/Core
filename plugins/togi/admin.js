// Togi-native group moderation controls.

const normalize = value => String(value || '').toLocaleLowerCase('pt-BR').trim()

function ensure(group) {
   if (!Array.isArray(group.togiBlockedWords)) group.togiBlockedWords = []
   if (typeof group.togiAntiWords !== 'boolean') group.togiAntiWords = false
   if (typeof group.togiAntiProfanity !== 'boolean') group.togiAntiProfanity = false
   if (typeof group.togiAntiLink !== 'boolean') group.togiAntiLink = false
}

export default {
   command: ['menuadm', 'antipalavrao', 'antipalavra', 'antilink'],
   category: 'togi',
   group: true,
   admin: true,
   async run(m, { command, text, group }) {
      ensure(group)

      if (command === 'menuadm') {
         await m.react('🛡️')
         return m.reply(`╭──────────────────╮\n│  🛡️ 𝐌𝐄𝐍𝐔 𝐀𝐃𝐌\n╰──────────────────╯\n\n🧹 Moderação automática\n\n• .antipalavrao on/off\n  Bloqueia palavras da lista padrão.\n\n• .antipalavra on/off\n  Ativa palavras personalizadas.\n\n• .antipalavra add <palavra>\n  Adiciona uma palavra à lista do grupo.\n\n• .antipalavra del <palavra>\n  Remove uma palavra da lista do grupo.\n\n• .antilink on/off\n  Bloqueia links enviados por membros.\n\n📌 Estado atual\n• Antipalavrão: ${group.togiAntiProfanity ? '🟢 ON' : '🔴 OFF'}\n• Antipalavras: ${group.togiAntiWords ? '🟢 ON' : '🔴 OFF'}\n• Anti-link: ${group.togiAntiLink ? '🟢 ON' : '🔴 OFF'}\n• Palavras personalizadas: ${group.togiBlockedWords.length}`)
      }

      const args = text.split(/\s+/).filter(Boolean)
      const mode = normalize(args[0])

      if (command === 'antipalavrao') {
         if (!['on', 'off'].includes(mode)) return m.reply('Use .antipalavrao on ou .antipalavrao off.')
         group.togiAntiProfanity = mode === 'on'
         await m.react(group.togiAntiProfanity ? '🟢' : '🔴')
         return m.reply(`🛡️ Antipalavrão: *${group.togiAntiProfanity ? 'ATIVADO' : 'DESATIVADO'}*.`)
      }

      if (command === 'antilink') {
         if (!['on', 'off'].includes(mode)) return m.reply('Use .antilink on ou .antilink off.')
         group.togiAntiLink = mode === 'on'
         await m.react(group.togiAntiLink ? '🔗' : '🚫')
         return m.reply(`🔗 Anti-link: *${group.togiAntiLink ? 'ATIVADO' : 'DESATIVADO'}*.`)
      }

      if (command === 'antipalavra') {
         if (mode === 'on' || mode === 'off') {
            group.togiAntiWords = mode === 'on'
            return m.reply(`🧹 Antipalavras: *${group.togiAntiWords ? 'ATIVADO' : 'DESATIVADO'}*.`)
         }

         const value = normalize(args.slice(1).join(' '))
         if ((mode === 'add' || mode === 'del') && !value)
            return m.reply(`Use .antipalavra ${mode} <palavra>.`)

         if (mode === 'add') {
            if (value.length < 2 || value.length > 40) return m.reply('❌ A palavra deve ter entre 2 e 40 caracteres.')
            if (!group.togiBlockedWords.includes(value)) group.togiBlockedWords.push(value)
            return m.reply(`🧹 Palavra adicionada à lista do grupo: *${value}*.`)
         }

         if (mode === 'del') {
            group.togiBlockedWords = group.togiBlockedWords.filter(word => word !== value)
            return m.reply(`🧹 Palavra removida da lista do grupo: *${value}*.`)
         }

         return m.reply('Use .antipalavra on/off, .antipalavra add <palavra> ou .antipalavra del <palavra>.')
      }
   }
}
