import React, { useState, useEffect } from 'react';
import "./App.css";

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
} from 'lucide-react';
import Swal from 'sweetalert2';
import Logo from './assets/logo11-removebg-preview.png';
import DaciaLogo from './assets/daciaLogo.png';
import Dacia from './assets/dacia-removebg-preview.png';
import VolswagenLogo from './assets/volswagenLogo-removebg-preview.png';
import Touarg from './assets/touarg-removebg-preview.png';
import RenaultLogo from './assets/renaultLogo-removebg-preview.png'; 
import Clio from './assets/clio-removebg-preview.png';  
import TeslaLogo from './assets/teslaLogo-removebg-preview.png';
import Tesla from './assets/tesla.jpeg';
import { useData } from './context/DataContext';
import FordLogo from './assets/ford-logo-removebg-preview.png';
import KiaLogo from './assets/kiaLogo.png';
import FiatLogo from './assets/fiatLogo.png';
import PeugeotLogo from './assets/peugeotLogo.png';
import MercedesLogo from './assets/mercedesLogo.png';
import CitroenLogo from './assets/citroenLogo.png';
import AudiLogo from './assets/audiLogo.png';
import OpelLogo from './assets/opelLogo.png';
import SkodaLogo from './assets/skodaLogo.png';
import SeatLogo from './assets/seatLogo.png';
import SuzukiLogo from './assets/suzukiLogo.png';
import ToyotaLogo from './assets/toyotaLogo.png';
import NissanLogo from './assets/nissanLogo.png';
import HondaLogo from './assets/hondaLogo.png';
import MitsubishiLogo from './assets/mitsubichiLogo.png';
import ChevroletLogo from './assets/chevroletLogo.png';
import BmwLogo from './assets/bmwLogo.png';
import DfskLogo from './assets/dfskLogo.png';
import { useNavigate } from 'react-router-dom';

// Utility function to format ISO date to MySQL-compatible format
const formatDateForMySQL = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().slice(0, 19).replace('T', ' ');
};




const Main = () => {
    const { cars: fleetCarsFromContext, settings, addCustomer, addReservation } = useData();
    const [darkMode, setDarkMode] = useState(false);
    const [currentCarIndex, setCurrentCarIndex] = useState(0);
    const [autoScroll, setAutoScroll] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [clickCount, setClickCount] = useState(0);
const navigate = useNavigate();

const handleLogoClick = () => {
  setClickCount(prev => {
    if (prev + 1 >= 5) { // Après 5 clics
      navigate('/admin');
      return 0;
    }
    return prev + 1;
  });
};



const handleWhatsAppReservation = async (carName, carId, addCustomer, addReservation) => {
    // Obtenir la date d'aujourd'hui au format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    // Obtenir la date de demain au format YYYY-MM-DD
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const { value: formValues } = await Swal.fire({
        title: 'Réservez votre voiture',
        html:
            '<div class="form-container" style="width: 100%; max-width: 350px; margin:0 auto;">'+
        '<div class="form-group" style="margin-bottom: 15px;">'+
          '<input id="swal-input1" class="swal2-input" placeholder="Votre nom" required style="width: 100%; box-sizing: border-box;">'+
        '</div>'+
        '<div class="form-group" style="margin-bottom: 15px; display: flex; flex-direction: column;">'+
          '<input id="swal-input2" class="swal2-input" placeholder="Votre téléphone" required style="width: 100%; box-sizing: border-box;">'+
       '</div>'+
        
        '<div class="form-group" style="margin-bottom: 15px; display: flex; flex-direction: column;">'+
          '<label for="start-date" style="margin-bottom: 5px; font-weight: bold;">Date de début:</label>'+
          '<input id="start-date" type="date" class="swal2-input" value="${today}" min="${today}" required style="width: 100%; box-sizing: border-box;">'+
        '</div>'+
        
       ' <div class="form-group" style="margin-bottom: 15px; display: flex; flex-direction: column;">'+
          '<label for="end-date" style="margin-bottom: 5px; font-weight: bold;">Date de fin:</label>'+
          '<input id="end-date" type="date" class="swal2-input" value="${tomorrow}" min="${tomorrow}" required style="width: 100%; box-sizing: border-box;">'+
        '</div>'+
      '</div>',
        focusConfirm: false,
        preConfirm: () => {
            const customerName = document.getElementById('swal-input1').value;
            const customerPhone = document.getElementById('swal-input2').value;
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            
            // Validation des champs
            if (!customerName || !customerPhone) {
                Swal.showValidationMessage('Veuillez remplir tous les champs');
                return false;
            }
            
            // Validation des dates
            if (!startDate || !endDate) {
                Swal.showValidationMessage('Veuillez sélectionner les dates de réservation');
                return false;
            }
            
            const start = new Date(startDate);
            const end = new Date(endDate);
            
            if (start > end) {
                Swal.showValidationMessage('La date de fin doit être après la date de début');
                return false;
            }
            
            return { customerName, customerPhone, startDate, endDate };
        },
        showCancelButton: true,
        confirmButtonText: 'Réserver',
        cancelButtonText: 'Annuler',
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#EF4444',
    });

    if (!formValues) return;

    const { customerName, customerPhone, startDate, endDate } = formValues;

    try {
        const newCustomer = await addCustomer({ name: customerName, phone: customerPhone });
        await addReservation({
            customer_id: newCustomer.id,
            car_id: carId,
            start_date: formatDateForMySQL(new Date(startDate)),
            end_date: formatDateForMySQL(new Date(endDate)),
            status: 'pending',
        });

        // Calculer la durée de réservation en jours
        const start = new Date(startDate);
        const end = new Date(endDate);
        const durationDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        const message = encodeURIComponent(
            `Bonjour, je souhaite réserver la ${carName}.\n\n` +
            `✅ Détails de ma réservation:\n` +
            `👤 Nom: ${customerName}\n` +
            `📱 Téléphone: ${customerPhone}\n` +
            `🗓️ Période: du ${startDate} au ${endDate}\n` +
            `⏱️ Durée: ${durationDays} jour${durationDays > 1 ? 's' : ''}`
        );
        window.open(`https://wa.me/${settings.phone}?text=${message}`, '_blank');
        
        Swal.fire({
            icon: 'success',
            title: 'Réservation initiée !',
            text: 'Votre demande a été envoyée via WhatsApp.',
            confirmButtonColor: '#10B981',
        });
    } catch (error) {
        console.error('Error creating reservation:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la réservation.',
            confirmButtonColor: '#EF4444',
        });
    }
};

    

    // Updated cars array with Renault, Tesla, Volkswagen, and Dacia
    const cars = [
        {
            id: 1,
            name: "Dacia Duster Full Option",
            brand: "dacia",
            price: 800,
            type: "SUV",
            fuel: "Diesel",
            power: "130 ch",
            acceleration: "10.6s",
            consumption: "4.8L/100km",
            category: "Économique",
            description: "Un SUV robuste et économique",
            images: [DaciaLogo, DaciaLogo, DaciaLogo]
        },
        {
            id: 2,
            name: "Renault Clio Full Option",
            brand: "renault",
            price: 600,
            type: "Citadine",
            fuel: "Essence",
            power: "100 ch",
            acceleration: "11.8s",
            consumption: "5.0L/100km",
            category: "Économique",
            description: "Une citadine agile et moderne",
            images: [RenaultLogo, RenaultLogo, RenaultLogo]
        },
        {
            id: 3,
            name: "Tesla Model 3",
            brand: "tesla",
            price: 1200,
            type: "Berline",
            fuel: "Électrique",
            power: "225 ch",
            acceleration: "5.6s",
            consumption: "14.9 kWh/100km",
            category: "Électrique",
            description: "Une berline électrique performante",
            images: [TeslaLogo, TeslaLogo, TeslaLogo]
        },
        {
            id: 4,
            name: "Volkswagen Touareg R Full Option",
            brand: "volkswagen",
            price: 950,
            type: "SUV",
            fuel: "Essence",
            power: "510 ch",
            acceleration: "3.4s",
            consumption: "12.3L/100km",
            category: "Luxe",
            description: "Un SUV de luxe puissant",
            images: [VolswagenLogo, VolswagenLogo, VolswagenLogo]
        },
    ];

    const fleetCars = fleetCarsFromContext.length > 0 ? fleetCarsFromContext : cars;
    const getUniqueBrandCars = (cars) => {
        const uniqueBrands = new Set();
        const selectedCars = [];
        
        // First pass: try to get 3 cars of different brands
        for (const car of cars) {
            if (!uniqueBrands.has(car.brand) && selectedCars.length < 3) {
                uniqueBrands.add(car.brand);
                selectedCars.push(car);
            }
            
            if (selectedCars.length === 3) break;
        }
        
        // If we don't have 3 cars yet, fill with remaining cars
        if (selectedCars.length < 3) {
            const remainingCars = cars.filter(car => !selectedCars.includes(car));
            selectedCars.push(...remainingCars.slice(0, 3 - selectedCars.length));
        }
        
        return selectedCars;
    };
    
    // Then use this to get hero cars
    const heroDisplayCars = getUniqueBrandCars(fleetCars);

    useEffect(() => {
        console.log('Fleet Cars from Context:', fleetCarsFromContext);
        console.log('Settings from Context:', settings);
    }, [fleetCarsFromContext, settings]);

    
    const [searchTerm, setSearchTerm] = useState('');
    

    useEffect(() => {
        console.log('Fleet Cars from Context:', fleetCarsFromContext);
        console.log('Settings from Context:', settings);
        console.log('Hero Display Cars:', heroDisplayCars);
    }, [fleetCarsFromContext, settings, heroDisplayCars]);

    useEffect(() => {
        let interval;
        if (autoScroll) {
            interval = setInterval(() => {
                setCurrentCarIndex((prev) => (prev + 1) % heroDisplayCars.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [autoScroll, heroDisplayCars.length]);


    const testimonials = [
        {
            id: 1,
            name: "Jean Dupont",
            role: "Chef d'entreprise",
            image: "/api/placeholder/64/64",
            content: "Une expérience exceptionnelle ! La Renault Clio était parfaite pour mon trajet quotidien.",
            rating: 5
        },
        {
            id: 2,
            name: "Marie Laurent",
            role: "Influenceuse",
            image: "/api/placeholder/64/64",
            content: "J'ai loué la Tesla Model 3 pour un événement. L'équipe a été très professionnelle.",
            rating: 5
        },
        {
            id: 3,
            name: "Pierre Martin",
            role: "Photographe",
            image: "/api/placeholder/64/64",
            content: "La Volkswagen Touareg était exactement ce que je recherchais. Service remarquable.",
            rating: 5
        }
    ];

    const categories = ['Tous', 'Économique', 'Luxe', 'Électrique'];

    const Header = () => {
        const smoothScroll = (id) => {
            setIsMenuOpen(false);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }
        };

        return (
            <header className={`fixed w-full z-50 backdrop-blur-md border-b ${darkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-100'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <nav className="flex items-center justify-between">
                    <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-4 group cursor-pointer"
                    onClick={() => smoothScroll('hero')}
                >
                    <div className="relative overflow-hidden rounded-lg">
                        <img 
                            src={Logo}
                            alt={settings.siteName} 
                            className="h-14 w-auto object-contain filter drop-shadow-md transition-all duration-300 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 to-black-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="hidden md:block text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent transition-all duration-300">
                            {settings.siteName}
                        </span>
                        <span className="hidden md:block text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider transform -translate-y-1">
                            PREMIUM CAR RENTAL
                        </span>
                    </div>
                </motion.div>
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
                                {darkMode ? <Sun className="w-6 h-6 text-amber-400" /> : <Moon className="w-6 h-6 text-gray-600" />}
                            </motion.button>
                        </div>
                        <div className="md:hidden flex items-center space-x-4">
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-sm"
                            >
                                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
                            </button>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-gray-600 dark:text-gray-300"
                            >
                                {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                            </button>
                        </div>
                    </nav>
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
    
        const getCarLogo = (carBrand) => {
            if (!carBrand) return DaciaLogo;
        
            const brand = carBrand.toLowerCase();
            const logoMap = {
                'dacia': DaciaLogo,
                'renault': RenaultLogo,
                'tesla': TeslaLogo,
                'volkswagen': VolswagenLogo,
                'ford': FordLogo,
                'kia': KiaLogo,
                'bmw': BmwLogo,
                'peugeot': PeugeotLogo,
                'mercedes': MercedesLogo,
                'citroen': CitroenLogo,
                'audi': AudiLogo,
                'fiat': FiatLogo,
                'opel': OpelLogo,
                'skoda': SkodaLogo,
                'seat': SeatLogo,
                'toyota': ToyotaLogo,
                'nissan': NissanLogo,
                'honda': HondaLogo,
                'mitsubishi': MitsubishiLogo,
                'suzuki': SuzukiLogo,
                'chevrolet': ChevroletLogo,
                'dfsk': DfskLogo,
            };
            
            return logoMap[brand] || DaciaLogo;
        };
    
        const getCarImage = (car) => {
            if (car.image_url) {
                return car.image_url; // Use the full Cloudinary URL directly
            }
        
            const brand = car.brand?.toLowerCase();
            const imageMap = {
                'dacia': Dacia,
                'renault': Clio,
                'tesla': Tesla,
                'volkswagen': Touarg
            };
        
            return imageMap[brand] || Dacia; // Fallback for default images
        };
    
        return (
            <section id="hero" className="pt-28 pb-36 md:pt-32 md:pb-40 overflow-hidden">
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
                            <div className="space-y-6 md:space-y-10 order-2 lg:order-1">
                                <motion.div 
                                    className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#d4af37]/20 to-red-600/20 px-5 py-3 rounded-full backdrop-blur-sm"
                                    {...fadeInUp}
                                >
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        {heroDisplayCars[currentCarIndex]?.available ? 'Disponible maintenant' : 'Réservation possible'}
                                    </span>
                                </motion.div>
                                <motion.h1 
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-800 dark:from-gray-100 to-[#d4af37] bg-clip-text text-transparent"
                                    {...fadeInUp}
                                    transition={{ delay: 0.1 }}
                                >
                                    {heroDisplayCars[currentCarIndex]?.name || 'Véhicule de luxe'}
                                    <span className="block mt-2 md:mt-4 text-lg md:text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-300">
                                        {heroDisplayCars[currentCarIndex]?.description || 'Une expérience de conduite exceptionnelle'}
                                    </span>
                                </motion.h1>
                                <motion.div 
                                    className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
                                    {...fadeInUp}
                                    transition={{ delay: 0.2 }}
                                >
                                    {[
                                        { icon: <Car />, label: 'Puissance', value: heroDisplayCars[currentCarIndex]?.puissance || 'N/A' },  // Correct spelling
                                        { icon: <Clock />, label: '0-100 km/h', value: heroDisplayCars[currentCarIndex]?.acceleration || 'N/A' },
                                        { icon: <Settings />, label: 'Consommation', value: heroDisplayCars[currentCarIndex]?.consumption || 'N/A' }
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
                                        onClick={() => handleWhatsAppReservation(
                                            heroDisplayCars[currentCarIndex]?.name,
                                            heroDisplayCars[currentCarIndex]?.id,
                                            addCustomer,
                                            addReservation
                                        )}
                                        className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm md:text-base font-medium hover:shadow-lg transition-all"
                                    >
                                        Réserver maintenant →
                                    </button>
                                    <div className="flex items-center justify-center space-x-2 px-4 py-3 md:px-6 md:py-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-850 border-gray-200 dark:border-gray-700">
                                        <span className="text-xs md:text-sm dark:text-gray-400">À partir de</span>
                                        <span className="text-xl md:text-2xl font-bold text-red-400">
                                            {heroDisplayCars[currentCarIndex]?.price || '---'}DH
                                        </span>
                                        <span className="text-xs md:text-sm dark:text-gray-400">/jour</span>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="relative group order-1 lg:order-2">
                                <motion.div
                                    className="relative rounded-2xl lg:rounded-3xl overflow-hidden"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                                >
                                    <div className="relative w-full h-64 sm:h-80 md:h-96">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900 opacity-50 rounded-2xl" />
                                        <img
                                            src={heroDisplayCars[currentCarIndex] ? getCarImage(heroDisplayCars[currentCarIndex]) : Dacia}
                                            alt={heroDisplayCars[currentCarIndex]?.name || 'Véhicule'}
                                            className="w-full h-full object-contain rounded-2xl transform transition-transform duration-300"
                                        />
                                        <motion.div
                                            className="absolute top-3 right-3 md:top-4 md:right-4 bg-white dark:bg-gray-900 p-1.5 md:p-2 rounded-full shadow-lg"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <img
                                                src={heroDisplayCars[currentCarIndex] ? getCarLogo(heroDisplayCars[currentCarIndex].brand) : DaciaLogo}
                                                alt="Logo"
                                                className="w-8 h-8 md:w-10 md:h-10 object-contain"
                                            />
                                        </motion.div>
                                    </div>
                                </motion.div>
                                {/* Modified this div to fix logo buttons display */}
                                <div className="absolute -bottom-28 md:-bottom-32 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                                    <div className="flex space-x-3 md:space-x-4 py-4 px-2 overflow-x-auto overflow-y-visible">
                                        {heroDisplayCars.map((car, index) => (
                                            <motion.button
                                                key={car.id || index}
                                                onClick={() => {
                                                    setAutoScroll(false);
                                                    setCurrentCarIndex(index);
                                                }}
                                                whileHover={{ scale: 1.1 }}
                                                className={`min-w-[70px] md:min-w-[90px] h-[70px] md:h-[90px] rounded-xl flex items-center justify-center shadow-lg transition-all ${currentCarIndex === index ? 'ring-2 md:ring-4 ring-yellow-500 scale-110' : 'opacity-70 hover:opacity-100'} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                                            >
                                                <img
                                                    src={getCarLogo(car.brand)}
                                                    alt="Logo"
                                                    className="w-12 h-12 md:w-16 md:h-16 object-contain p-1.5"
                                                />
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        );
    };
    
    const Fleet = () => {
    const { cars: fleetCars, updateCar, addCustomer, addReservation } = useData();

    const [userVotes, setUserVotes] = useState(() => {
        try {
            const storedUserVotes = localStorage.getItem('userVotes');
            return storedUserVotes ? JSON.parse(storedUserVotes) : {};
        } catch (error) {
            console.error('Error parsing userVotes from localStorage:', error);
            return {};
        }
    });

    const [selectedBrand, setSelectedBrand] = useState(() => {
        const savedBrand = localStorage.getItem('selectedBrand');
        return savedBrand ? savedBrand.toLowerCase() : 'tous';
    });

    const brandCorrections = {
        'dacia': 'dacia',
        'renault': 'renault',
        'tesla': 'tesla',
        'volkswagen': 'volkswagen',
        'ford': 'ford',
        'kia': 'kia',
        'bmw': 'bmw',
        'peugeot': 'peugeot',
        'mercedes': 'mercedes',
        'citroen': 'citroen',
        'audi': 'audi',
        'fiat': 'fiat',
        'opel': 'opel',
        'skoda': 'skoda',
        'seat': 'seat',
        'toyota': 'toyota',
        'nissan': 'nissan',
        'honda': 'honda',
        'mitsubishi': 'mitsubishi',
        'suzuki': 'suzuki',
        'chevrolet': 'chevrolet',
        'dfsk': 'dfsk',
    };

    const correctedFleetCars = fleetCars.map(car => ({
        ...car,
        brand: brandCorrections[car.brand.toLowerCase()] || car.brand.toLowerCase(),
    }));

    const brands = ['tous', ...new Set(correctedFleetCars.map(car => car.brand))];

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand.toLowerCase());
    };

    useEffect(() => {
        localStorage.setItem('selectedBrand', selectedBrand);
        localStorage.setItem('userVotes', JSON.stringify(userVotes));
      }, [selectedBrand, userVotes]);

      const handleStarClick = async (carId) => {
        if (!userVotes[carId]) {
          // Optimistic UI update
          setUserVotes(prev => ({ ...prev, [carId]: true }));
      
          try {
            const car = correctedFleetCars.find(c => c.id === carId);
            if (!car) return;
      
            const updatedVoteCount = (car.vote || 0) + 1;
            const formData = new FormData();
            formData.append('name', car.name);
            formData.append('brand', car.brand);
            formData.append('price', car.price);
            formData.append('available', car.available.toString());
            formData.append('description', car.description || '');
            formData.append('consumption', car.consumption || '');
            formData.append('acceleration', car.acceleration || '');
            formData.append('vote', updatedVoteCount);
      
            await updateCar(carId, formData);
            Swal.fire({
              icon: 'success',
              title: 'Vote enregistré !',
              text: 'Merci pour votre vote.',
              confirmButtonColor: '#10B981',
            });
          } catch (error) {
            console.error('Error updating vote:', error);
            // Revert optimistic update on failure
            setUserVotes(prev => ({ ...prev, [carId]: false }));
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors du vote.',
              confirmButtonColor: '#EF4444',
            });
          }
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Déjà voté',
            text: 'Vous avez déjà voté pour cette voiture.',
            confirmButtonColor: '#3085d6',
          });
        }
      };

    const hasUserVoted = (carId) => userVotes[carId] === true;

    const filteredCars = correctedFleetCars.filter(car => 
        selectedBrand === 'tous' || car.brand === selectedBrand
    );

    console.log('Filtered Cars:', filteredCars);

    const logoMap = {
        'tous': Logo,
        'dacia': DaciaLogo,
        'renault': RenaultLogo,
        'tesla': TeslaLogo,
        'volkswagen': VolswagenLogo,
        'ford': FordLogo,
        'kia': KiaLogo,
        'bmw': BmwLogo,
        'peugeot': PeugeotLogo,
        'mercedes': MercedesLogo,
        'citroen': CitroenLogo,
        'audi': AudiLogo,
        'fiat': FiatLogo,
        'opel': OpelLogo,
        'skoda': SkodaLogo,
        'seat': SeatLogo,
        'toyota': ToyotaLogo,
        'nissan': NissanLogo,
        'honda': HondaLogo,
        'mitsubishi': MitsubishiLogo,
        'suzuki': SuzukiLogo,
        'chevrolet': ChevroletLogo,
        'dfsk': DfskLogo,
    };

    return (
        <section id="fleet" className="py-8 sm:py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-3 sm:px-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-12 text-gray-900 dark:text-gray-100">
                    Notre flotte de véhicules
                </h2>
                <div className="mb-6 sm:mb-8 flex overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible gap-2 sm:gap-4 md:gap-6 hide-scrollbar">
                    {brands.map((brand) => (
                        <motion.button
                            key={brand}
                            onClick={() => handleBrandSelect(brand)}
                            whileHover={{ scale: 1.05 }}
                            className={`flex-shrink-0 flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-xl transition-all ${selectedBrand === brand ? 'bg-white dark:bg-gray-800 shadow-lg border-2 border-red-500' : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border-2 border-transparent'}`}
                        >
                            <img
                                src={logoMap[brand] || Logo}
                                alt={brand}
                                className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain mb-1 sm:mb-2"
                            />
                            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                                {brand.charAt(0).toUpperCase() + brand.slice(1)}
                            </span>
                        </motion.button>
                    ))}
                </div>
                {filteredCars.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                        {filteredCars.map((car) => (
                            <motion.div
                                key={car.id}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
                            >
                                <div className="relative h-28 sm:h-48">
                                {car.image_url ? (
        <img 
            src={car.image_url} // Use Cloudinary URL directly
            alt={car.name} 
            className="w-full h-full object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
        />
    ) : (
        <img 
            src={
                car.brand === "dacia" ? Dacia :
                car.brand === "renault" ? Clio :
                car.brand === "tesla" ? Tesla :
                car.brand === "volkswagen" ? Touarg :
                Dacia // Default fallback
            }
            alt={car.name}
            className="w-full h-full object-contain"
        />
    )}
                                    <div className="absolute top-1 sm:top-4 right-1 sm:right-4 bg-red-500 text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                                        {car.price}DH/j
                                    </div>
                                    <div className="absolute top-1 sm:top-4 left-1 sm:left-4 bg-white dark:bg-gray-800 p-1 sm:p-2 rounded-full shadow-md">
                                        <img 
                                            src={logoMap[car.brand] || Logo} 
                                            alt={`${car.brand} Logo`} 
                                            className="w-4 h-4 sm:w-8 sm:h-8 object-contain" 
                                        />
                                    </div>
                                </div>
                                <div className="p-2 sm:p-6">
                                    <div className="flex justify-between items-start mb-1 sm:mb-2">
                                        <h3 className="text-sm sm:text-xl font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{car.name}</h3>
                                        <div className={`${car.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'} px-1.5 py-0.5 rounded text-xs flex items-center space-x-1`}>
                                            <span className={`inline-block w-2 h-2 rounded-full ${car.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                            <span>{car.available ? 'Disponible' : 'Réservée'}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">{car.description || 'Pas de description'}</p>
                                    <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-2 sm:mb-4">
                                        <div className="flex items-center">
                                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500 dark:text-gray-400" />
                                            <span className="text-xs sm:text-sm">{car.acceleration || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500 dark:text-gray-400" />
                                            <span className="text-xs sm:text-sm">{car.consumption || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Car className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500 dark:text-gray-400" />
                                            <span className="text-xs sm:text-sm">{car.puissance || 'N/A'}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-2 sm:mb-4">
                                    <button
                                    onClick={() => handleStarClick(car.id)}
                                    disabled={hasUserVoted(car.id)}
                                    className={`transition-all ${hasUserVoted(car.id) ? 'opacity-75 cursor-not-allowed' : 'hover:scale-110'}`}
                                    >
                                    <Star
                                        className="w-4 h-4 sm:w-6 sm:h-6"
                                        fill={hasUserVoted(car.id) ? 'gold' : 'none'}
                                        stroke="currentColor"
                                    />
                                    </button>
                                    <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    {car.vote || 0} votes
                                    </span>
                                    </div>
                                    <button
                                        onClick={() => handleWhatsAppReservation(
                                            car.name,
                                            car.id,
                                            addCustomer,
                                            addReservation
                                        )}
                                        className={`w-full py-1.5 sm:py-3 text-xs sm:text-base ${car.available ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-lg sm:rounded-xl transition-colors flex items-center justify-center space-x-1 sm:space-x-2 font-medium`}
                                        disabled={!car.available}
                                    >
                                        <Car className="w-3 h-3 sm:w-5 sm:h-5" />
                                        <span>{car.available ? 'Réserver' : 'Non disponible'}</span>
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
                            onClick={() => handleBrandSelect('tous')}
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

    const Testimonials = () => {
    const { testimonials = [], addTestimonial, settings } = useData();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddTestimonial = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Ajouter un témoignage',
            html:
                '<input id="swal-name" class="swal2-input" placeholder="Votre nom" required>' +
                '<input id="swal-role" class="swal2-input" placeholder="Votre rôle (ex: Client)" required>' +
                '<textarea id="swal-content" class="swal2-textarea" placeholder="Votre témoignage" required></textarea>' +
                '<input id="swal-rating" type="number" min="1" max="5" class="swal2-input" placeholder="Note (1-5)" required>',
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-name').value;
                const role = document.getElementById('swal-role').value;
                const content = document.getElementById('swal-content').value;
                const rating = parseInt(document.getElementById('swal-rating').value);
                if (!name || !role || !content || !rating || rating < 1 || rating > 5) {
                    Swal.showValidationMessage('Tous les champs sont requis et la note doit être entre 1 et 5');
                    return false;
                }
                return { name, role, content, rating };
            },
            showCancelButton: true,
            confirmButtonText: 'Soumettre',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#10B981',
            cancelButtonColor: '#EF4444',
        });

        if (!formValues) return;

        setIsSubmitting(true);
        try {
            await addTestimonial(formValues);
            Swal.fire({
                icon: 'success',
                title: 'Témoignage ajouté !',
                text: 'Merci pour votre contribution.',
                confirmButtonColor: '#10B981',
            });
        } catch (error) {
            console.error('Error adding testimonial:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de l’ajout du témoignage.',
                confirmButtonColor: '#EF4444',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    console.log('Testimonials in Main:', testimonials); // Debug log

    return (
        <section id="testimonials" className="py-16 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
                        Ce que disent nos clients
                    </h2>
                    <motion.button
                        onClick={handleAddTestimonial}
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg text-white font-medium ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                        {isSubmitting ? 'Envoi...' : 'Ajouter un témoignage'}
                    </motion.button>
                </div>
                {testimonials.length > 0 ? (
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
                                    {testimonial.content.replace('Test Drive', settings.siteName || 'Test Drive')}
                                </p>
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < testimonial.rating
                                                    ? 'text-yellow-400 dark:text-yellow-300 fill-current'
                                                    : 'text-gray-300 dark:text-gray-600'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Aucun témoignage disponible pour le moment. Soyez le premier à partager votre expérience !
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

    const Contact = () => (
        <section id="contact" className="py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold">Nous trouver</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Venez nous rencontrer dans notre agence
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-yellow-500" />
                                </div>
                                <span>+{settings.phone}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                </div>
                                <span>{settings.contactEmail}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-green-500" />
                                </div>
                                <span>{settings.adress}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
                        <iframe
                            title="Localisation"
                            src={settings.gps}
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
                        <img src={Logo} alt={settings.siteName} className="h-12 w-auto" onClick={handleLogoClick} />
                        <p className="text-sm text-gray-400">
                            Location de voitures avec un service d'exception
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
                            <a href={`https://wa.me/${settings.phone}`} className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center hover:bg-green-500/30 transition-colors">
                                <FaWhatsapp className="w-5 h-5 text-green-400" />
                            </a>
                            <a href={`mailto:${settings.contactEmail}`} className="w-10 h-10 bg-gray-500/20 rounded-full flex items-center justify-center hover:bg-gray-500/30 transition-colors">
                                <Mail className="w-5 h-5 text-white-400" />
                            </a>
                            <a href={settings.facebook} className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors">
                                <FaFacebook className="w-5 h-5 text-white-400" />
                            </a>
                            <a href={settings.instagram} className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center hover:bg-red-500/30 transition-colors">
                                <FaInstagram className="w-5 h-5 text-red-400" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} {settings.siteName}. Tous droits réservés.
                </div>
            </div>
        </footer>
    );

    const FloatingWhatsAppButton = () => (
        <motion.a
            href={`https://wa.me/${settings.phone}`}
            target="_blank"
            className="fixed bottom-8 right-8 p-4 bg-green-500 text-white rounded-full shadow-xl hover:bg-green-600 transition-colors z-40"
            whileHover={{ scale: 1.1 }}
        >
            <FaWhatsapp className="w-6 h-6" />
        </motion.a>
    );

    if (settings.maintenanceMode === 1 || settings.maintenanceMode === true) {
      return (
          <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
              <div className="text-center p-6">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                      {settings.siteName} est en maintenance
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Nous travaillons à améliorer votre expérience. Veuillez revenir plus tard.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                      Pour toute question, contactez-nous à <a href={`mailto:${settings.contactEmail}`} className="underline">{settings.contactEmail}</a>
                  </p>
              </div>
          </div>
      );
    }

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

export default Main;