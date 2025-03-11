import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
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
import Mercedes from './assets/mercedes.jpeg';
import LogoMercedes from './assets/logo-mercedes-removebg-preview (1).png';
import DaciaLogo from './assets/daciaLogo.png';
import Tesla from './assets/tesla.jpeg';
import Dacia from './assets/dacia-removebg-preview.png';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const cars = [
    {
      id: 1,
      name: "Mercedes-AMG GT",
      brand: "Mercedes-Benz",
      price: 850,
      type: "Sport",
      fuel: "Essence",
      power: "585 ch",
      acceleration: "3.2s",
      consumption: "11.4L/100km",
      category: "Luxe",
      description: "Une supercar qui allie performance et luxe"
    },
    {
      id: 2,
      name: "Tesla Model S Plaid",
      brand: "Tesla",
      price: 800,
      type: "Berline",
      fuel: "Électrique",
      power: "1020 ch",
      acceleration: "2.1s",
      consumption: "200 Wh/km",
      category: "Électrique",
      description: "La berline électrique la plus rapide au monde"
    },
    {
      id: 3,
      name: "Porsche 911 GT3",
      brand: "Porsche",
      price: 950,
      type: "Sport",
      fuel: "Essence",
      power: "510 ch",
      acceleration: "3.4s",
      consumption: "12.3L/100km",
      category: "Sport",
      description: "La référence des voitures de sport"
    },{
      id: 4,
      name: "Porsche 911 GT3",
      brand: "Porsche",
      price: 950,
      type: "Sport",
      fuel: "Essence",
      power: "510 ch",
      acceleration: "3.4s",
      consumption: "12.3L/100km",
      category: "Sport",
      description: "La référence des voitures de sport"
    },
    {
      id: 5,
      name: "Porsche 911 GT3",
      brand: "Porsche",
      price: 950,
      type: "Sport",
      fuel: "Essence",
      power: "510 ch",
      acceleration: "3.4s",
      consumption: "12.3L/100km",
      category: "Sport",
      description: "La référence des voitures de sport"
    }
  ];

  const handleWhatsAppReservation = (carName) => {
    const phoneNumber = '1234567890';
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

  const Header = () => (
    <header className={`fixed w-full z-50 backdrop-blur-md ${darkMode ? 'bg-gray-900/90' : 'bg-white/90'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={Logo}
              alt="Luxury Drive" 
              className="h-12 w-auto filter brightness-125"
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#fleet" className="text-gray-600 dark:text-gray-300 hover:text-[#ffc83e] transition-colors font-medium">Notre Flotte</a>
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-[#ffc83e] transition-colors font-medium">Avantages</a>
            <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-[#ffc83e] transition-colors font-medium">Témoignages</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-[#ffc83e] transition-colors font-medium">Contact</a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );

  const Hero = () => (
    <section className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCarIndex}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-400 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-600 "  />
                <span className="text-sm text-black font-Medium dark:text-white">Disponible maintenant</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                  {cars[currentCarIndex].name}
                </span>
                <br />
                <span className="text-xl font-medium mt-2 block text-gray-600 dark:text-gray-300">
                  {cars[currentCarIndex].description}
                </span>
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border border-gray-100 dark:border-gray-700`}>
                  <div className="flex items-center space-x-2 text-red-500 mb-2">
                    <Car className="w-5 h-5" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Puissance</span>
                  </div>
                  <div className="text-lg font-bold">{cars[currentCarIndex].power}</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border border-gray-100 dark:border-gray-700`}>
                  <div className="flex items-center space-x-2 text-[#ffc83e] mb-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">0-100 km/h</span>
                  </div>
                  <div className="text-lg font-bold">{cars[currentCarIndex].acceleration}</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border border-gray-100 dark:border-gray-700`}>
                  <div className="flex items-center space-x-2 text-black-500 mb-2">
                    <Settings className="w-5 h-5" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Consommation</span>
                  </div>
                  <div className="text-lg font-bold">{cars[currentCarIndex].consumption}</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleWhatsAppReservation(cars[currentCarIndex].name)}
                  className="px-8 py-4 bg-green-400 text-white rounded-xl
                  hover:scale-105 transition-all shadow-lg shadow-green-500/20 font-medium"
                >
                  Réserver maintenant →
                </button>
                <div className="flex items-center justify-center space-x-2 px-6 py-4 border 
                rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <span>À partir de</span>
                  <span className="text-2xl font-bold text-red-400">
                    {cars[currentCarIndex].price}DH
                  </span>
                  <span>/jour</span>
                </div>
              </div>
            </div>
            <div className="relative group ">
              <motion.div
                className="relative rounded-3xl overflow-hidden"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              >
                <img
                  src={Dacia}
                  alt={cars[currentCarIndex].name}
                  className="w-full h-auto object-contain rounded-3xl transform transition-transform duration-300 hover:scale-105"
                  style={{ transform: 'translateZ(0)', maxHeight: '400px' }}
                />
              </motion.div>
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-6">
                {cars.map((car, index) => (
                  <motion.button
                    key={car.id}
                    onClick={() => {
                      setAutoScroll(false);
                      setCurrentCarIndex(index);
                    }}
                    whileHover={{ scale: 1.1 }}
                    className={`w-20 h-20 rounded-full bg-white dark:bg-white-800 shadow-lg flex items-center justify-center  transition-all ${
                      currentCarIndex === index 
                        ? 'ring-2 ring-yellow-500 scale-110' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={car.brand === "Mercedes-Benz" ? LogoMercedes : car.brand === "Tesla" ? DaciaLogo : Dacia}
                      alt={car.brand}
                      className="w-full h-full object-contain"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );

  const Fleet = () => {
    // Charger les reviews depuis localStorage ou initialiser à zéro
    const [reviewsCount, setReviewsCount] = useState(() => {
      const stored = localStorage.getItem('reviewsCount');
      return stored ? JSON.parse(stored) : {};
    });
  
    // État pour suivre les étoiles cliquées
    const [clickedStars, setClickedStars] = useState(() => {
      const stored = localStorage.getItem('clickedStars');
      return stored ? JSON.parse(stored) : {};
    });
  
    // Sauvegarder les reviews et étoiles cliquées dans le localStorage
    useEffect(() => {
      localStorage.setItem('reviewsCount', JSON.stringify(reviewsCount));
      localStorage.setItem('clickedStars', JSON.stringify(clickedStars));
    }, [reviewsCount, clickedStars]);
  
    const handleStarClick = (carId) => {
      if (!clickedStars[carId]) {
        setReviewsCount((prev) => ({
          ...prev,
          [carId]: (prev[carId] || 0) + 1,
        }));
        setClickedStars((prev) => ({
          ...prev,
          [carId]: true,
        }));
      }
    };
  
    return (
      <section id="fleet" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <motion.div
                key={car.id}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="relative h-48">
                  <img src={Dacia} alt={car.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    {car.price}DH/jour
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{car.description}</p>
  
                  {/* Étoile cliquable */}
                  <div className="flex items-center mb-4">
                    <button onClick={() => handleStarClick(car.id)}>
                      <Star
                        className="w-6 h-6 transition-colors"
                        fill={clickedStars[car.id] ? "gold" : "none"}
                        stroke="gold"
                      />
                    </button>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {reviewsCount[car.id] || 0} clients satisfaits
                    </span>
                  </div>
  
                  <button
                    onClick={() => handleWhatsAppReservation(car.name)}
                    className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors flex items-center justify-center space-x-2 font-medium"
                  >
                    <Car className="w-5 h-5" />
                    <span>Réserver</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const Features = () => (
    <section id="features" className="py-16 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Avantages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="text-red-500 mb-4">
              <Car className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Livraison Gratuite</h3>
            <p className="text-gray-600 dark:text-gray-300">Livraison et récupération à l'adresse de votre choix</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="text-gray-500 mb-4">
              <Settings className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Assurance Premium</h3>
            <p className="text-gray-600 dark:text-gray-300">Couverture tous risques incluse dans chaque location</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="text-yellow-500 mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Service 24/7</h3>
            <p className="text-gray-600 dark:text-gray-300">Une équipe à votre disposition à tout moment</p>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const Testimonials = () => (
    <section id="testimonials" className="py-16 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-500">{testimonial.name[0]}</span>
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{testimonial.content}</p>
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
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
                  <Phone className="w-5 h-5 text-green-500" />
                </div>
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-500" />
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
    <footer className="bg-gray-900 text-white py-12">
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
              <li><a href="#fleet" className="hover:text-[#ffc83e]">Notre Flotte</a></li>
              <li><a href="#features" className="hover:text-[#ffc83e]">Avantages</a></li>
              <li><a href="#contact" className="hover:text-[#ffc83e]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#ffc83e]">Conditions générales</a></li>
              <li><a href="#" className="hover:text-[#ffc83e]">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-[#ffc83e]">Mentions légales</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Réseaux sociaux</h4>
            <div className="flex space-x-4">
              <a href={`https://wa.me/1234567890?text=${encodeURIComponent(`Je souhaite réserver la`)}`} className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center hover:bg-green-500/30 transition-colors">
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
      href={`https://wa.me/2126?text=${encodeURIComponent(`Je souhaite réserver la ${cars[currentCarIndex].name}`)}`}
      className="fixed bottom-8 right-8 p-4 bg-green-500 text-white rounded-full shadow-xl 
      hover:bg-green-600 transition-colors z-40"
      whileHover={{ scale: 1.1 }}
    >
      <FaWhatsapp className="w-6 h-6" />
    </motion.a>
  );

  return (
    <div className={darkMode ? 'dark' : ''}>
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