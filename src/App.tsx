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
  Wallet
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion, AnimatePresence, Variants } from "framer-motion";
import logo from "/favicon.svg"; // Importando a logo

// Tema de cores Strategy Mars - ajustado com mais tons de laranja
const colors = {
  marsOrange: "#b1420b",
  marsOrangeDark: "#8a3309",
  marsOrangeExtraDark: "#2a0f04",
  marsOrangeLight: "#d56536",
  marsOrangeVeryLight: "#f4855a",
  marsOrangeGlow: "rgba(177, 66, 11, 0.6)",
  marsOrangeLightGlow: "rgba(213, 101, 54, 0.4)",
}

// Variantes de animação com tema Mars
const glowVariants: Variants = {
  initial: { opacity: 0.5, scale: 0.95 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [0.95, 1, 0.95],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const shimmerVariants: Variants = {
  initial: { backgroundPosition: "200% 0" },
  animate: {
    backgroundPosition: ["-200% 0", "200% 0"],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Novo componente para os elementos flutuantes Mars
const FloatingElements = () => {
  const elements = Array(15).fill(null);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: -100,
            opacity: 0.1,
            scale: Math.random() * 0.5 + 0.5,
            rotate: Math.random() * 360
          }}
          animate={{
            y: window.innerHeight + 100,
            opacity: [0.1, 0.3, 0.1],
            rotate: Math.random() * 360
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 20
          }}
          className="absolute text-[#b1420b]/20"
        >
          {i % 2 === 0 ? <Bitcoin size={32} /> : <Rocket size={32} />}
        </motion.div>
      ))}
    </div>
  );
};

// Variantes para cartões com glow laranja
const glowCardVariants: Variants = {
  initial: { 
    boxShadow: "0 0 0 rgba(177, 66, 11, 0)" 
  },
  animate: {
    boxShadow: [
      "0 0 20px rgba(177, 66, 11, 0.2)",
      "0 0 40px rgba(177, 66, 11, 0.4)",
      "0 0 20px rgba(177, 66, 11, 0.2)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Frases de impacto mais profissionais e focadas em benefícios reais
const impactPhrases = [
  "Transações P2P em minutos, sem intermediários",
  "Privacidade total - sem KYC, sem dados pessoais",
  "O futuro das finanças descentralizadas",
];

// Animação de entrada
const slideUpVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 100
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  }
};

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

  // Data final específica: 27 de outubro de 2025
  const targetDate = new Date(2025, 5, 6); // Mês é 0-indexed, então 9 = outubro

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

  // Função auxiliar para formatar data
  const formatDate = (date: Date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    },
  };

  const pulseVariants: Variants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      }
    }
  };

  const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const featureCardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  };

  const timeUnitLabels = {
    days: "dias",
    hours: "horas",
    minutes: "minutos",
    seconds: "segundos"
  };

  // Razões para adotar Strategy Mars
  const marsBenefits = [
    {
      icon: <Rocket size={24} />,
      title: "Estratégia Revolucionária",
      description: "Abordagem inovadora para transações Bitcoin que maximiza seu potencial."
    },
    {
      icon: <Shield size={24} />,
      title: "Proteção Marciana",
      description: "Segurança de outro planeta para seus ativos digitais mais valiosos."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Valorização Estratégica",
      description: "Posicionamento para aproveitar as oportunidades do mercado de criptomoedas."
    }
  ];

  return (
    <div className="min-h-screen bg-[#2a0f04] text-white">
      {/* Background com tema marciano mais intenso */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(177,66,11,0.3)_0%,_rgba(42,15,4,0.9)_70%)]"></div>
        <FloatingElements />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header/Navigation com logo maior e mais destacada */}
        <header className="py-6 flex justify-between items-center bg-[#3a1507]/50 backdrop-blur-sm rounded-2xl px-6 mt-4 border border-[#b1420b]/30">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="relative w-12 h-12 overflow-hidden"
            >
              <img 
                src={logo} 
                alt="Logo Strategy Mars - Marte com Bitcoin" 
                className="w-full h-full object-contain"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#b1420b]/0 to-[#f4855a]/30 rounded-full"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3], 
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
            <span className="text-xl font-bold text-white">
              Strategy Mars P2P
            </span>
          </div>
          
          <motion.a 
            href="https://www.instagram.com/strategymars/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-[#f4855a] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={18} />
            <span>Siga-nos</span>
          </motion.a>
        </header>

        {/* Hero Section - Mais profissional e focada nos benefícios reais */}
        <section className="py-16 md:py-24">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainerVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={featureCardVariants} className="bg-[#3a1507]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#b1420b]/30">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#b1420b] to-[#f4855a] bg-clip-text text-transparent">Bitcoin P2P</span> em minutos, não em dias
              </h1>
              
              <p className="text-xl text-white mb-8">
                Transações diretas, seguras e totalmente privadas. 
                Sem burocracia, sem KYC, sem intermediários.
              </p>
              
              <motion.a 
                href="https://www.instagram.com/strategymars/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#b1420b] px-8 py-4 rounded-full font-medium hover:bg-[#d56536] transition-all shadow-[0_0_20px_rgba(177,66,11,0.5)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Saiba mais</span>
                <ExternalLink size={18} />
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* Countdown Timer - Movido para antes da seção Sobre */}
        <section className="py-8 md:py-16">
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto text-center px-2"
          >
            <motion.h1 
              className="text-3xl md:text-7xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-[#b1420b] to-[#f4855a] bg-clip-text text-transparent"
              variants={glowVariants}
            >
              Lançamento em
            </motion.h1>
            
            <div className="grid grid-cols-4 gap-2 md:gap-6 mb-8 md:mb-12">
              {Object.entries(countdown).map(([unit, value]) => (
                <motion.div
                  key={unit}
                  className="relative group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-[#3a1507]/80 backdrop-blur-md border border-[#b1420b]/50 rounded-2xl p-3 md:p-8 shadow-[0_0_25px_rgba(177,66,11,0.4)]">
                    <span className="text-3xl md:text-8xl font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                      {value}
                    </span>
                    <p className="text-xs md:text-lg mt-1 md:mt-2 text-[#f4855a]">{timeUnitLabels[unit as keyof typeof timeUnitLabels]}</p>
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
                  variants={featureCardVariants}
                  className="text-[#f4855a] text-lg"
                >
                  {phrase}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* SOBRE a Strategy Mars */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#3a1507]/50 backdrop-blur-sm rounded-2xl border border-[#b1420b]/30 shadow-[0_0_30px_rgba(177,66,11,0.3)]"></div>
            
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <motion.div 
                  className="w-36 h-36 md:w-44 md:h-44 relative flex-shrink-0"
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img 
                    src={logo} 
                    alt="Logo Strategy Mars" 
                    className="w-full h-full object-contain z-10 relative"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-[#b1420b]/20 rounded-full blur-xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.8, 0.6]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 4
                    }}
                  />
                </motion.div>
                
                <div className="flex-1">
                  <motion.h2 
                    className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#b1420b] to-[#f4855a] bg-clip-text text-transparent"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    Sobre a Strategy Mars
                  </motion.h2>
                  
                  <motion.div 
                    className="space-y-4 text-white/90"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <p>
                      A Strategy Mars é um ecossistema completo de soluções em Bitcoin — indo do P2P à gestão de fundos. Nossa missão é reestruturar o sistema financeiro tradicional usando o Bitcoin como base para crédito, investimento e circulação monetária.
                    </p>
                    
                    <p>
                      Estamos na fase inicial de desenvolvimento do nosso ecossistema P2P, focado em ser o mais barato, rápido e escalável do mercado — tudo baseado em confiança, privacidade e sem KYC. Aqui, você compra Bitcoin de forma direta, segura e sem precisar entregar seus dados a ninguém.
                    </p>
                    
                    <p>
                      Também estamos evoluindo para nos tornar uma gestora de fundos alavancados em Bitcoin e construindo caixa para oferecer, no futuro, uma cooperativa de crédito 100% em BTC.
                    </p>
                    
                    <p className="font-bold text-lg">
                      A Strategy Mars é o novo padrão para quem quer viver o Bitcoin de verdade — no Brasil e no mundo. Simples, direto e totalmente descentralizado. Faça parte.
                    </p>
                  </motion.div>
                </div>
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
            className="relative rounded-2xl p-8 overflow-hidden"
          >
            <motion.div
              variants={glowCardVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-br from-[#3a1507] to-[#8a3309]/70 backdrop-blur-sm border border-[#b1420b]/40 rounded-2xl"
            />

            <div className="relative flex flex-col">
              <motion.h2 
                className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-[#d56536] to-[#f4855a] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Evolução do Bitcoin
              </motion.h2>

              <div className="space-y-8">
                {/* Valores do Bitcoin */}
                <motion.div 
                  className="p-6 rounded-xl border border-[#b1420b]/40 bg-gradient-to-r from-[#3a1507]/80 to-[#8a3309]/60 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xl text-[#f4855a]">Hoje:</span>
                      <span className="text-4xl font-bold text-white">
                        R$ {bitcoinPrice.loading || bitcoinPrice.error ? '--' : bitcoinPrice.brl.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-6 rounded-xl border border-[#b1420b]/40 bg-gradient-to-r from-[#3a1507]/80 to-[#8a3309]/60 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xl text-[#f4855a]">1 ano atrás:</span>
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
                      <ArrowUp className="text-[#f4855a] w-6 h-6" />
                      <motion.span
                        className="text-xl font-bold bg-gradient-to-r from-[#d56536] to-[#f4855a] bg-clip-text text-transparent"
                        variants={glowVariants}
                        initial="initial"
                        animate="animate"
                      >
                        {(!bitcoinPrice.loading && !bitcoinPrice.error) &&
                          `+${(((bitcoinPrice.brl / fixedHistoricalPrices.oneYearAgo) - 1) * 100).toFixed(0)}%`
                        }
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  className="p-6 rounded-xl border border-[#b1420b]/40 bg-gradient-to-r from-[#3a1507]/80 to-[#8a3309]/60 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xl text-[#f4855a]">5 anos atrás:</span>
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
                      <ArrowUp className="text-[#f4855a] w-6 h-6" />
                      <motion.span
                        className="text-xl font-bold bg-gradient-to-r from-[#d56536] to-[#f4855a] bg-clip-text text-transparent"
                        variants={glowVariants}
                        initial="initial"
                        animate="animate"
                      >
                        {(!bitcoinPrice.loading && !bitcoinPrice.error) &&
                          `+${(((bitcoinPrice.brl / fixedHistoricalPrices.fiveYearsAgo) - 1) * 100).toFixed(0)}%`
                        }
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Por que Strategy Mars? - REDESENHADA sem usar cards simples */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#d56536] to-[#f4855a] bg-clip-text text-transparent">
                Por que escolher a Strategy Mars?
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Nossa plataforma P2P foi projetada para oferecer a melhor experiência possível com Bitcoin no Brasil
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-full bg-[#3a1507]/70 backdrop-blur-sm border border-[#b1420b]/40 rounded-2xl p-8 flex flex-col">
                  <div className="bg-[#b1420b]/20 p-4 w-fit rounded-lg mb-4">
                    <Timer size={32} className="text-[#f4855a]" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white">Rápido e Eficiente</h3>
                  
                  <ul className="space-y-3 mt-2 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#d56536] mt-1 flex-shrink-0" />
                      <span className="text-white/90">Transações confirmadas em minutos, não horas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#d56536] mt-1 flex-shrink-0" />
                      <span className="text-white/90">Processo simplificado sem burocracia</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#d56536] mt-1 flex-shrink-0" />
                      <span className="text-white/90">Interface intuitiva para compra e venda</span>
                    </li>
                  </ul>
                  
                  <div className="h-px w-full bg-[#b1420b]/20 my-6"></div>
                  
                  <p className="text-lg font-medium text-[#f4855a]">
                    "Utilizamos tecnologia avançada para garantir que seu Bitcoin chegue à sua carteira rapidamente."
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="h-full bg-[#3a1507]/70 backdrop-blur-sm border border-[#b1420b]/40 rounded-2xl p-8 flex flex-col">
                  <div className="bg-[#b1420b]/20 p-4 w-fit rounded-lg mb-4">
                    <Shield size={32} className="text-[#f4855a]" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white">Privacidade Total</h3>
                  
                  <ul className="space-y-3 mt-2 flex-grow">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#d56536] mt-1 flex-shrink-0" />
                      <span className="text-white/90">Sem KYC — seus dados permanecem seus</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#d56536] mt-1 flex-shrink-0" />
                      <span className="text-white/90">Transações anônimas e protegidas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#d56536] mt-1 flex-shrink-0" />
                      <span className="text-white/90">Não compartilhamos informações com terceiros</span>
                    </li>
                  </ul>
                  
                  <div className="h-px w-full bg-[#b1420b]/20 my-6"></div>
                  
                  <p className="text-lg font-medium text-[#f4855a]">
                    "Acreditamos que privacidade financeira é um direito, não um privilégio."
                  </p>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-r from-[#8a3309] to-[#3a1507] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(177,66,11,0.3)]"
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
                    <p className="font-bold text-[#f4855a]">
                      Simples, rápido e seguro — como deveria ser.
                    </p>
                  </div>
                </div>
                
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="bg-[#3a1507] border border-[#b1420b]/30 rounded-xl p-6 text-center">
                    <Wallet size={40} className="mx-auto mb-4 text-[#d56536]" />
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
        
        {/* Vantagens Tecnológicas - Seção mais objetiva */}
        <section className="py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#d56536] to-[#f4855a] bg-clip-text text-transparent">Tecnologia Inovadora</h2>
              <p className="text-xl text-white/90">
                Infraestrutura robusta para transações descentralizadas seguras e rápidas
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            >
              <motion.div
                variants={featureCardVariants}
                className="bg-[#3a1507]/70 backdrop-blur-md border border-[#b1420b]/40 rounded-2xl p-8 shadow-[0_0_15px_rgba(177,66,11,0.3)]"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Soluções Descentralizadas</h3>
                <p className="text-white/90">
                  Nossa plataforma opera sem depender de entidades centralizadas, garantindo maior segurança e confiabilidade para suas transações
                </p>
              </motion.div>

              <motion.div
                variants={featureCardVariants}
                className="bg-[#3a1507]/70 backdrop-blur-md border border-[#b1420b]/40 rounded-2xl p-8 shadow-[0_0_15px_rgba(177,66,11,0.3)]"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Futuro Financeiro</h3>
                <p className="text-white/90">
                  Estamos construindo mais que uma plataforma P2P - estamos desenvolvendo um ecossistema completo para a autonomia financeira via Bitcoin
                </p>
              </motion.div>
            </motion.div>
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
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#b1420b]/60 via-[#d56536]/40 to-[#b1420b]/60 rounded-3xl blur-md"></div>
              <div className="relative bg-[#3a1507]/80 backdrop-blur-sm border border-[#b1420b] rounded-2xl p-10 shadow-[0_0_30px_rgba(177,66,11,0.4)]">
                <h2 className="text-3xl font-bold mb-4 text-white">Prepare-se para o futuro do Bitcoin P2P</h2>
                <p className="text-white mb-8 max-w-xl mx-auto">
                  A Strategy Mars está redefinindo como as transações Bitcoin são realizadas. 
                  Junte-se a nós nesta jornada revolucionária.
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                  <motion.a
                    href="https://www.instagram.com/strategymars/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-[#b1420b] px-8 py-4 rounded-full font-medium hover:bg-[#d56536] transition-all shadow-[0_0_15px_rgba(177,66,11,0.5)]"
                  >
                    <span>Saiba mais</span>
                    <ExternalLink size={18} />
                  </motion.a>
                  
                  <motion.a
                    href="https://www.instagram.com/strategymars/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 border border-[#b1420b] px-8 py-4 rounded-full font-medium hover:bg-[#b1420b]/20 transition-all"
                  >
                    <Instagram size={20} />
                    <span>@strategymars</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 mt-8 border-t border-[#b1420b]/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src={logo} alt="Strategy Mars Logo" className="w-8 h-8" />
              <span className="text-[#f4855a]">© 2023 Strategy Mars</span>
            </div>
            
            <div className="flex gap-6">
              <motion.a
                href="https://www.instagram.com/strategymars/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, color: "#f4855a" }}
                className="text-white hover:text-[#f4855a] transition-colors"
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