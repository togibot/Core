// Togi-native AFK event layer.
// Handles messages that do not resolve to a command, including private chats.

export default {
   name: 'togi-afk-guard',
   async run(m, { user }) {
      if (!user || !user.afkContext || Object.keys(user.afkContext).length === 0)
         return

      const started = Number.isFinite(user.afkTimestamp) && user.afkTimestamp > 0
         ? user.afkTimestamp
         : Date.now()
      const elapsed = Math.max(0, Date.now() - started)
      const minutes = Math.floor(elapsed / 60_000)
      const seconds = Math.floor((elapsed % 60_000) / 1_000)

      user.afkReason = ''
      user.afkContext = {}
      user.afkTimestamp = -1

      const duration = minutes > 0
         ? `${minutes} min ${seconds}s`
         : `${seconds}s`

      await m.reply(`👋 @${m.sender.split('@')[0]} voltou!\n⏱️ AFK por: ${duration}`, {
         mentions: [m.sender]
      })
   }
}
