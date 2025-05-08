import { useState, useEffect } from "react";
import {
  Bitcoin,
  ArrowRight,
  Shield,
  Zap,
  Lock,
  Clock,
  Instagram,
  TrendingUp,
  RefreshCcw,
  ChevronDown,
  ExternalLink,
  ArrowUp,
  Rocket,
  Globe,
  CheckCircle2,
  Timer,
  Wallet,
  MessageCircle,
  Phone,
  Send
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import logo from "/favicon.svg";

// Tema de cores Dig P2P
const colors = {
  red: "#ff0000",
  redDark: "#cc0000",
  black: "#000000",
  white: "#ffffff",
  gray: "#333333",
  lightGray: "#666666",
}

// Animações simplificadas
const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  },
};

const slideUpVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 200
    }
  }
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

// Frases de impacto
const impactPhrases = [
  "Transações P2P rápidas e seguras",
  "Privacidade garantida em todas as operações",
  "Acesso facilitado ao Bitcoin no Brasil",
];

function App() {
  // Estado para contagem regressiva
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Estado para a cotação do Bitcoin
  const [bitcoinPrice, setBitcoinPrice] = useState({
    brl: 0,
    usd: 0,
    loading: true,
    error: false,
  });

  // Valores históricos fixos
  const fixedHistoricalPrices = {
    oneYearAgo: 315537,
    fiveYearsAgo: 49254,
  };

  // Data final específica: 6 de junho de 2025
  const targetDate = new Date(2025, 5, 8);

  // Atualiza a contagem regressiva
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Busca o preço do Bitcoin na API CoinGecko
  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl,usd&include_24hr_change=true"
        );
        
        if (!response.ok) throw new Error("Falha ao buscar dados");
        
        const data = await response.json();
        
        setBitcoinPrice({
          brl: data.bitcoin.brl,
          usd: data.bitcoin.usd,
          loading: false,
          error: false,
        });
      } catch (error) {
        console.error("Erro ao buscar preço do Bitcoin:", error);
        setBitcoinPrice(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    fetchBitcoinPrice();
    const interval = setInterval(fetchBitcoinPrice, 60000); // Atualiza a cada minuto
    
    return () => clearInterval(interval);
  }, []);

  // Conteúdo da seção "Orientação para Carteiras Digitais"
  const walletRecommendations = [
    {
      name: "Green Wallet",
      description: "Solução ideal para celulares e desktops, compatível com a rede principal (Onchain) e rede Liquid Network.",
      icon: <Globe size={24} className="text-red-600" />
    },
    {
      name: "Bluewallet",
      description: "Opção para celular compatível com a rede principal (Onchain).",
      icon: <Wallet size={24} className="text-red-600" />
    },
    {
      name: "Blink Bitcoin Wallet",
      description: "Carteira mobile compatível com a rede Lightning Network.",
      icon: <Zap size={24} className="text-red-600" />
    },
    {
      name: "Strike Bitcoin Wallet",
      description: "Carteira mobile compatível com a rede Lightning Network e com a rede Tron TRC20 para USDT.",
      icon: <TrendingUp size={24} className="text-red-600" />
    },
  ];

  // Links de atendimento
  const contactChannels = [
    {
      name: "Telegram",
      icon: <Send size={28} className="text-red-600" />,
      description: "Atendimento rápido e direto via nosso bot oficial",
      link: "https://t.me/DIGP2P_BOT?start=/start",
      buttonText: "Abrir Telegram"
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle size={28} className="text-red-600" />,
      description: "Suporte personalizado por WhatsApp",
      link: "https://api.whatsapp.com/send/?phone=%2B5598988025761&text&type=phone_number&app_absent=0",
      buttonText: "Enviar Mensagem"
    }
  ];

  const timeUnitLabels = {
    days: "dias",
    hours: "horas",
    minutes: "minutos",
    seconds: "segundos"
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <header className="py-6 flex justify-between items-center bg-gray-900/80 rounded-lg px-6 mt-4 border border-red-600/30">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="relative w-10 h-10"
            >
              <img 
                src={logo} 
                alt="Logo Dig P2P" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            <span className="text-xl font-bold text-white">
              Dig P2P
            </span>
          </div>
          
          <motion.a 
            href="https://www.instagram.com/digp2p/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-red-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={18} />
            <span>Siga-nos</span>
          </motion.a>
        </header>

        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainerVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={slideUpVariants} className="bg-gray-900/80 p-8 rounded-lg border border-red-600/30">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-red-600">Bitcoin P2P</span> em minutos, não em dias
              </h1>
              
              <p className="text-xl text-white mb-8">
                Transações diretas, seguras e totalmente privadas. 
                Sem burocracia, sem KYC, sem intermediários.
              </p>
              
              <motion.a 
                href="#saiba-mais"
                className="inline-flex items-center gap-2 bg-red-600 px-8 py-4 rounded-md font-medium hover:bg-red-700 transition-all text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Saiba mais</span>
                <ArrowRight size={18} />
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* Countdown Timer */}
        <section className="py-8 md:py-16">
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto text-center px-2"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-white">
              Lançamento em
            </h2>
            
            <div className="grid grid-cols-4 gap-2 md:gap-6 mb-8 md:mb-12">
              {Object.entries(countdown).map(([unit, value]) => (
                <motion.div
                  key={unit}
                  className="relative group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-gray-900 border border-red-600/30 rounded-lg p-3 md:p-8">
                    <span className="text-3xl md:text-7xl font-bold text-white">
                      {value}
                    </span>
                    <p className="text-xs md:text-lg mt-1 md:mt-2 text-red-500">{timeUnitLabels[unit as keyof typeof timeUnitLabels]}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="flex justify-center gap-4 flex-wrap"
              variants={staggerContainerVariants}
            >
              {impactPhrases.map((phrase, index) => (
                <motion.span
                  key={index}
                  variants={fadeInVariants}
                  className="text-red-500 text-lg"
                >
                  {phrase}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Sobre a DIG - texto expandido */}
        <section id="saiba-mais" className="py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gray-900 rounded-lg border border-red-600/30 p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <motion.div 
                  className="w-24 h-24 md:w-32 md:h-32 relative flex-shrink-0"
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img 
                    src={logo} 
                    alt="Logo Dig P2P" 
                    className="w-full h-full object-contain z-10 relative"
                  />
                </motion.div>
                
                <div className="flex-1">
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-6 text-white"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    Sobre a <span className="text-red-600">DIG</span>
                  </motion.h2>
                  
                  <motion.div 
                    className="space-y-4 text-white/90"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <p>
                      A DIG viabiliza acesso ao Bitcoin através de transações PIX com resguardo de privacidade. 
                      Os pagamentos são intermediados por parceiros financeiros nacionais (como Plebank), 
                      integrados a infraestruturas descentralizadas (Eulen e Depix) responsáveis pela emissão 
                      de ativos digitais na blockchain Liquid Network.
                    </p>
                    
                    <p>
                      A DIG é o fruto de uma visão audaciosa: construir uma ponte simplificada entre o mundo fiduciário 
                      e o universo monetário livre, por meio da tokenização digital do real, dólar e do Bitcoin. 
                      Nossa missão é revolucionar a relação das pessoas com o dinheiro, fomentando soberania financeira 
                      e autonomia individual.
                    </p>
                    
                    <p>
                      Na DIG, oferecemos muito mais que uma experiência simplificada de compra e venda de Bitcoin. 
                      Nossa ambição é que você viva com Bitcoin — trabalhe, receba, poupe e realize seus objetivos 
                      utilizando a moeda mais livre do planeta. Para isso, desenvolvemos ferramentas que integram 
                      educação de qualidade, soluções trabalhistas modernas e inclusão social.
                    </p>
                    
                    <p className="font-bold text-red-500">
                      Cada recurso que criamos foi pensado para entregar para você as rédeas do seu futuro financeiro. 
                      Queremos ser seu aliado não apenas nas negociações, mas em cada passo da jornada rumo à liberdade 
                      econômica e individual. Seja, como nós, um bitcoinheiro.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Novo: Seção de Atendimento */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-900 rounded-lg border border-red-600/30 p-8">
              <h2 className="text-3xl font-bold mb-6 text-center text-white">
                Nosso Atendimento
              </h2>
              
              <p className="text-xl text-center mb-10 text-white/90 max-w-2xl mx-auto">
                Até a revolução chegar, compre Bitcoin P2P com atendimento personalizado
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {contactChannels.map((channel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="bg-black border border-red-600/30 rounded-lg p-6 flex flex-col items-center text-center"
                  >
                    <div className="bg-red-600/10 p-4 rounded-full mb-4">
                      {channel.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2 text-white">{channel.name}</h3>
                    <p className="mb-6 text-white/80">{channel.description}</p>
                    
                    <motion.a
                      href={channel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-auto inline-flex items-center gap-2 bg-red-600 px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-all text-white"
                    >
                      {channel.buttonText}
                      <ExternalLink size={16} />
                    </motion.a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Bitcoin Price Section */}
        <section className="py-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="rounded-lg p-8"
          >
            <div className="bg-gray-900 border border-red-600/30 rounded-lg p-6">
              <div className="relative flex flex-col">
                <h2 className="text-3xl font-bold mb-8 text-center text-white">
                  Evolução do Bitcoin
                </h2>

                <div className="space-y-6">
                  {/* Valores do Bitcoin */}
                  <motion.div 
                    className="p-6 rounded-lg border border-red-600/20 bg-gray-800"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xl text-red-500">Hoje:</span>
                        <span className="text-4xl font-bold text-white">
                          R$ {bitcoinPrice.loading || bitcoinPrice.error ? '--' : bitcoinPrice.brl.toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-6 rounded-lg border border-red-600/20 bg-gray-800"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xl text-red-500">1 ano atrás:</span>
                        <span className="text-4xl font-bold text-white">
                          R$ {fixedHistoricalPrices.oneYearAgo.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <motion.div 
                        className="flex items-center justify-end gap-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <ArrowUp className="text-red-500 w-6 h-6" />
                        <span className="text-xl font-bold text-red-500">
                          {(!bitcoinPrice.loading && !bitcoinPrice.error) &&
                            `+${(((bitcoinPrice.brl / fixedHistoricalPrices.oneYearAgo) - 1) * 100).toFixed(0)}%`
                          }
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="p-6 rounded-lg border border-red-600/20 bg-gray-800"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xl text-red-500">5 anos atrás:</span>
                        <span className="text-4xl font-bold text-white">
                          R$ {fixedHistoricalPrices.fiveYearsAgo.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <motion.div 
                        className="flex items-center justify-end gap-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <ArrowUp className="text-red-500 w-6 h-6" />
                        <span className="text-xl font-bold text-red-500">
                          {(!bitcoinPrice.loading && !bitcoinPrice.error) &&
                            `+${(((bitcoinPrice.brl / fixedHistoricalPrices.fiveYearsAgo) - 1) * 100).toFixed(0)}%`
                          }
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Por que escolher a Dig P2P? */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Por que escolher a <span className="text-red-600">Dig P2P</span>?
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Nossa plataforma foi projetada para oferecer a melhor experiência possível com Bitcoin no Brasil
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-full bg-gray-900 border border-red-600/30 rounded-lg p-8 flex flex-col">
                  <div className="bg-red-600/10 p-4 w-fit rounded-lg mb-4">
                    <Timer size={32} className="text-red-600" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white">Rápido e Eficiente</h3>
                  
                  <ul className="space-y-3 mt-2 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-white/90">Transações confirmadas em minutos, não horas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-white/90">Processo simplificado sem burocracia</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-white/90">Interface intuitiva para compra e venda</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="h-full bg-gray-900 border border-red-600/30 rounded-lg p-8 flex flex-col">
                  <div className="bg-red-600/10 p-4 w-fit rounded-lg mb-4">
                    <Shield size={32} className="text-red-600" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white">Privacidade Total</h3>
                  
                  <ul className="space-y-3 mt-2 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-white/90">Sem KYC — seus dados permanecem seus</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-white/90">Transações anônimas e protegidas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-white/90">Não compartilhamos informações com terceiros</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-r from-gray-900 to-black rounded-lg border border-red-600/30"
            >
              <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 text-left">
                  <h3 className="text-3xl font-bold mb-4 text-white">Como funciona?</h3>
                  <div className="space-y-4 text-white/90">
                    <p>
                      Nossa plataforma P2P conecta compradores e vendedores diretamente, eliminando intermediários e taxas abusivas.
                    </p>
                    <ol className="space-y-2 list-decimal pl-5">
                      <li>Acesse nossa plataforma e indique o valor desejado</li>
                      <li>Realize o pagamento pelo método escolhido</li>
                      <li>Receba Bitcoin diretamente na sua carteira em minutos</li>
                    </ol>
                    <p className="font-bold text-red-500">
                      Simples, rápido e seguro — como deveria ser.
                    </p>
                  </div>
                </div>
                
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="bg-black border border-red-600/30 rounded-lg p-6 text-center">
                    <Wallet size={40} className="mx-auto mb-4 text-red-600" />
                    <h4 className="text-xl font-bold mb-2 text-white">Sem custódia</h4>
                    <p className="text-white/80">
                      Seu Bitcoin vai direto para sua carteira pessoal, sem passar por intermediários. Você mantém o controle total.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Orientação para Carteiras Digitais */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">
              Orientação para Carteiras Digitais
            </h2>
            <p className="text-lg mb-8 text-center text-white/90">
              Recomendamos a utilização dessas carteiras para realização de negociações conosco:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {walletRecommendations.map((wallet, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-900 border border-red-600/30 p-6 rounded-lg flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-red-600/10 p-2 rounded-md">
                      {wallet.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{wallet.name}</h3>
                  </div>
                  <p className="text-white/80">{wallet.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-center text-white/60">
              <p>A escolha de carteira é opcional por parte do cliente</p>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="bg-gray-900 border border-red-600 rounded-lg p-10">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Prepare-se para o futuro do Bitcoin P2P
              </h2>
              <p className="text-white/90 mb-8 max-w-xl mx-auto">
                A Dig P2P está redefinindo como as transações Bitcoin são realizadas. 
                Junte-se a nós nesta jornada revolucionária.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-red-600 px-8 py-4 rounded-md font-medium hover:bg-red-700 transition-all text-white"
                >
                  <span>Saiba mais</span>
                  <ExternalLink size={18} />
                </motion.a>
                
                <motion.a
                  href="https://www.instagram.com/digp2p/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 border border-red-600 px-8 py-4 rounded-md font-medium hover:bg-red-600/10 transition-all text-white"
                >
                  <Instagram size={20} />
                  <span>Siga-nos</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 mt-8 border-t border-red-600/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src={logo} alt="Dig P2P Logo" className="w-8 h-8" />
              <span className="text-white">© 2025 Dig P2P</span>
            </div>
            
            <div className="flex gap-6">
              <motion.a
                href="https://www.instagram.com/digp2p/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, color: "#ff0000" }}
                className="text-white hover:text-red-600 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;