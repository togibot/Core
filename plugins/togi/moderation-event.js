// Togi-native automatic moderation event.

const normalize = value => String(value || '').toLocaleLowerCase('pt-BR').trim()
const URL_RE = /https?:\/\/|www\.|chat\.whatsapp\.com\//i

function ensure(group) {
   if (!Array.isArray(group.togiBlockedWords)) group.togiBlockedWords = []
   if (typeof group.togiAntiWords !== 'boolean') group.togiAntiWords = false
   if (typeof group.togiAntiProfanity !== 'boolean') group.togiAntiProfanity = false
   if (typeof group.togiAntiLink !== 'boolean') group.togiAntiLink = false
}

export default {
   name: 'togi-moderation',
   async run(m, { group, isAdmin, isBotAdmin, setting, sock }) {
      if (!m.isGroup || isAdmin || !isBotAdmin) return
      ensure(group)

      const body = normalize(m.body)
      let reason = ''

      if (group.togiAntiLink && URL_RE.test(body))
         reason = '🔗 Link não permitido neste grupo.'

      if (!reason && group.togiAntiWords && group.togiBlockedWords.some(word => word && body.includes(word)))
         reason = '🧹 Essa palavra está bloqueada neste grupo.'

      if (!reason && group.togiAntiProfanity) {
         const forbidden = Array.isArray(setting.forbiddenWords) ? setting.forbiddenWords : []
         if (forbidden.some(word => word && body.includes(normalize(word))))
            reason = '🚫 Linguagem inadequada não é permitida neste grupo.'
      }

      if (!reason) return

      try {
         await sock.sendMessage(m.chat, { delete: m.key })
      }
      catch { }

      await m.reply(`${reason}\n⚠️ Mensagem removida automaticamente.`)
   }
}
