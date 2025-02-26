import React, { useState, useEffect ,useLayoutEffect,useRef} from 'react';
import "./App.css"
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTimes, FaBars } from "react-icons/fa";
import { 
  Car, 
  Sun, 
  Moon, 
  Clock, 
  Settings, 
  Star,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  MessageSquare,
  Facebook
} from 'lucide-react';
import Logo from './assets/logo11-removebg-preview.png';
import Mercedes from './assets/mercedes-removebg-preview.png';
import MercedesLogo from './assets/logo-mercedes-removebg-preview (1).png';
import DaciaLogo from './assets/daciaLogo.png';
import Tesla from './assets/tesla.jpeg';
import Dacia from './assets/dacia-removebg-preview.png';
import Huandai from './assets/Huandai-removebg-preview (1).png';
import HuandaiLogo from './assets/huandaiLogo-removebg-preview.png';
import Touarg from './assets/touarg-removebg-preview.png';
import TouargLogo from './assets/volswagenLogo-removebg-preview.png';
import RenaultLogo  from './assets/renaultLogo-removebg-preview.png'; 
import Clio from './assets/clio-removebg-preview.png';  
import TeslaLogo from './assets/teslaLogo-removebg-preview.png';
import Kangoo from './assets/kangoo1-removebg-preview.png';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cars = [
    {
      id: 1,
      name: "Huandai Tucson Full Option",
      brand: "huandai",
      price: 850,
      type: "Sport",
      fuel: "Essence",
      power: "585 ch",
      acceleration: "3.2s",
      consumption: "11.4L/100km",
      category: "Luxe",
      description: "Une supercar qui allie performance et luxe",
      images: [HuandaiLogo, HuandaiLogo, HuandaiLogo] // Remplacez par les images réelles
    },
    {
      id: 2,
      name: "Dacia Duster Full Option",
      brand: "Dacia",
      price: 800,
      type: "Berline",
      fuel: "Électrique",
      power: "1020 ch",
      acceleration: "2.1s",
      consumption: "200 Wh/km",
      category: "Électrique",
      description: "La berline électrique la plus rapide au monde",
      images: [DaciaLogo, DaciaLogo, DaciaLogo] // Remplacez par les images réelles
    },
    {
      id: 3,
      name: "Touarg R Full Option",
      brand: "Volswagen",
      price: 950,
      type: "Sport",
      fuel: "Essence",
      power: "510 ch",
      acceleration: "3.4s",
      consumption: "12.3L/100km",
      category: "Sport",
      description: "La référence des voitures de sport",
      images: [TouargLogo, TouargLogo, TouargLogo] // Remplacez par les images réelles
    },

    // Ajoutez les autres voitures si nécessaire
  ];

  const fleetCars = [
    {
      id: 1,
      name: "Huandai Tucson",
      brand: "huandai",
      price: 850,
      type: "SUV",
      fuel: "Essence",
      power: "585 ch",
      acceleration: "3.2s",
      consumption: "11.4L/100km",
      category: "Luxe",
      description: "Un SUV luxe et performant",
      image: Huandai,
      logo: HuandaiLogo
    },
    {
      id: 2,
      name: "Dacia Duster Full Option",
      brand: "Dacia",
      price: 800,
      type: "SUV",
      fuel: "Diesel",
      power: "115 ch",
      acceleration: "10.5s",
      consumption: "5.8L/100km",
      category: "Économique",
      description: "SUV polyvalent et économique",
      image: Dacia,
      logo: DaciaLogo
    },
    {
      id: 3,
      name: "Touareg R Full Option",
      brand: "Volswagen",
      price: 950,
      type: "SUV",
      fuel: "Hybride",
      power: "510 ch",
      acceleration: "3.4s",
      consumption: "8.3L/100km",
      category: "Sport",
      description: "Le SUV sportif de référence",
      image: Touarg,
      logo: TouargLogo
    },
    {
      id: 4,
      name: "Tesla Model S Plaid",
      brand: "Tesla",
      price: 600,
      type: "Coupé",
      fuel: "Electrique",
      power: "650 ch",
      acceleration: "2.9s",
      consumption: "13.6L/100km",
      category: "Sport",
      description: "La sportive allemande",
      image: Mercedes,
      logo: TeslaLogo
    },
    {
      id: 5,
      name: "Clio 5",
      brand: "renault",
      price: 300,
      type: "Coupé",
      fuel: "Diesel",
      power: "650 ch",
      acceleration: "2.9s",
      consumption: "13.6L/100km",
      category: "Sport",
      description: "La sportive Francaise",
      image: Clio,
      logo: RenaultLogo
    },
    {
      id: 5,
      name: "kangoo",
      brand: "renault",
      price: 250,
      type: "Coupé",
      fuel: "Diesel",
      power: "650 ch",
      acceleration: "4.9s",
      consumption: "11.6L/100km",
      category: "Famille",
      description: "Voiture familiale par excellence",
      image: Kangoo,
      logo: RenaultLogo
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');



const phoneNumber = '212771764448';
  const handleWhatsAppReservation = (carName) => {
   
    const message = encodeURIComponent(
      `Bonjour, je souhaite réserver la ${carName}. Pouvez-vous m'aider ?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  useEffect(() => {
    let interval;
    if (autoScroll) {
      interval = setInterval(() => {
        setCurrentCarIndex((prev) => (prev + 1) % cars.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoScroll, cars.length]);

  const testimonials = [
    {
      id: 1,
      name: "Jean Dupont",
      role: "Chef d'entreprise",
      image: "/api/placeholder/64/64",
      content: "Une expérience exceptionnelle ! La Mercedes-AMG GT était parfaite pour mon voyage d'affaires. Le service est impeccable.",
      rating: 5
    },
    {
      id: 2,
      name: "Marie Laurent",
      role: "Influenceuse",
      image: "/api/placeholder/64/64",
      content: "J'ai loué la Tesla Model S Plaid pour un événement. L'équipe de Luxury Drive a été très professionnelle et attentive.",
      rating: 5
    },
    {
      id: 3,
      name: "Pierre Martin",
      role: "Photographe",
      image: "/api/placeholder/64/64",
      content: "La Porsche 911 GT3 était exactement ce que je recherchais. Une voiture exceptionnelle et un service client remarquable.",
      rating: 5
    }
  ];

  const categories = ['Tous', 'Sport', 'Luxe', 'Électrique'];

  const Header = () => {
    // Fonction pour le défilement fluide
    const smoothScroll = (id) => {
      setIsMenuOpen(false);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    };
  
    return (
      <header className={`fixed w-full z-50 backdrop-blur-md border-b ${darkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
              <img 
                src={Logo}
                alt="Luxury Drive" 
                className="h-12 w-auto filter brightness-125 drop-shadow-lg cursor-pointer"
                onClick={() => smoothScroll('hero')}
              />
            </motion.div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { name: 'Nos voitures', id: 'fleet' },
                { name: 'Avantages', id: 'features' },
                { name: 'Témoignages', id: 'testimonials' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => smoothScroll(item.id)}
                  className="relative px-3 py-2 text-gray-600 dark:text-gray-300 font-medium group"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-red-600 w-0 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-md transition-all"
                whileTap={{ scale: 0.95 }}
              >
                {darkMode ? (
                  <Sun className="w-6 h-6 text-amber-400" />
                ) : (
                  <Moon className="w-6 h-6 text-gray-600" />
                )}
              </motion.button>
            </div>

          {/* Menu Mobile */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-sm"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 dark:text-gray-300"
              >
                {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>
          </nav>

          {/* Menu Mobile Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden mt-4 space-y-4 pb-4"
              >
                {[
                  { name: 'Nos voitures', id: 'fleet' },
                  { name: 'Avantages', id: 'features' },
                  { name: 'Témoignages', id: 'testimonials' },
                  { name: 'Contact', id: 'contact' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => smoothScroll(item.id)}
                    className="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 font-medium"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    );
  };


  const Hero = () => {
    const fadeInUp = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
  
    return (
      <section id="hero" className="pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCarIndex}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Left Content */}
              <div className="space-y-6 md:space-y-10 order-2 lg:order-1">
                <motion.div 
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#d4af37]/20 to-red-600/20 px-5 py-3 rounded-full backdrop-blur-sm"
                  {...fadeInUp}
                >
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Disponible maintenant
                  </span>
                </motion.div>
  
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-800 dark:from-gray-100 to-[#d4af37] bg-clip-text text-transparent"
                  {...fadeInUp}
                  transition={{ delay: 0.1 }}
                >
                  {cars[currentCarIndex].name}
                  <span className="block mt-2 md:mt-4 text-lg md:text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-300">
                    {cars[currentCarIndex].description}
                  </span>
                </motion.h1>
  
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
                  {...fadeInUp}
                  transition={{ delay: 0.2 }}
                >
                  {/* Specs Cards */}
                  {[
                    { icon: <Car />, label: 'Puissance', value: cars[currentCarIndex].power },
                    { icon: <Clock />, label: '0-100 km/h', value: cars[currentCarIndex].acceleration },
                    { icon: <Settings />, label: 'Consommation', value: cars[currentCarIndex].consumption }
                  ].map((spec, i) => (
                    <div 
                      key={i}
                      className={`p-3 md:p-4 rounded-xl ${darkMode ? 'bg-gray-850' : 'bg-white'} shadow-md border border-gray-100 dark:border-gray-700`}
                    >
                      <div className="flex items-center space-x-2 text-red-500 mb-2">
                        {spec.icon}
                        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                          {spec.label}
                        </span>
                      </div>
                      <div className="text-base md:text-lg font-bold">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </motion.div>
  
                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 md:gap-4"
                  {...fadeInUp}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={() => handleWhatsAppReservation(cars[currentCarIndex].name)}
                    className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg 
                    text-sm md:text-base font-medium hover:shadow-lg transition-all"
                  >
                    Réserver maintenant →
                  </button>
                  <div className="flex items-center justify-center space-x-2 px-4 py-3 md:px-6 md:py-4 border 
                  rounded-lg hover:bg-gray-50 dark:hover:bg-gray-850 border-gray-200 dark:border-gray-700">
                    <span className="text-xs md:text-sm dark:text-gray-400">À partir de</span>
                    <span className="text-xl md:text-2xl font-bold text-red-400">
                      {cars[currentCarIndex].price}DH
                    </span>
                    <span className="text-xs md:text-sm dark:text-gray-400">/jour</span>
                  </div>
                </motion.div>
              </div>
  
              {/* Right Image */}
              <div className="relative group order-1 lg:order-2">
                <motion.div
                  className="relative rounded-2xl lg:rounded-3xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                >
                  {/* Dynamic Car Image */}
                  <div className="relative w-full h-64 sm:h-80 md:h-96">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900 opacity-50 rounded-2xl" />
                    <img
                      src={
                        cars[currentCarIndex].brand === "huandai" ? Huandai :
                        cars[currentCarIndex].brand === "Dacia" ? Dacia :
                        Touarg
                      }
                      alt={cars[currentCarIndex].name}
                      className="w-full h-full object-contain rounded-2xl transform transition-transform duration-300"
                    />
                    <motion.div
                      className="absolute top-3 right-3 md:top-4 md:right-4 bg-white dark:bg-gray-900 p-1.5 md:p-2 rounded-full shadow-lg"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <img
                        src={
                          cars[currentCarIndex].brand === "huandai" ? HuandaiLogo :
                          cars[currentCarIndex].brand === "Dacia" ? DaciaLogo :
                          TouargLogo
                        }
                        alt="Logo"
                        className="w-8 h-8 md:w-10 md:h-10 object-contain"
                      />
                    </motion.div>
                  </div>
                </motion.div>
  
                {/* Car Selection Thumbnails */}
                <div className="absolute -bottom-14 md:-bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-3 md:space-x-4 overflow-x-auto pb-2 px-2">
                  {cars.map((car, index) => (
                    <motion.button
                      key={car.id}
                      onClick={() => {
                        setAutoScroll(false);
                        setCurrentCarIndex(index);
                      }}
                      whileHover={{ scale: 1.1 }}
                      className={`min-w-[70px] md:min-w-[90px] h-[70px] md:h-[90px] rounded-xl flex items-center justify-center 
                      shadow-lg transition-all ${
                        currentCarIndex === index 
                          ? 'ring-2 md:ring-4 ring-yellow-500 scale-110' 
                          : 'opacity-70 hover:opacity-100'
                      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                    >
                      <img
                        src={
                          car.brand === "huandai" ? HuandaiLogo :
                          car.brand === "Dacia" ? DaciaLogo :
                          TouargLogo
                        }
                        alt="Logo"
                        className="w-12 h-12 md:w-16 md:h-16 object-contain p-1.5"
                      />
                    </motion.button>
                  ))}
                </div>
  
                {/* Color Variants */}
                {["huandai", "Dacia", "Volswagen"].includes(cars[currentCarIndex].brand) && (
                  <motion.div 
                    className="absolute bottom-4 left-4 flex items-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {cars[currentCarIndex].brand === "huandai" && (
                      <>
                        <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-900 border-2 border-white" />
                        <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-red-600 border-2 border-white" />
                        <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-700 border-2 border-white" />
                      </>
                    )}
                    {cars[currentCarIndex].brand === "Dacia" && (
                      <>
                        <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-500 border-2 border-white" />
                        <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black border-2 border-white" />
                        <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-400 border-2 border-white" />
                      </>
                    )}
                    {cars[currentCarIndex].brand === "Volswagen" && (
                      <>
                        <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-500 border-2 border-white" />
                        <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black border-2 border-white" />
                        <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-2 border-gray-300" />
                      </>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    );
  };
  
  
  const Fleet = () => {
    const [reviewsCount, setReviewsCount] = useState(() => {
      const stored = localStorage.getItem('reviewsCount');
      return stored ? JSON.parse(stored) : {};
    });
    
  const [userVotes, setUserVotes] = useState(() => {
    const stored = localStorage.getItem('userVotes');
    return stored ? JSON.parse(stored) : {};
  });

  const [selectedBrand, setSelectedBrand] = useState(() => {
    const savedBrand = localStorage.getItem('selectedBrand');
    return savedBrand || 'Tous';
  });
  const correctedFleetCars = fleetCars.map(car => ({
    ...car,
    brand: car.brand
      .replace('huandai', 'Hyundai')
      .replace('Volswagen', 'Volkswagen')
      .replace(/^dacia$/i, 'Dacia')
      .replace(/^renault$/i, 'Renault')
  }));
  const brands = ['Tous', ...new Set(correctedFleetCars.map(car => car.brand))];
  const fleetRef = useRef(null);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
  };
  useEffect(() => {
    localStorage.setItem('selectedBrand', selectedBrand);
  }, [selectedBrand]);

  useEffect(() => {
    localStorage.setItem('reviewsCount', JSON.stringify(reviewsCount));
    localStorage.setItem('userVotes', JSON.stringify(userVotes));
  }, [reviewsCount, userVotes]);

  const handleStarClick = (carId) => {
    if (!userVotes[carId]) {
      setReviewsCount(prev => ({ ...prev, [carId]: (prev[carId] || 0) + 1 }));
      setUserVotes(prev => ({ ...prev, [carId]: true }));
    }
  };

  const hasUserVoted = (carId) => userVotes[carId] === true;

  // Modification du filtre pour assurer qu'il fonctionne correctement
  const filteredCars = correctedFleetCars.filter(car => {
    if (selectedBrand === 'Tous') return true;
    return car.brand.toLowerCase() === selectedBrand.toLowerCase();
  });

  // Ajouter une console.log pour le débogage si nécessaire
  console.log('Voitures filtrées:', filteredCars);
  console.log('Marque sélectionnée:', selectedBrand);
  const logoMap = {
    'Tous': Logo,
    'Hyundai': HuandaiLogo,
    'Dacia': DaciaLogo,
    'Volkswagen': TouargLogo,
    'Tesla': TeslaLogo,
    'Renault': RenaultLogo
  };
  return (
    <section id="fleet" ref={fleetRef} className="py-8 sm:py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-12 text-gray-900 dark:text-gray-100">
          Notre flotte de véhicules
        </h2>

        {/* Sélecteur de marque - version mobile optimisée avec défilement horizontal */}
        <div className="mb-6 sm:mb-8 flex overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible gap-2 sm:gap-4 md:gap-6 hide-scrollbar">
          {brands.map((brand) => (
            <motion.button
              key={brand}
              onClick={() => handleBrandSelect(brand)}
              whileHover={{ scale: 1.05 }}
              className={`flex-shrink-0 flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-xl transition-all ${
                selectedBrand === brand 
                  ? 'bg-white dark:bg-gray-800 shadow-lg border-2 border-red-500'
                  : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border-2 border-transparent'
              }`}
            >
              <img 
                src={logoMap[brand]} 
                alt={brand} 
                className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain mb-1 sm:mb-2"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                {brand}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Liste des véhicules - 2 colonnes sur mobile */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredCars.map((car) => (
              <motion.div
                key={car.id}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="relative h-28 sm:h-48">
                  <img src={car.image} alt={car.name} className="w-full h-full object-contain" />
                  <div className="absolute top-1 sm:top-4 right-1 sm:right-4 bg-red-500 text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                    {car.price}DH/j
                  </div>
                  <div className="absolute top-1 sm:top-4 left-1 sm:left-4 bg-white dark:bg-gray-800 p-1 sm:p-2 rounded-full shadow-md">
                    <img src={car.logo} alt={`${car.brand} Logo`} className="w-4 h-4 sm:w-8 sm:h-8 object-contain" />
                  </div>
                </div>
                
                <div className="p-2 sm:p-6">
                  <h3 className="text-sm sm:text-xl font-bold mb-1 sm:mb-2 text-gray-800 dark:text-gray-200 line-clamp-1">{car.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">{car.description}</p>
                  
                  <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-2 sm:mb-4">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-xs sm:text-sm">{car.acceleration}</span>
                    </div>
                    <div className="flex items-center">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-xs sm:text-sm">{car.consumption}</span>
                    </div>
                  </div>

                  <div className="flex items-center mb-2 sm:mb-4">
                    <button 
                      onClick={() => handleStarClick(car.id)}
                      disabled={hasUserVoted(car.id)}
                      className={`transition-all ${hasUserVoted(car.id) ? 'opacity-75' : 'hover:scale-110'}`}
                    >
                      <Star
                        className="w-4 h-4 sm:w-6 sm:h-6"
                        fill={hasUserVoted(car.id) ? "gold" : "none"}
                        stroke={darkMode ? "gold" : "currentColor"}
                      />
                    </button>
                    <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {reviewsCount[car.id] || 0} votes
                    </span>
                  </div>

                  <button
                    onClick={() => handleWhatsAppReservation(car.name)}
                    className="w-full py-1.5 sm:py-3 text-xs sm:text-base bg-green-500 hover:bg-green-600 text-white rounded-lg sm:rounded-xl transition-colors flex items-center justify-center space-x-1 sm:space-x-2 font-medium"
                  >
                    <Car className="w-3 h-3 sm:w-5 sm:h-5" />
                    <span>Réserver</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🚗</div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              Aucune voiture trouvée dans cette catégorie
            </h3>
            <button 
              onClick={() => handleBrandSelect('Tous')}
              className="mt-3 sm:mt-4 px-4 sm:px-5 py-2 text-sm sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Voir toutes les voitures
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

  const Features = () => (
    <section id="features" className="py-16 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Nos Avantages Exclusifs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Car className="w-8 h-8" />,
              title: "Livraison Gratuite",
              content: "Livraison et récupération à l'adresse de votre choix",
              color: "from-red-500 to-orange-500"
            },
            {
              icon: <Settings className="w-8 h-8" />,
              title: "Assurance Premium",
              content: "Couverture tous risques incluse dans chaque location",
              color: "from-blue-400 to-cyan-500"
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: "Service 24/7",
              content: "Une équipe à votre disposition à tout moment",
              color: "from-yellow-400 to-amber-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-3xl bg-white dark:bg-gray-900 shadow-xl dark:shadow-2xl border border-gray-100 dark:border-gray-800 hover:dark:shadow-gray-800/50 transition-all"
            >
              <div className={`mb-6 inline-flex bg-gradient-to-r ${feature.color} p-4 rounded-2xl`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const Testimonials = () => (
    <section id="testimonials" className="py-16 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Ce que disent nos clients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-800 hover:dark:shadow-gray-800/50 transition-all"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {testimonial.name[0]}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {testimonial.content}
              </p>
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-yellow-400 dark:text-yellow-300 fill-current"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const Contact = () => (
    <section id="contact" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Nous trouver</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Venez nous rencontrer dans notre agence parisienne
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-yellow-500" />
                </div>
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <span>contact@luxurydrive.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-500" />
                </div>
                <span>123 Avenue des Champs-Élysées, Paris</span>
              </div>
            </div>
          </div>
          
          <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
            <iframe
              title="Localisation Luxury Drive"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9914406082094!2d2.292292615638155!3d48.85837360866215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1628687450127!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="dark:grayscale-[50%]"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img src={Logo} alt="Luxury Drive" className="h-12 w-auto" />
            <p className="text-sm text-gray-400">
              Location de voitures de luxe avec un service d'exception
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#fleet" className="hover:text-[#d4af37]">Notre Flotte</a></li>
              <li><a href="#features" className="hover:text-[#d4af37]">Avantages</a></li>
              <li><a href="#contact" className="hover:text-[#d4af37]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#d4af37]">Conditions générales</a></li>
              <li><a href="#" className="hover:text-[#d4af37]">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-[#d4af37]">Mentions légales</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Réseaux sociaux</h4>
            <div className="flex space-x-4">
              <a href={`https://wa.me/{1234567890}?text=${encodeURIComponent(`Je souhaite réserver la`)}`} className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center hover:bg-green-500/30 transition-colors">
                <FaWhatsapp className="w-5 h-5 text-green-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-500/20 rounded-full flex items-center justify-center hover:bg-gray-500/30 transition-colors">
                <Mail className="w-5 h-5 text-white-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors">
                <FaFacebook className="w-5 h-5 text-white-400" />
              </a>
              <a href="#" className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center hover:bg-red-500/30 transition-colors">
                <FaInstagram className="w-5 h-5 text-red-400" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Luxury Drive. Tous droits réservés.
        </div>
      </div>
    </footer>
  );

  const FloatingWhatsAppButton = () => (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Je souhaite réserver la ${cars[currentCarIndex].name}`)}`}
      className="fixed bottom-8 right-8 p-4 bg-green-500 text-white rounded-full shadow-xl 
      hover:bg-green-600 transition-colors z-40"
      whileHover={{ scale: 1.1 }}
      target="_blank" 
      rel="noopener noreferrer"
    >
      <FaWhatsapp className="w-6 h-6" />
    </motion.a>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header />
        <Hero />
        <Fleet />
        <Features />
        <Testimonials />
        <Contact />
        <Footer />
        <FloatingWhatsAppButton />
      </div>
    </div>
  );
};

export default App;