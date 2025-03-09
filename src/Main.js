import React, { useState, useEffect, memo, useRef } from 'react';
import "./App.css";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTimes, FaBars, FaChevronDown } from "react-icons/fa";
import { 
  Car, Sun, Moon, Clock, Settings, Star, Phone, Mail, MapPin, CheckCircle,
  ChevronLeft, ChevronRight, User, Quote, ThumbsUp, Sparkles, CreditCard,
  PhoneCall, Shield, Repeat, Bolt, Fuel, Bold,MessageCircle, Check, ArrowRight, MessageSquare, PlusCircle
} from 'lucide-react';
import Swal from 'sweetalert2';
import Logo from './assets/YlhCar.png';
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

// Default cars array
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
        transmission: "Automatique",
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
        transmission: "Manuelle",
        category: "Économique",
        description: "Une citadine agile et moderne",
        images: [RenaultLogo, RenaultLogo, RenaultLogo]
    },
    {
        id: 3,
        name: "Volkswagen Touareg R Full Option",
        brand: "volkswagen",
        price: 950,
        type: "SUV",
        fuel: "Essence",
        power: "510 ch",
        acceleration: "3.4s",
        consumption: "12.3L/100km",
        transmission: "Automatique",
        category: "Luxe",
        description: "Un SUV de luxe puissant",
        images: [VolswagenLogo, VolswagenLogo, VolswagenLogo]
    },
];

const Main = () => {
    const { cars: fleetCarsFromContext, settings, addCustomer, addReservation } = useData();
    const [darkMode, setDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        setClickCount(prev => {
            if (prev + 1 >= 5) {
                navigate('/admin');
                return 0;
            }
            return prev + 1;
        });
    };

    const handleWhatsAppReservation = async (carName, carId, addCustomer, addReservation) => {
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const { value: formValues } = await Swal.fire({
            title: 'Réservez votre voiture',
            html: `
                <style>
                    .form-container {
                        width: 100%;
                        margin: 0 auto;
                        padding: 0;
                    }
                    .form-group {
                        margin-bottom: 16px;
                    }
                    .swal2-input, .swal2-select {
                        height: 40px;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 8px 12px !important;
                        font-size: 15px !important;
                        border-radius: 8px !important;
                        border: 1px solid #ddd !important;
                        box-shadow: none !important;
                        box-sizing: border-box !important;
                    }
                    .input-label {
                        display: block;
                        margin-bottom: 5px;
                        font-size: 14px;
                        font-weight: 500;
                        color: #555;
                    }
                    @media (min-width: 768px) {
                        .form-container {
                            max-width: 450px;
                            padding: 0 10px;
                        }
                        .swal2-popup {
                            width: auto !important;
                            min-width: 500px !important;
                            padding: 1.5em !important;
                        }
                        .swal2-title {
                            font-size: 24px !important;
                        }
                        .swal2-input, .swal2-select {
                            font-size: 16px !important;
                        }
                        .input-label {
                            font-size: 15px;
                        }
                    }
                    @media (max-width: 767px) {
                        .form-container {
                            max-width: 100%;
                            padding: 0 5px;
                        }
                        .swal2-popup {
                            padding: 0.8em !important;
                            width: 90% !important;
                            max-width: 350px !important;
                        }
                        .swal2-title {
                            font-size: 18px !important;
                            padding: 10px 0 !important;
                        }
                        .swal2-actions {
                            margin-top: 10px !important;
                        }
                    }
                </style>
                <div class="form-container">
                    <div class="form-group">
                        <input id="swal-input1" class="swal2-input" placeholder="Votre nom" required>
                    </div>
                    <div class="form-group">
                        <input id="swal-input2" class="swal2-input" type="tel" placeholder="Votre téléphone" required>
                    </div>
                    <div class="form-group">
                        <label class="input-label" for="start-date">Date de début:</label>
                        <input id="start-date" type="date" class="swal2-input" value="${today}" min="${today}" required>
                    </div>
                    <div class="form-group">
                        <label class="input-label" for="end-date">Date de fin:</label>
                        <input id="end-date" type="date" class="swal2-input" value="${tomorrow}" min="${tomorrow}" required>
                    </div>
                </div>
            `,
            focusConfirm: false,
            customClass: {
                container: 'custom-swal-container',
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                confirmButton: 'custom-swal-confirm',
                cancelButton: 'custom-swal-cancel'
            },
            preConfirm: () => {
                const customerName = document.getElementById('swal-input1').value;
                const customerPhone = document.getElementById('swal-input2').value;
                const startDate = document.getElementById('start-date').value;
                const endDate = document.getElementById('end-date').value;
                
                if (!customerName || !customerPhone) {
                    Swal.showValidationMessage('Veuillez remplir tous les champs');
                    return false;
                }
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
            confirmButtonColor: '#312783',
            cancelButtonColor: '#EF4444',
            backdrop: true,
            allowOutsideClick: () => !Swal.isLoading()
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
            
            const isMobile = window.innerWidth < 768;
            Swal.fire({
                icon: 'success',
                title: 'Réservation initiée !',
                text: 'Votre demande a été envoyée via WhatsApp.',
                confirmButtonColor: '#312783',
                width: isMobile ? 'auto' : '450px',
                padding: isMobile ? '1em' : '1.5em'
            });
        } catch (error) {
            console.error('Error creating reservation:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la réservation.',
                confirmButtonColor: '#EF4444',
                width: window.innerWidth < 768 ? 'auto' : '450px',
                padding: window.innerWidth < 768 ? '1em' : '1.5em'
            });
        }
    };

    const getUniqueBrandCars = (cars) => {
        const uniqueBrands = new Set();
        const selectedCars = [];
        
        for (const car of cars) {
            if (!uniqueBrands.has(car.brand) && selectedCars.length < 3) {
                uniqueBrands.add(car.brand);
                selectedCars.push(car);
            }
            if (selectedCars.length === 3) break;
        }
        
        if (selectedCars.length < 3) {
            const remainingCars = cars.filter(car => !selectedCars.includes(car));
            selectedCars.push(...remainingCars.slice(0, 3 - selectedCars.length));
        }
        
        return selectedCars;
    };

    const Header = memo(() => {
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
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#0061ff]/10 to-[#0061ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
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
                                    <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#5a4bbd] to-[#0061ff] w-0 group-hover:w-full transition-all duration-300" />
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
    });

    const Hero = memo(() => {
        const { cars: fleetCarsFromContext, settings, addCustomer, addReservation } = useData();
        const [currentCarIndex, setCurrentCarIndex] = useState(0);
        const [autoScroll, setAutoScroll] = useState(true);

        const fleetCars = fleetCarsFromContext.length > 0 ? fleetCarsFromContext : cars;
        const heroDisplayCars = getUniqueBrandCars(fleetCars);

        useEffect(() => {
            let interval;
            if (autoScroll) {
                interval = setInterval(() => {
                    setCurrentCarIndex((prev) => (prev + 1) % heroDisplayCars.length);
                }, 5000);
            }
            return () => clearInterval(interval);
        }, [autoScroll, heroDisplayCars.length]);

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
            if (car.image_url) return car.image_url;
            const brand = car.brand?.toLowerCase();
            const imageMap = {
                'dacia': Dacia,
                'renault': Clio,
                'volkswagen': Touarg
            };
            return imageMap[brand] || Dacia;
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
                                <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
                                    <motion.div 
                                        className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#5a4bbd]/20 to-[#312783]/20 px-4 py-2 md:px-5 md:py-3 rounded-full backdrop-blur-sm"
                                        {...fadeInUp}
                                    >
                                        <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#0061ff]" />
                                        <span className="text-xs md:text-sm font-medium text-[#0061ff] dark:text-gray-200">
                                            {heroDisplayCars[currentCarIndex]?.available ? 'Disponible maintenant' : 'Réservation possible'}
                                        </span>
                                    </motion.div>
                                </div>
                                <motion.h1 
                                    className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-800 dark:from-gray-100 to-[#312783] bg-clip-text text-transparent"
                                    {...fadeInUp}
                                    transition={{ delay: 0.1 }}
                                >
                                    {heroDisplayCars[currentCarIndex]?.name || 'Véhicule de luxe'}
                                    <span className="block mt-2 md:mt-4 text-base md:text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-300">
                                        {heroDisplayCars[currentCarIndex]?.description || 'Une expérience de conduite exceptionnelle'}
                                    </span>
                                </motion.h1>
                                <motion.div 
                                    className="grid grid-cols-2 gap-3 md:gap-4"
                                    transition={{ delay: 0.2 }}
                                >
                                    {[
                                        { icon: <Bolt />, label: 'Puissance', value: heroDisplayCars[currentCarIndex]?.puissance || 'N/A' },
                                        { icon: <Clock />, label: '0-100 km/h', value: heroDisplayCars[currentCarIndex]?.acceleration || 'N/A' },
                                        { icon: <Fuel />, label: 'Consommation', value: heroDisplayCars[currentCarIndex]?.consumption || 'N/A' },
                                        { icon: <Repeat />, label: 'Transmission', value: heroDisplayCars[currentCarIndex]?.transmission || 'N/A' }
                                    ].map((spec, i) => (
                                        <div 
                                            key={i}
                                            className={`p-3 md:p-4 rounded-xl ${darkMode ? 'bg-gray-850' : 'bg-white'} shadow-md border border-gray-100 dark:border-gray-700`}
                                        >
                                            <div className="flex items-center space-x-2 text-[#0061ff] mb-2">
                                                {spec.icon}
                                                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                                                    {spec.label}
                                                </span>
                                            </div>
                                            <div className="text-base md:text-lg font-bold dark:text-white">
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
                                    onClick={() => handleWhatsAppReservation(heroDisplayCars[currentCarIndex]?.name,
                                        heroDisplayCars[currentCarIndex]?.id,
                                        addCustomer,
                                        addReservation)}
                                    className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#002D72] to-[#003399] text-white rounded-lg text-sm md:text-base font-medium hover:shadow-lg transition-all"
                                >
                                    Réserver maintenant →
                                </button>
                                <div className="flex items-center justify-center space-x-2 px-4 py-3 md:px-6 md:py-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-850 border-gray-200 dark:border-gray-700">
                                    <span className="text-xs md:text-sm dark:text-gray-400">À partir de</span>
                                    <span className="text-xl md:text-2xl font-bold text-[#002D72] dark:text-[#0061ff]">
                                        {heroDisplayCars[currentCarIndex]?.price || '---'}DH
                                    </span>
                                    <span className="text-xs md:text-sm dark:text-gray-400">/jour</span>
                                </div>
                            </motion.div>
                        </div>
                            <div className="relative group order-1 lg:order-2 mb-8">
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
                                <div className="absolute -bottom-28 md:-bottom-32 left-1/2 transform -translate-x-1/2 w-full flex justify-center mb-12 mt-8">
                                    <div className="flex space-x-3 md:space-x-4 py-4 px-2 overflow-x-auto overflow-y-visible">
                                        {heroDisplayCars.map((car, index) => (
                                            <motion.button
                                                key={car.id || index}
                                                onClick={() => {
                                                    setAutoScroll(false);
                                                    setCurrentCarIndex(index);
                                                }}
                                                whileHover={{ scale: 1.1 }}
                                                className={`min-w-[70px] md:min-w-[90px] h-[70px] md:h-[90px] rounded-xl flex items-center justify-center shadow-lg transition-all ${currentCarIndex === index ? 'ring-2 md:ring-4 ring-[#0061ff] scale-110' : 'opacity-70 hover:opacity-100'} ${darkMode ? 'bg-white/50' : 'bg-white'}`}
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
    }, (prevProps, nextProps) => prevProps.fleetCarsFromContext === nextProps.fleetCarsFromContext);

    const Fleet = memo(() => {
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
            dacia: 'dacia',
            renault: 'renault',
            tesla: 'tesla',
            volkswagen: 'volkswagen',
            ford: 'ford',
            kia: 'kia',
            bmw: 'bmw',
            peugeot: 'peugeot',
            mercedes: 'mercedes',
            citroen: 'citroen',
            audi: 'audi',
            fiat: 'fiat',
            opel: 'opel',
            skoda: 'skoda',
            seat: 'seat',
            toyota: 'toyota',
            nissan: 'nissan',
            honda: 'honda',
            mitsubishi: 'mitsubishi',
            suzuki: 'suzuki',
            chevrolet: 'chevrolet',
            dfsk: 'dfsk',
        };

        const correctedFleetCars = Array.isArray(fleetCars)
            ? fleetCars.map((car) => ({
                ...car,
                brand: brandCorrections[car.brand.toLowerCase()] || car.brand.toLowerCase(),
            }))
            : [];

        const brands = ['tous', ...new Set(correctedFleetCars.map((car) => car.brand))];

        const handleBrandSelect = (brand) => setSelectedBrand(brand.toLowerCase());

        useEffect(() => {
            localStorage.setItem('selectedBrand', selectedBrand);
            localStorage.setItem('userVotes', JSON.stringify(userVotes));
        }, [selectedBrand, userVotes]);

        const handleStarClick = async (carId) => {
            if (!userVotes[carId]) {
                setUserVotes((prev) => ({ ...prev, [carId]: true }));
                try {
                    const car = correctedFleetCars.find((c) => c.id === carId);
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
                    formData.append('transmission', car.transmission || '');
                    formData.append('vote', updatedVoteCount);
                    await updateCar(carId, formData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Vote enregistré !',
                        text: 'Merci pour votre vote.',
                        confirmButtonColor: '#0061ff',
                    });
                } catch (error) {
                    console.error('Error updating vote:', error);
                    setUserVotes((prev) => ({ ...prev, [carId]: false }));
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
        const filteredCars = correctedFleetCars.filter(
            (car) => selectedBrand === 'tous' || car.brand === selectedBrand
        );

        const logoMap = {
            tous: Logo,
            dacia: DaciaLogo,
            renault: RenaultLogo,
            tesla: TeslaLogo,
            volkswagen: VolswagenLogo,
            ford: FordLogo,
            kia: KiaLogo,
            bmw: BmwLogo,
            peugeot: PeugeotLogo,
            mercedes: MercedesLogo,
            citroen: CitroenLogo,
            audi: AudiLogo,
            fiat: FiatLogo,
            opel: OpelLogo,
            skoda: SkodaLogo,
            seat: SeatLogo,
            toyota: ToyotaLogo,
            nissan: NissanLogo,
            honda: HondaLogo,
            mitsubishi: MitsubishiLogo,
            suzuki: SuzukiLogo,
            chevrolet: ChevroletLogo,
            dfsk: DfskLogo,
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
                                className={`flex-shrink-0 flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-xl transition-all ${
                                    selectedBrand === brand
                                        ? 'bg-white dark:bg-gray shadow-lg border-2 border-[#0061ff]'
                                        : 'bg-white/50 dark:bg-gray hover:bg-gray dark:hover:bg-gray border-2 border-transparent'
                                }`}
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
                    {Array.isArray(filteredCars) && filteredCars.length > 0 ? (
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
                                                src={car.image_url}
                                                alt={car.name}
                                                className="w-full h-full object-contain"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ) : (
                                            <img
                                                src={
                                                    car.brand === 'dacia' ? Dacia :
                                                    car.brand === 'renault' ? Clio :
                                                    car.brand === 'volkswagen' ? Touarg : Dacia
                                                }
                                                alt={car.name}
                                                className="w-full h-full object-contain"
                                            />
                                        )}
                                        <div className="absolute top-1 sm:top-4 right-1 sm:right-4 bg-[#0061ff] text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
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
                                            <h3 className="text-sm sm:text-xl font-bold text-gray-800 dark:text-gray-200 line-clamp-1">
                                                {car.name}
                                            </h3>
                                            <div
                                                className={`${
                                                    car.available
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                                } px-1.5 py-0.5 rounded text-xs flex items-center space-x-1`}
                                            >
                                                <span
                                                    className={`inline-block w-2 h-2 rounded-full ${
                                                        car.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                                                    }`}
                                                ></span>
                                                <span>{car.available ? 'Disponible' : 'Réservée'}</span>
                                            </div>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                                            {car.description || 'Pas de description'}
                                        </p>
                                        <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-2 sm:mb-4">
                                            <div className="flex items-center">
                                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500 dark:text-gray-400" />
                                                <span className="text-xs sm:text-sm dark:text-white">{car.acceleration || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Fuel className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500 dark:text-gray-400" />
                                                <span className="text-xs sm:text-sm dark:text-white">{car.consumption || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Bold className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500 dark:text-gray-400" />
                                                <span className="text-xs sm:text-sm dark:text-white">{car.puissance || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Repeat className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500 dark:text-gray-400" />
                                                <span className="text-xs sm:text-sm dark:text-white">{car.transmission || 'N/A'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center mb-2 sm:mb-4">
                                            <button
                                                onClick={() => handleStarClick(car.id)}
                                                disabled={hasUserVoted(car.id)}
                                                className={`transition-all ${hasUserVoted(car.id) ? 'opacity-75 cursor-not-allowed' : 'hover:scale-110'}`}
                                            >
                                                <Star
                                                    className="w-4 h-4 sm:w-6 sm:h-6 dark:text-white"
                                                    fill={hasUserVoted(car.id) ? 'gold' : 'none'}
                                                    stroke="currentColor"
                                                />
                                            </button>
                                            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                                {car.vote || 0} votes
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleWhatsAppReservation(car.name, car.id, addCustomer, addReservation)}
                                            className={`w-full py-1.5 sm:py-3 text-xs sm:text-base ${
                                                car.available ? 'bg-[#6171fe] hover:bg-[#1e163d]' : 'bg-gray-400 cursor-not-allowed'
                                            } text-white rounded-lg sm:rounded-xl transition-colors flex items-center justify-center space-x-1 sm:space-x-2 font-medium`}
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
                                className="mt-3 sm:mt-4 px-4 sm:px-5 py-2 text-sm sm:text-base bg-[#312783] hover:bg-[#1e163d] text-white rounded-lg transition-colors"
                            >
                                Voir toutes les voitures
                            </button>
                        </div>
                    )}
                </div>
            </section>
        );
    });



const Features = memo(() => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const [isMobile, setIsMobile] = useState(false);


    // Vérifier si l'écran est en mode mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Autoplay pour le carrousel mobile
    useEffect(() => {
        let interval;
        
        if (isAutoplay && isMobile) {
            interval = setInterval(() => {
                setActiveSlide(prev => (prev + 1) % featureData.length);
            }, 5000);
        }
        
        return () => clearInterval(interval);
    }, [isAutoplay, isMobile]);

    const featureData = [
        { 
            icon: <Car className="w-6 h-6" />, 
            emoji: "🚗", 
            title: "Livraison Gratuite", 
            content: "Livraison et récupération à l'adresse de votre choix, sans frais supplémentaires dans un rayon de 50km.", 
            color: "from-red-500 to-orange-500" 
        },
        { 
            icon: <Shield className="w-6 h-6" />, 
            emoji: "🛡️", 
            title: "Assurance Premium", 
            content: "Couverture tous risques incluse dans chaque location avec assistance 24/7 et 0€ de franchise.", 
            color: "from-blue-400 to-cyan-500" 
        },
        { 
            icon: <PhoneCall className="w-6 h-6" />, 
            emoji: "📱", 
            title: "Service Client 24/7", 
            content: "Une équipe multilingue à votre disposition à tout moment pour répondre à toutes vos questions.", 
            color: "from-yellow-400 to-amber-500" 
        },
        { 
            icon: <Settings className="w-6 h-6" />, 
            emoji: "⚙️", 
            title: "Entretien Premium", 
            content: "Tous nos véhicules bénéficient d'un entretien régulier et sont vérifiés après chaque location.", 
            color: "from-[#5a4bbd] to-[#312783]" 
        },
        { 
            icon: <CreditCard className="w-6 h-6" />, 
            emoji: "💳", 
            title: "Paiement Flexible", 
            content: "Multiples options de paiement adaptées à vos besoins, avec possibilité d'échelonnement sans frais.", 
            color: "from-purple-400 to-indigo-500" 
        },
        { 
            icon: <Clock className="w-6 h-6" />, 
            emoji: "⏱️", 
            title: "Réservation Express", 
            content: "Processus de réservation simplifié, validation instantanée et modification gratuite jusqu'à 48h avant.", 
            color: "from-pink-400 to-rose-500" 
        }
    ];

    const containerVariants = { 
        hidden: { opacity: 0 }, 
        visible: { 
            opacity: 1, 
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            } 
        } 
    };
    
    const itemVariants = { 
        hidden: { y: 30, opacity: 0 }, 
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { 
                duration: 0.6, 
                ease: [0.25, 0.1, 0.25, 1.0] 
            } 
        } 
    };

    const handleSlideChange = (index) => {
        setActiveSlide(index);
        setIsAutoplay(false);
        // Réactive l'autoplay après 8 secondes d'inactivité
        setTimeout(() => setIsAutoplay(true), 8000);
    };

    return (
        <section id="features" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-tr from-gray-50 via-white to-[#AFDBF5] dark:from-gray-900 dark:to-gray-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Éléments de fond décoratifs */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#AFDBF5] dark:bg-amber-700 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#AFDBF5] dark:bg-[#AFDBF5] rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
                
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-16 relative z-10"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mb-4"
                    >
                        <span className="inline-block py-1 px-3 rounded-full text-xs font-semibold tracking-wider text-amber-800 bg-amber-100 dark:bg-amber-900 dark:text-amber-200">
                            PREMIUM SERVICE
                        </span>
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100 leading-tight">
                        Nos Avantages <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Exclusifs</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                        Découvrez pourquoi notre service de location est le choix privilégié des voyageurs exigeants
                    </p>
                </motion.div>

                {/* Version Mobile: Carousel amélioré */}
                <div className="lg:hidden relative">
                    <div className="overflow-hidden rounded-xl">
                        <div 
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                        >
                            {featureData.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="w-full flex-shrink-0 p-1"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        className="h-full p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col"
                                    >
                                        <div className={`mb-5 self-start inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                                            <div className="text-white">{feature.icon}</div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {feature.content}
                                        </p>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Contrôles de navigation */}
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <button 
                            onClick={() => handleSlideChange((activeSlide - 1 + featureData.length) % featureData.length)}
                            className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                            aria-label="Slide précédent"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        
                        <div className="flex space-x-2">
                            {featureData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSlideChange(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                        activeSlide === index 
                                        ? 'bg-[#0061ff] w-6' 
                                        : 'bg-gray-300 dark:bg-gray-700'
                                    }`}
                                    aria-label={`Aller à la diapositive ${index + 1}`}
                                />
                            ))}
                        </div>
                        
                        <button 
                            onClick={() => handleSlideChange((activeSlide + 1) % featureData.length)}
                            className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                            aria-label="Slide suivant"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Version Desktop: Grille améliorée */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10"
                >
                    {featureData.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ 
                                y: -8, 
                                scale: 1.02,
                                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                                transition: { duration: 0.3 }
                            }}
                            className="group p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:shadow-gray-900/30 dark:hover:shadow-gray-800/40 border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70"
                        >
                            <div className={`mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                <div className="text-white">{feature.icon}</div>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{feature.content}</p>
                            
                            <div className="mt-6 h-0.5 w-16 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-left"></div>
                        </motion.div>
                    ))}
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center relative z-10"
                >
                    <a 
                        href="#fleet" 
                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-[#312783] to-[#0061ff] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 group"
                    >
                        <span>Découvrir notre flotte</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                    
                    <div className="mt-8">
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            Plus de 10 000 clients satisfaits • Note moyenne de 4.9/5
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});



    const Testimonials = memo(() => {
        const { testimonials = [], addTestimonial, settings } = useData();
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [itemsPerPage, setItemsPerPage] = useState(3);
        const [filteredRating, setFilteredRating] = useState(0);
        const [isHovered, setIsHovered] = useState(null);
        const containerRef = useRef(null);
    
        useEffect(() => {
            const handleResize = () => {
                if (window.innerWidth < 640) setItemsPerPage(1);
                else if (window.innerWidth < 1024) setItemsPerPage(2);
                else setItemsPerPage(3);
            };
            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
    
        const filteredTestimonials = testimonials.filter(
            testimonial => filteredRating === 0 || testimonial.rating === filteredRating
        );
        const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentTestimonials = filteredTestimonials.slice(indexOfFirstItem, indexOfLastItem);
    
        const handlePageChange = (newPage) => {
            setCurrentPage(newPage);
            containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
    
        const handleAddTestimonial = async () => {
            const { value: formValues } = await Swal.fire({
                title: 'Partagez votre expérience',
                html: `
                    <style>
                        .form-container { width: 100%; margin: 0 auto; padding: 0; }
                        .form-group { margin-bottom: 16px; }
                        .swal2-input, .swal2-textarea, .swal2-select { 
                            width: 100% !important; 
                            margin: 0 !important; 
                            padding: 12px 16px !important; 
                            font-size: 15px !important; 
                            border-radius: 12px !important; 
                            border: 1px solid #ddd !important; 
                            box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important;
                            box-sizing: border-box !important;
                            transition: all 0.2s ease !important;
                        }
                        .swal2-input:focus, .swal2-textarea:focus { 
                            border-color: #10B981 !important; 
                            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2) !important; 
                        }
                        .swal2-input { height: 48px; }
                        .swal2-textarea { min-height: 110px; resize: vertical; }
                        .input-label { 
                            display: block; 
                            margin-bottom: 8px; 
                            font-size: 14px; 
                            font-weight: 600; 
                            color: #4B5563; 
                        }
                        .rating-selector {
                            display: flex;
                            flex-direction: row-reverse;
                            justify-content: flex-end;
                            gap: 8px;
                        }
                        .rating-selector input {
                            display: none;
                        }
                        .rating-selector label {
                            cursor: pointer;
                            width: 30px;
                            height: 30px;
                            background-color: #f3f4f6;
                            border-radius: 4px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #9ca3af;
                            font-weight: bold;
                            transition: all 0.2s ease;
                        }
                        .rating-selector label:hover, 
                        .rating-selector label:hover ~ label,
                        .rating-selector input:checked ~ label {
                            background-color: #FBBF24;
                            color: white;
                        }
                        @media (min-width: 768px) {
                            .form-container { max-width: 480px; padding: 0 10px; }
                            .swal2-popup { width: auto !important; min-width: 540px !important; padding: 2em !important; border-radius: 16px !important; }
                            .swal2-title { font-size: 26px !important; margin-bottom: 20px !important; }
                            .swal2-input, .swal2-textarea, .swal2-select { font-size: 16px !important; }
                            .input-label { font-size: 15px; }
                            .swal2-textarea { min-height: 140px; }
                        }
                        @media (max-width: 767px) {
                            .form-container { max-width: 100%; padding: 0 5px; }
                            .swal2-popup { padding: 1.2em !important; width: 90% !important; max-width: 400px !important; border-radius: 16px !important; }
                            .swal2-title { font-size: 20px !important; padding: 10px 0 !important; }
                            .swal2-actions { margin-top: 16px !important; }
                        }
                    </style>
                    <div class="form-container">
                        <div class="form-group">
                            <label class="input-label" for="swal-name">Nom:</label>
                            <input id="swal-name" class="swal2-input" placeholder="Votre nom" required>
                        </div>
                        <div class="form-group">
                            <label class="input-label" for="swal-role">Rôle:</label>
                            <input id="swal-role" class="swal2-input" placeholder="ex: Client, Partenaire, etc." required>
                        </div>
                        <div class="form-group">
                            <label class="input-label" for="swal-content">Votre témoignage:</label>
                            <textarea id="swal-content" class="swal2-textarea" placeholder="Partagez votre expérience avec nous..." required></textarea>
                        </div>
                        <div class="form-group">
                            <label class="input-label">Votre évaluation:</label>
                            <div class="rating-selector">
                                <input type="radio" id="star5" name="rating" value="5" checked />
                                <label for="star5">5</label>
                                <input type="radio" id="star4" name="rating" value="4" />
                                <label for="star4">4</label>
                                <input type="radio" id="star3" name="rating" value="3" />
                                <label for="star3">3</label>
                                <input type="radio" id="star2" name="rating" value="2" />
                                <label for="star2">2</label>
                                <input type="radio" id="star1" name="rating" value="1" />
                                <label for="star1">1</label>
                            </div>
                        </div>
                    </div>
                `,
                focusConfirm: false,
                customClass: { 
                    container: 'custom-swal-container', 
                    popup: 'custom-swal-popup', 
                    title: 'custom-swal-title', 
                    confirmButton: 'custom-swal-confirm', 
                    cancelButton: 'custom-swal-cancel'
                },
                preConfirm: () => {
                    const name = document.getElementById('swal-name').value;
                    const role = document.getElementById('swal-role').value;
                    const content = document.getElementById('swal-content').value;
                    const rating = parseInt(document.querySelector('input[name="rating"]:checked').value);
                    
                    if (!name || !role || !content) {
                        Swal.showValidationMessage('Veuillez remplir tous les champs requis');
                        return false;
                    }
                    return { name, role, content, rating };
                },
                showCancelButton: true,
                confirmButtonText: 'Soumettre',
                cancelButtonText: 'Annuler',
                confirmButtonColor: '#312783',
                cancelButtonColor: '#6B7280',
                buttonsStyling: true,
                backdrop: true,
                allowOutsideClick: () => !Swal.isLoading()
            });
    
            if (!formValues) return;
    
            setIsSubmitting(true);
            try {
                await addTestimonial(formValues);
                const isMobile = window.innerWidth < 768;
                Swal.fire({
                    icon: 'success',
                    title: 'Merci pour votre témoignage !',
                    text: 'Votre contribution a été ajoutée avec succès.',
                    confirmButtonColor: '#312783',
                    width: isMobile ? 'auto' : '450px',
                    padding: isMobile ? '1.2em' : '2em',
                    customClass: {
                        popup: 'animate__animated animate__fadeInUp'
                    }
                });
            } catch (error) {
                console.error('Error adding testimonial:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Une erreur est survenue',
                    text: 'Nous n\'avons pas pu ajouter votre témoignage. Veuillez réessayer plus tard.',
                    confirmButtonColor: '#EF4444',
                    width: window.innerWidth < 768 ? 'auto' : '450px',
                    padding: window.innerWidth < 768 ? '1.2em' : '2em'
                });
            } finally {
                setIsSubmitting(false);
            }
        };
    
        // Star rating component with hover effect
        const StarRating = ({ rating }) => {
            return (
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="relative">
                            <Star
                                className={`w-5 h-5 ${
                                    i < rating 
                                        ? 'text-yellow-400' 
                                        : 'text-gray-200 dark:text-gray-700'
                                }`}
                                fill={i < rating ? "currentColor" : "none"}
                                strokeWidth={1.5}
                            />
                        </div>
                    ))}
                </div>
            );
        };
    
        return (
            <section 
                id="testimonials" 
                ref={containerRef} 
                className="py-20 bg-gradient-to-br from-[#AFDBF5] via-white to-gray-50 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                            Ce que nos clients disent
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Découvrez les expériences de nos clients et partagez la vôtre
                        </p>
                    </div>
    
                    <div className="hidden sm:flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
                    <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">
                        <span className="pl-3 text-sm font-medium text-gray-700 dark:text-gray-300">Filtrer :</span>
                        <div className="flex space-x-1">
                            {[0, 5, 4, 3, 2, 1].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => { 
                                        setFilteredRating(rating); 
                                        setCurrentPage(1); 
                                    }}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                        filteredRating === rating
                                            ? 'bg-[#0061ff] text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {rating === 0 ? 'Tous' : `${rating} ★`}
                                </button>
                            ))}
                        </div>
                    </div>
                    <motion.button
                        onClick={handleAddTestimonial}
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-5 py-3 rounded-full text-white font-medium flex items-center space-x-2 shadow-md transition-all ${
                            isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-[#312783] to-[#0061ff]  hover:shadow-lg'
                        }`}
                    >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                                    <span>Envoi en cours...</span>
                                </>
                            ) : (
                                <>
                                    <MessageCircle className="w-4 h-4" />
                                    <span>Ajouter un témoignage</span>
                                </>
                            )}
                        </motion.button>
                    </div>

                    <div className="sm:hidden mb-10 text-center">
                    <motion.button
                        onClick={handleAddTestimonial}
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-5 py-3 rounded-full text-white font-medium flex items-center space-x-2 shadow-md transition-all mx-auto ${
                            isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-[#312783] to-[#0061ff]  hover:shadow-lg'
                        }`}
                    >{isSubmitting ? (
                        <>
                            <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                            <span>Envoi en cours...</span>
                        </>
                    ) : (
                        <>
                            <MessageCircle className="w-4 h-4" />
                            <span>Ajouter un témoignage</span>
                        </>
                    )}</motion.button>
                    </div> 
    
                    {filteredTestimonials.length > 0 ? (
                        <>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentPage}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {currentTestimonials.map((testimonial, index) => (
                                        <motion.div
                                            key={testimonial.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ 
                                                opacity: 1, 
                                                y: 0,
                                                transition: { delay: index * 0.1, duration: 0.4 }
                                            }}
                                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                            onMouseEnter={() => setIsHovered(testimonial.id)}
                                            onMouseLeave={() => setIsHovered(null)}
                                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden h-full flex flex-col relative group"
                                        >
                                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5a4bbd] to-[#312783]"></div>
                                            <div className="p-6 sm:p-8 flex flex-col h-full">
                                                <div className="flex items-start justify-between mb-6">
                                                    <div className="flex">
                                                        <div className="relative">
                                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#5a4bbd] to-[#312783] flex items-center justify-center flex-shrink-0 shadow-md transform rotate-3">
                                                                <span className="text-xl font-bold text-white">
                                                                    {testimonial.name[0]}
                                                                </span>
                                                            </div>
                                                            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full shadow p-1">
                                                                <Check className="w-3 h-3 text-[#0061ff]" />
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <h4 className="font-bold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                                                            <div className="mt-2">
                                                                <StarRating rating={testimonial.rating} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="hidden sm:flex text-gray-400 dark:text-gray-500">
                                                        <Quote className="w-8 h-8 opacity-30" />
                                                    </div>
                                                </div>
                                                <div className="relative flex-grow">
                                                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                                        &ldquo;{testimonial.content.length > 150 
                                                            ? `${testimonial.content.substring(0, 150).replace('Test Drive', settings.siteName || 'Test Drive')}...`
                                                            : testimonial.content.replace('Test Drive', settings.siteName || 'Test Drive')
                                                        }&rdquo;
                                                    </div>
                                                    {testimonial.content.length > 150 && (
                                                        <motion.button 
                                                            className="mt-3 text-[#0061ff] hover:text-[#0061ff] dark:hover:text-[#0061ff] font-medium flex items-center space-x-1"
                                                            whileHover={{ x: 5 }}
                                                            onClick={() => {
                                                                Swal.fire({
                                                                    title: `${testimonial.name}, ${testimonial.role}`,
                                                                    html: `
                                                                        <div class="flex justify-center mb-4">
                                                                            ${[...Array(testimonial.rating)].map(() => 
                                                                                '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-400 inline-block" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"></path></svg>'
                                                                            ).join('')}
                                                                        </div>
                                                                        <p class="text-left">${testimonial.content.replace('Test Drive', settings.siteName || 'Test Drive')}</p>
                                                                    `,
                                                                    confirmButtonColor: '#312783',
                                                                    width: 'auto',
                                                                    customClass: {
                                                                        popup: 'rounded-xl',
                                                                        content: 'text-left'
                                                                    }
                                                                });
                                                            }}
                                                        >
                                                            <span>Lire plus</span>
                                                            <ArrowRight className="w-4 h-4" />
                                                        </motion.button>
                                                    )}
                                                </div>
                                            </div>
                                            <div 
                                                className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-800 opacity-50 pointer-events-none transition-opacity duration-300 ${
                                                    isHovered === testimonial.id ? 'opacity-0' : 'opacity-100'
                                                }`}
                                            ></div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
    
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-12">
                                    <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md p-1">
                                        <button
                                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                                                currentPage === 1
                                                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        
                                        {[...Array(totalPages)].map((_, index) => {
                                            const pageNum = index + 1;
                                            if (
                                                pageNum === 1 || 
                                                pageNum === totalPages || 
                                                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => handlePageChange(pageNum)}
                                                        className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all ${
                                                            currentPage === pageNum
                                                                ? 'bg-[#0061ff] text-white shadow-md'
                                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            } else if (
                                                (pageNum === currentPage - 2 && currentPage > 3) || 
                                                (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                                            ) {
                                                return (
                                                    <span 
                                                        key={pageNum} 
                                                        className="flex items-center justify-center w-6 h-10 text-gray-400"
                                                    >
                                                        ...
                                                    </span>
                                                );
                                            }
                                            return null;
                                        })}
                                        
                                        <button
                                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                                                currentPage === totalPages
                                                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                        >
                            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700">
                                <MessageSquare className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                {filteredRating > 0 
                                    ? `Aucun témoignage avec ${filteredRating} étoiles` 
                                    : 'Aucun témoignage disponible'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                {filteredRating > 0 
                                    ? `Nous n'avons pas encore de témoignages avec ${filteredRating} étoiles. Ajustez le filtre ou ajoutez votre propre expérience !` 
                                    : 'Soyez le premier à partager votre expérience avec nous. Votre avis est précieux !'}
                            </p>
                            <motion.button
                                onClick={handleAddTestimonial}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-6 px-6 py-3 bg-[#312783] hover:bg-[#1e163d] text-white font-medium rounded-lg shadow-md inline-flex items-center space-x-2"
                            >
                                <PlusCircle className="w-4 h-4" />
                                <span>Ajouter un témoignage</span>
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </section>
        );
    });
    

    const Contact = memo(() => {
        const { settings } = useData();
        return (
            <section id="contact" className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-black dark:text-white">Nous trouver</h2>
                            <p className="text-gray-600 dark:text-gray-300">Venez nous rencontrer dans notre agence</p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-[#312783]/10 dark:bg-[#312783]/20 rounded-full flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-yellow-500" />
                                    </div>
                                    <span className='text-black dark:text-white'>+{settings.phone}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-[#312783]/10 dark:bg-[#312783]/20 rounded-full flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-[#0061ff]" />
                                    </div>
                                    <span className='text-black dark:text-white'>{settings.contactEmail}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-[#0061ff]/10 dark:bg-[#0061ff]/20 rounded-full flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-[#312783] dark:text-white" />
                                    </div>
                                    <span className='text-black dark:text-white'>{settings.adress}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
                            <iframe
                                key={settings.gps}
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
    }, (prevProps, nextProps) => prevProps.settings === nextProps.settings);

    const Footer = memo(() => {
        const [clickCount, setClickCount] = useState(0);
        const { settings } = useData();
        const [openSection, setOpenSection] = useState(null);
        const navigate = useNavigate(); // Ajouter useNavigate pour la redirection
      
        const handleClick = () => {
            setClickCount((prevCount) => {
              const newCount = prevCount + 1;
              if (newCount === 5) {
                navigate('/login');
                return 0; // Réinitialiser le compteur à 0 après redirection
              }
              return newCount;
            });
          };
      
        const toggleSection = (section) => setOpenSection(openSection === section ? null : section);
      
        const handleLogoClick = () => {
          // Si vous avez une logique spécifique pour le clic sur le logo, laissez-la ici
          console.log('Logo cliqué');
        };
      
        return (
          <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              {/* Top section with grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                {/* Logo and tagline section */}
                <div className="space-y-4 flex flex-col items-center md:items-start md:text-left text-center">
                  <img
                    src={Logo}
                    alt={settings.siteName}
                    className="h-14 w-auto mb-4 transition-transform hover:scale-105 duration-300 cursor-pointer"
                    onClick={handleLogoClick}
                  />
                  <p className="text-sm text-gray-300 max-w-xs">Location de voitures avec un service d'exception</p>
                </div>
      
                {/* Navigation section */}
                <div className="md:block">
                  <div
                    className="flex justify-between items-center border-b border-gray-700 pb-3 md:border-none md:pb-0 cursor-pointer group"
                    onClick={() => toggleSection('navigation')}
                  >
                    <h4 className="font-bold text-lg text-[#6171fe]">Navigation</h4>
                    <FaChevronDown
                      className="md:hidden transform transition-transform duration-300 text-[#6171fe] group-hover:text-white"
                      style={{ transform: openSection === 'navigation' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </div>
                  <ul
                    className={`${openSection === 'navigation' ? 'max-h-96 mt-4' : 'max-h-0'} md:mt-4 md:max-h-96 overflow-hidden transition-all duration-300 ease-in-out space-y-3 text-sm text-gray-300 md:block`}
                  >
                    <li>
                      <a href="#fleet" className="hover:text-[#0061ff] transition-colors duration-200 inline-block py-1">
                        Notre Flotte
                      </a>
                    </li>
                    <li>
                      <a href="#features" className="hover:text-[#0061ff] transition-colors duration-200 inline-block py-1">
                        Avantages
                      </a>
                    </li>
                    <li>
                      <a href="#contact" className="hover:text-[#0061ff] transition-colors duration-200 inline-block py-1">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
      
                {/* Legal section */}
                <div className="md:block">
                  <div
                    className="flex justify-between items-center border-b border-gray-700 pb-3 md:border-none md:pb-0 cursor-pointer group"
                    onClick={() => toggleSection('legal')}
                  >
                    <h4 className="font-bold text-lg text-[#6171fe]">Légal</h4>
                    <FaChevronDown
                      className="md:hidden transform transition-transform duration-300 text-[#6171fe] group-hover:text-white"
                      style={{ transform: openSection === 'legal' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </div>
                  <ul
                    className={`${openSection === 'legal' ? 'max-h-96 mt-4' : 'max-h-0'} md:mt-4 md:max-h-96 overflow-hidden transition-all duration-300 ease-in-out space-y-3 text-sm text-gray-300 md:block`}
                  >
                    <li>
                      <a
                        href="/conditions-generales"
                        rel="noopener noreferrer"
                        className="hover:text-[#0061ff] transition-colors duration-200 inline-block py-1"
                      >
                        Conditions générales
                      </a>
                    </li>
                    <li>
                      <a
                        href="/politique-de-confidentialite"
                        rel="noopener noreferrer"
                        className="hover:text-[#0061ff] transition-colors duration-200 inline-block py-1"
                      >
                        Politique de confidentialité
                      </a>
                    </li>
                    <li>
                      <a
                        href="/mentions-legales"
                        rel="noopener noreferrer"
                        className="hover:text-[#0061ff] transition-colors duration-200 inline-block py-1"
                      >
                        Mentions légales
                      </a>
                    </li>
                  </ul>
                </div>
      
                {/* Social media section */}
                <div className="md:block">
                  <div
                    className="flex justify-between items-center border-b border-gray-700 pb-3 md:border-none md:pb-0 cursor-pointer group"
                    onClick={() => toggleSection('social')}
                  >
                    <h4 className="font-bold text-lg text-[#6171fe]">Réseaux sociaux</h4>
                    <FaChevronDown
                      className="md:hidden transform transition-transform duration-300 text-[#6171fe] group-hover:text-white"
                      style={{ transform: openSection === 'social' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </div>
                  <div
                    className={`${openSection === 'social' ? 'max-h-96 mt-4' : 'max-h-0'} md:mt-4 md:max-h-96 overflow-hidden transition-all duration-300 ease-in-out flex justify-center md:justify-start space-x-4`}
                  >
                    <a
                      href={`https://wa.me/${settings.phone}`}
                      className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center hover:bg-green-500/50 transition-all duration-300 transform hover:scale-110"
                    >
                      <FaWhatsapp className="w-5 h-5 text-green-400" />
                    </a>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="w-10 h-10 bg-gray-500/20 rounded-full flex items-center justify-center hover:bg-gray-500/50 transition-all duration-300 transform hover:scale-110"
                    >
                      <Mail className="w-5 h-5 text-gray-300" />
                    </a>
                    <a
                      href={settings.facebook}
                      className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/50 transition-all duration-300 transform hover:scale-110"
                    >
                      <FaFacebook className="w-5 h-5 text-blue-300" />
                    </a>
                    <a
                      href={settings.instagram}
                      className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-300 transform hover:scale-110"
                    >
                      <FaInstagram className="w-5 h-5 text-pink-300" />
                    </a>
                  </div>
                </div>
              </div>
      
              {/* Bottom copyright section */}
              <div className="border-t border-gray-800 mt-10 pt-8 text-center">
                <p className="text-sm text-gray-400">
                  <span onClick={handleClick} style={{ cursor: 'pointer' }}>
                    ©
                  </span>{' '}
                  {new Date().getFullYear()} {settings.siteName}. Tous droits réservés.
                </p>
                <p className="mt-2">
                  <a
                    href="https://www.linkedin.com/in/akram-benhammou-a888a9221/"
                    className={`text-[#090d16] ${clickCount >= 5 ? 'text-gray-500' : ''}`}
                  >
                    Réalisé par Akram Benhammou
                  </a>
                </p>
              </div>
            </div>
          </footer>
        );
      }, (prevProps, nextProps) => prevProps.settings === nextProps.settings && prevProps.handleLogoClick === nextProps.handleLogoClick);
    const FloatingWhatsAppButton = memo(() => (
        <motion.a
            href={`https://wa.me/${settings.phone}`}
            target="_blank"
            className="fixed bottom-8 right-8 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <FaWhatsapp className="w-6 h-6" />
        </motion.a>
    ));

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <Header />
            <Hero />
            <Fleet />
            <Features />
            <Testimonials />
            <Contact settings={settings} />
            <Footer settings={settings} handleLogoClick={handleLogoClick} />
            <FloatingWhatsAppButton />
        </div>
    );
};

export default Main;