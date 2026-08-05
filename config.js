import { LRUCache } from 'lru-cache'
import { cpus } from 'os'

const CPU_COUNT = cpus().length

Object.assign(globalThis, {
   // Nome do dono
   ownerName: 'LZ',

   // Número do dono
   ownerNumber: '5516991994983',

   // Nome do bot
   botName: '•𝚃𝚘𝚐𝚒 𝚋𝚘𝚝•',

   // Texto do rodapé
   footer: '✦ •𝚃𝚘𝚐𝚒 𝚋𝚘𝚝•',

   // [IMPORTANTE] Número do bot para o código de pareamento
   botNumber: '5516993297555',

   // Usar pareamento por código (true = código de pareamento, false = QR Code)
   pairingCode: true,

   // Limite padrão do usuário (também usado para reset)
   defaultLimit: 15,

   // Nome do pacote de figurinhas
   stickerPackName: '📦 •𝚃𝚘𝚐𝚒 𝚋𝚘𝚝• Sticker',

   // Publicador do pacote de figurinhas
   stickerPackPublisher: 'GitHub: Togi Bot',

   // ********** CHAVES DE API ********** //

   // Google AI Studio para Chat Bot
   googleApiKey: '',

   // SightEngine para Anti Porn
   apiUser: '',
   apiSecret: '',

   // ********** CONFIGURAÇÕES AVANÇADAS ********** //

   // Fuso horário local
   localTimezone: 'America/Sao_Paulo',

   // Miniatura do bot (opcional, pode ser alterada com o comando setcover)
   botThumbnail: './media/Image/thumbnail.jpg',

   // Música do menu do bot (opcional, pode ser alterada com o comando setmenumusic)
   botMenuMusic: './media/Audio/menu-music.mp3',

   // Nome da pasta temporária (opcional)
   temporaryFolder: 'temp',

   // Nome da pasta de plugins (opcional)
   pluginsFolder: 'plugins',

   // Nome da pasta de autenticação (opcional)
   authFolder: 'session',

   // Nome do arquivo de armazenamento (opcional)
   storeFilename: 'store.json',

   // Nome do arquivo do banco de dados (opcional)
   databaseFilename: 'database.json',

   // Intervalo para limpar arquivos temporários (ms)
   temporaryFileInterval: 30 * 60 * 1_000,

   // Intervalo para salvar o banco de dados no arquivo (ms)
   dataInterval: 10 * 60 * 1_000,

   // Chamar o garbage collector caso esteja disponível (ms)
   gcInterval: 1 * 60 * 60 * 1_000,

   // Tempo limite das requisições à API (ms)
   requestTimeout: 1.5 * 60 * 1_000,

   // Tempo limite dos processos FFmpeg (ms)
   ffmpegTimeout: 1 * 60 * 1_000,

   // Atraso mínimo da resposta (ms)
   minDelay: 100,

   // Atraso máximo da resposta (ms)
   maxDelay: 3 * 1_000,

   // Ignorar mensagens antigas do usuário (segundos)
   ignoreOldMessageTS: 30,

   // Limite de RSS (MB)
   rssLimit: 384 * 1_024 * 1_024,

   // Máximo de processos FFmpeg simultâneos (mínimo: 1)
   ffmpegConcurrency: Math.max(4, Math.floor(CPU_COUNT * 1.3)),

   // Pontuação máxima permitida de NSFW (valores menores são mais rigorosos)
   maxNSFWScore: 0.75,

   // Tamanho máximo do histórico do chatbot
   maxHistoryChatSize: 20,

   // Cache global das sessões Explore
   ExploreSession: new LRUCache({
      max: 256,
      ttl: 1.5 * 60 * 1_000,
      updateAgeOnGet: false,
      updateAgeOnHas: false,
      ttlAutopurge: true
   })
})
