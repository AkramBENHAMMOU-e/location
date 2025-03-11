import React, { useState, useEffect } from 'react';
import { Calendar, Car, Users, Settings, PieChart, Plus, Edit, Trash, Search, MessageSquare, LogOut, Menu, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from './context/DataContext';
import { useNavigate, Navigate } from 'react-router-dom';


    

const AdminDashboard = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
    const [activeTab, setActiveTab] = useState('apercu');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(null); // 'car', 'customer', 'reservation', 'testimonial'
    const [editingItem, setEditingItem] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage or system preference for initial state
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Mobile responsive breakpoint
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const updateMedia = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);

    // Effect to toggle dark mode class and save preference
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (isMobile) setIsSidebarOpen(false); // Close sidebar on mobile after navigation
    };

    const navigate = useNavigate();
    const {
        cars = [], reservations = [], customers = [], settings = {}, testimonials = [],
        isLoading, addCar, updateCar, deleteCar, addCustomer, updateCustomer, deleteCustomer,
        addReservation, updateReservation, deleteReservation, addTestimonial, updateTestimonial,
        deleteTestimonial, updateSettings, refreshData
    } = useData();

    const formatDateForMySQL = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.clear();
        navigate("/logout", { replace: true });
        window.location.href = "/";
    };

    const filteredTestimonials = (testimonials || []).filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddTestimonial = async (testimonialData) => {
        await addTestimonial(testimonialData);
        setSearchTerm('');
        setShowAddModal(null);
    };

    const handleUpdateTestimonial = async (id, testimonialData) => {
        await updateTestimonial(id, testimonialData);
        setShowAddModal(null);
        setEditingItem(null);
    };

    const handleDeleteTestimonial = async (id) => {
        await deleteTestimonial(id);
        setShowConfirmDelete(null);
    };

    const handleSettingsSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Vérification de la correspondance des mots de passe
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        if (password && password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }
        
        const updatedSettings = {
            site_name: formData.get('siteName'),
            phone: formData.get('phone'),
            contact_email: formData.get('contactEmail'),
            facebook: formData.get('facebook'),
            instagram: formData.get('instagram'),
            adress: formData.get('adress'),
            gps: formData.get('gps'),
            password: password,
            maintenance_mode: formData.get('maintenanceMode') === 'on' ? 1 : 0,
        };
        
        try {
            await updateSettings(updatedSettings);
            await refreshData();
            alert('Paramètres mis à jour avec succès !');
        } catch (error) {
            console.error('Error submitting settings:', error);
            alert('Erreur lors de la mise à jour des paramètres.');
        }
    };

    const filteredCars = (cars || []).filter(car =>
        car.name?.toLowerCase().includes(searchTerm.toLowerCase()) || car.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredReservations = (reservations || []).filter(res =>
        res.car_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const filteredCustomers = (customers || []).filter(customer =>
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) || customer.phone?.includes(searchTerm)
    );

    const stats = {
        totalCars: cars.length || 0,
        availableCars: (cars || []).filter(car => car.available).length,
        activeReservations: (reservations || []).filter(res => res.status === 'active').length,
        totalCustomers: customers.length || 0,
        revenue: Math.round((reservations || []).reduce((sum, res) => sum + Number(res.total), 0)),
    };

    const handleAddCar = async (formData) => {
        await addCar(formData);
        setShowAddModal(null);
        setEditingItem(null);
    };

    const handleUpdateCar = async (id, formData) => {
        await updateCar(id, formData);
        setShowAddModal(null);
        setEditingItem(null);
    };

    const handleDeleteCar = async (id) => {
        await deleteCar(id);
        setShowConfirmDelete(null);
    };

    const handleAddCustomer = async (customerData) => {
        await addCustomer(customerData);
        setShowAddModal(null);
        setEditingItem(null);
    };

    const handleUpdateCustomer = async (id, customerData) => {
        await updateCustomer(id, customerData);
        setShowAddModal(null);
        setEditingItem(null);
    };

    const handleDeleteCustomer = async (id) => {
        await deleteCustomer(id);
        setShowConfirmDelete(null);
    };

    const handleAddReservation = async (reservationData) => {
        try {
            const formattedData = {
                ...reservationData,
                start_date: formatDateForMySQL(reservationData.start_date),
                end_date: formatDateForMySQL(reservationData.end_date),
            };
            const newReservation = await addReservation(formattedData);
            const car = cars.find(c => c.id === parseInt(reservationData.car_id));
            const customer = customers.find(c => c.id === parseInt(reservationData.customer_id));
            if (car && customer) {
                const days = Math.ceil((new Date(reservationData.end_date) - new Date(reservationData.start_date)) / (1000 * 60 * 60 * 24));
                const message = encodeURIComponent(
                    `Nouvelle réservation administrative:\n` +
                    `Véhicule: ${car.name}\n` +
                    `Client: ${customer.name}\n` +
                    `Téléphone: ${customer.phone}\n` +
                    `Période: du ${reservationData.start_date} au ${reservationData.end_date} (${days} jour${days > 1 ? 's' : ''})`
                );
                window.open(`https://wa.me/212771764448?text=${message}`, '_blank');
            }
            setShowAddModal(null);
            setEditingItem(null);
            return newReservation;
        } catch (error) {
            console.error('Error adding reservation:', error);
            throw error;
        }
    };

    const handleUpdateReservation = async (id, reservationData) => {
        await updateReservation(id, reservationData);
        setShowAddModal(null);
        setEditingItem(null);
    };

    const handleDeleteReservation = async (id) => {
        await deleteReservation(id);
        setShowConfirmDelete(null);
    };


    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            {/* Mobile Header */}
            <div className="md:hidden bg-white dark:bg-gray-800 shadow p-4 flex items-center justify-between">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-sm">AM</span>
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500"
                    >
                        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Sidebar with mobile responsiveness */}
            <div className={`fixed md:relative z-30 md:z-auto w-64 bg-white dark:bg-gray-800 shadow-md transform transition-transform duration-300 ease-in-out 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="text-gray-600 dark:text-gray-400 hover:text-red-500"
                    >
                        ✕
                    </button>
                </div>
                <nav className="flex-1 mt-4">
                    {['apercu', 'voitures', 'reservations', 'clients', 'témoignages', 'parametres'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`w-full flex items-center justify-start p-3 md:px-6 ${
                                activeTab === tab 
                                ? 'bg-red-50 text-red-500 dark:bg-gray-700 dark:text-red-400 border-l-4 border-red-500' 
                                : 'text-gray-600 dark:text-gray-400'
                            }`}
                        >
                            {tab === 'apercu' && <PieChart className="h-5 w-5" />}
                            {tab === 'voitures' && <Car className="h-5 w-5" />}
                            {tab === 'reservations' && <Calendar className="h-5 w-5" />}
                            {tab === 'clients' && <Users className="h-5 w-5" />}
                            {tab === 'témoignages' && <MessageSquare className="h-5 w-5" />}
                            {tab === 'parametres' && <Settings className="h-5 w-5" />}
                            <span className="ml-3">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-start p-2 text-gray-600 dark:text-gray-400 hover:text-red-500"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="ml-3">Déconnexion</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-x-hidden pt-16 md:pt-0">
                <header className="bg-white dark:bg-gray-800 shadow p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg md:text-xl font-bold">
                            {activeTab === 'apercu' && 'Tableau de bord'}
                            {activeTab === 'voitures' && 'Véhicules'}
                            {activeTab === 'reservations' && 'Réservations'}
                            {activeTab === 'clients' && 'Clients'}
                            {activeTab === 'témoignages' && 'Témoignages'}
                            {activeTab === 'parametres' && 'Paramètres'}
                        </h1>
                        <div className="flex items-center space-x-4">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                            <div className="hidden md:flex items-center space-x-2">
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500"
                                >
                                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </button>
                                <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                    <span className="text-sm">AM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Mobile Search */}
                    <div className="mt-4 md:hidden">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>
                </header>

                <main className="p-4 sm:p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'apercu' && (
                                <div>
                                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 mb-4 md:mb-6">
                                        <div className="bg-white dark:bg-gray-800 p-2 md:p-4 rounded-lg shadow-sm">
                                            <div className="flex items-center">
                                                <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900">
                                                    <Car className="h-4 w-4 md:h-6 md:w-6 text-blue-500 dark:text-blue-300" />
                                                </div>
                                                <div className="ml-2 md:ml-4">
                                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Véhicules</p>
                                                    <p className="text-lg md:text-xl font-bold">{stats.totalCars}</p>
                                                    <p className="text-[10px] md:text-xs text-green-500">{stats.availableCars} disponibles</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 p-2 md:p-4 rounded-lg shadow-sm">
                                            <div className="flex items-center">
                                                <div className="rounded-full p-2 bg-red-100 dark:bg-red-900">
                                                    <Calendar className="h-4 w-4 md:h-6 md:w-6 text-red-500 dark:text-red-300" />
                                                </div>
                                                <div className="ml-2 md:ml-4">
                                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Réservations</p>
                                                    <p className="text-lg md:text-xl font-bold">{reservations.length}</p>
                                                    <p className="text-[10px] md:text-xs text-yellow-500">{stats.activeReservations} actives</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 p-2 md:p-4 rounded-lg shadow-sm">
                                            <div className="flex items-center">
                                                <div className="rounded-full p-2 bg-green-100 dark:bg-green-900">
                                                    <Users className="h-4 w-4 md:h-6 md:w-6 text-green-500 dark:text-green-300" />
                                                </div>
                                                <div className="ml-2 md:ml-4">
                                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Clients</p>
                                                    <p className="text-lg md:text-xl font-bold">{stats.totalCustomers}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 p-2 md:p-4 rounded-lg shadow-sm">
                                            <div className="flex items-center">
                                                <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900">
                                                    <PieChart className="h-4 w-4 md:h-6 md:w-6 text-purple-500 dark:text-purple-300" />
                                                </div>
                                                <div className="ml-2 md:ml-4">
                                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Revenus</p>
                                                    <p className="text-lg md:text-xl font-bold">{stats.revenue.toLocaleString()} DH</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2 md:gap-4">
                                        <div className="bg-white dark:bg-gray-800 p-2 md:p-4 rounded-lg shadow-sm">
                                            <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Réservations récentes</h2>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full">
                                                    <thead>
                                                        <tr className="border-b dark:border-gray-700">
                                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Client</th>
                                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Véhicule</th>
                                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Statut</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {reservations.slice(0, 5).map(reservation => (
                                                            <tr key={reservation.id} className="border-b dark:border-gray-700">
                                                                <td className="py-3 px-4">{reservation.id}</td>
                                                                <td className="py-3 px-4">{reservation.customer_name}</td>
                                                                <td className="py-3 px-4">{reservation.car_name}</td>
                                                                <td className="py-3 px-4">{new Date(reservation.start_date).toLocaleDateString()}</td>
                                                                <td className="py-3 px-4">
                                                                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${reservation.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                                                                        {reservation.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 p-2 md:p-4 rounded-lg shadow-sm">
                                            <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Véhicules populaires</h2>
                                            {cars.sort((a, b) => b.reservations_count - a.reservations_count).slice(0, 3).map(car => (
                                                <div key={car.id} className="flex items-center mb-2 md:mb-4 pb-2 md:pb-4 border-b dark:border-gray-700 last:border-0 last:pb-0 last:mb-0 text-xs md:text-sm">
                                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                                                        <img src={car.image_url} alt={car.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="ml-2 md:ml-4 flex-1">
                                                        <h3 className="font-medium">{car.name}</h3>
                                                        <p className="text-gray-500 dark:text-gray-400">{car.reservations_count} réservations</p>
                                                        <p className="font-medium">{car.price} DH/jour</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'voitures' && (
                                <div>
                                    <div className="flex justify-end mb-2 md:mb-4">
                                        <button onClick={() => setShowAddModal('car')} className="flex items-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base">
                                            <Plus className="h-4 w-4 mr-1 md:mr-2" /> Ajouter
                                        </button>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="bg-gray-50 dark:bg-gray-700">
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Véhicule</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Marque</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Prix</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Statut</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Réservations</th>
                                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredCars.map(car => (
                                                    <tr key={car.id} className="border-b dark:border-gray-700">
                                                        <td className="py-3 px-4">{car.id}</td>
                                                        <td className="py-3 px-4">
                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                                                                    <img src={car.image_url} alt={car.name} className="w-full h-full object-cover" />
                                                                </div>
                                                                <span className="ml-3">{car.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-4">{car.brand}</td>
                                                        <td className="py-3 px-4">{car.price} DH/jour</td>
                                                        <td className="py-3 px-4">
                                                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${car.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                                                                {car.available ? 'Disponible' : 'Réservé'}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4">{car.reservations_count}</td>
                                                        <td className="py-3 px-4 text-right">
                                                            <button onClick={() => { setEditingItem(car); setShowAddModal('car'); }} className="text-blue-500 hover:text-blue-700 mr-3">
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button onClick={() => setShowConfirmDelete({ type: 'car', id: car.id })} className="text-red-500 hover:text-red-700">
                                                                <Trash className="h-4 w-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reservations' && (
                                <div>
                                    <div className="flex justify-end mb-2 md:mb-4">
                                        <button onClick={() => setShowAddModal('reservation')} className="flex items-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base">
                                            <Plus className="h-4 w-4 mr-1 md:mr-2" /> Ajouter
                                        </button>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="bg-gray-50 dark:bg-gray-700">
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Client</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Véhicule</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Dates</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Total</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Statut</th>
                                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredReservations.map(reservation => (
                                                    <tr key={reservation.id} className="border-b dark:border-gray-700">
                                                        <td className="py-3 px-4">{reservation.id}</td>
                                                        <td className="py-3 px-4">{reservation.customer_name}</td>
                                                        <td className="py-3 px-4">{reservation.car_name}</td>
                                                        <td className="py-3 px-4">{new Date(reservation.start_date).toLocaleDateString()} - {new Date(reservation.end_date).toLocaleDateString()}</td>
                                                        <td className="py-3 px-4">{reservation.total} DH</td>
                                                        <td className="py-3 px-4">
                                                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${reservation.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                                                                {reservation.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-right">
                                                            <button onClick={() => { setEditingItem(reservation); setShowAddModal('reservation'); }} className="text-blue-500 hover:text-blue-700 mr-3">
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button onClick={() => setShowConfirmDelete({ type: 'reservation', id: reservation.id })} className="text-red-500 hover:text-red-700">
                                                                <Trash className="h-4 w-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'clients' && (
                                <div>
                                    <div className="flex justify-end mb-2 md:mb-4">
                                        <button onClick={() => setShowAddModal('customer')} className="flex items-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base">
                                            <Plus className="h-4 w-4 mr-1 md:mr-2" /> Ajouter
                                        </button>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="bg-gray-50 dark:bg-gray-700">
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Nom</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Téléphone</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Réservations</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Dépenses</th>
                                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredCustomers.map(customer => (
                                                    <tr key={customer.id} className="border-b dark:border-gray-700">
                                                        <td className="py-3 px-4">{customer.id}</td>
                                                        <td className="py-3 px-4">{customer.name}</td>
                                                        <td className="py-3 px-4">{customer.phone}</td>
                                                        <td className="py-3 px-4">{customer.reservations_count}</td>
                                                        <td className="py-3 px-4">{customer.total_spent} DH</td>
                                                        <td className="py-3 px-4 text-right">
                                                            <button onClick={() => { setEditingItem(customer); setShowAddModal('customer'); }} className="text-blue-500 hover:text-blue-700 mr-3">
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button onClick={() => setShowConfirmDelete({ type: 'customer', id: customer.id })} className="text-red-500 hover:text-red-700">
                                                                <Trash className="h-4 w-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'témoignages' && (
                                <div>
                                    <div className="flex justify-end mb-2 md:mb-4">
                                        <button onClick={() => setShowAddModal('testimonial')} className="flex items-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base">
                                            <Plus className="h-4 w-4 mr-1 md:mr-2" /> Ajouter
                                        </button>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="bg-gray-50 dark:bg-gray-700">
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Nom</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Rôle</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Contenu</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Note</th>
                                                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredTestimonials.map(t => (
                                                    <tr key={t.id} className="border-b dark:border-gray-700">
                                                        <td className="py-3 px-4">{t.id}</td>
                                                        <td className="py-3 px-4">{t.name}</td>
                                                        <td className="py-3 px-4">{t.role}</td>
                                                        <td className="py-3 px-4">{t.content.substring(0, 50)}...</td>
                                                        <td className="py-3 px-4">{t.rating}/5</td>
                                                        <td className="py-3 px-4 text-right">
                                                            <button onClick={() => { setEditingItem(t); setShowAddModal('testimonial'); }} className="text-blue-500 hover:text-blue-700 mr-3">
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button onClick={() => setShowConfirmDelete({ type: 'testimonial', id: t.id })} className="text-red-500 hover:text-red-700">
                                                                <Trash className="h-4 w-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'parametres' && (
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6">
                                    <h2 className="text-base md:text-lg font-semibold mb-4">Paramètres du site</h2>
                                    <form onSubmit={handleSettingsSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom du site</label>
                                            <input name="siteName" type="text" defaultValue={settings.siteName || 'YLH CAR'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                                            <input name="phone" type="number" defaultValue={settings.phone || '212661918917'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email de contact</label>
                                            <input name="contactEmail" type="email" defaultValue={settings.contactEmail || 'reservation@ylhcar.ma'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Facebook</label>
                                            <input name="facebook" type="url" defaultValue={settings.facebook || 'https://www.facebook.com/YLHCAR'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instagram</label>
                                            <input name="instagram" type="url" defaultValue={settings.instagram || 'https://instagram.com/ylhcarofficiel'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse</label>
                                            <input name="adress" type="text" defaultValue={settings.adress || 'Bouchouk résidence annakhil 2, Salé'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lien GPS</label>
                                            <input name="gps" type="url" defaultValue={settings.gps || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.566074414049!2d-6.785799300000001!3d34.0806362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda769b090183891%3A0x39e21bb9b22eafd5!2sYLH%20CAR!5e0!3m2!1sfr!2sma!4v1741453156087!5m2!1sfr!2sma'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nouveau mot de passe :</label>
                                            <input name="password" type="password" defaultValue={settings.password ||''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmer le nouveau mot de passe :</label>
                                            <input name="confirmPassword" type="password" className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div className="flex items-center">
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 md:mr-4">Mode maintenance</label>
                                            <input name="maintenanceMode" type="checkbox" defaultChecked={settings.maintenanceMode || false} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 rounded" />
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit" className="px-2 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base">Enregistrer</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Modals */}
            {showAddModal === 'car' && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block">
                        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75" onClick={() => setShowAddModal(null)}></div>
                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full mx-2">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                if (editingItem) handleUpdateCar(editingItem.id, formData);
                                else handleAddCar(formData);
                            }}>
                                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{editingItem ? 'Modifier le véhicule' : 'Ajouter un véhicule'}</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom du véhicule</label>
                                            <input name="name" type="text" defaultValue={editingItem?.name || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marque</label>
                                            <input name="brand" type="text" defaultValue={editingItem?.brand || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prix par jour (DH)</label>
                                            <input name="price" type="number" defaultValue={editingItem?.price || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                            <textarea name="description" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" defaultValue={editingItem?.description || ''} rows="3" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Accélération (0-100 km/h en secondes)</label>
                                            <input name="acceleration" type="text" defaultValue={editingItem?.acceleration || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Consommation (L/100km ou kWh/100km)</label>
                                            <input name="consumption" type="text" defaultValue={editingItem?.consumption || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Puissance (CV)</label>
                                            <input name="puissance" type="text" defaultValue={editingItem?.puissance || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Transmission</label>
                                            <input name="transmission" type="text" defaultValue={editingItem?.transmission || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Disponibilité</label>
                                            <select
                                                name="available"
                                                defaultValue={editingItem?.available?.toString() === '1' ? 'true' : 'false'}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                                                >
                                                <option value="true">Disponible</option>
                                                <option value="false">Non disponible</option>
                                                </select>

                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image du véhicule</label>
                                            <input type="file" name="image" accept="image/*" className="w-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">{editingItem ? 'Modifier' : 'Ajouter'}</button>
                                    <button type="button" onClick={() => { setShowAddModal(null); setEditingItem(null); }} className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600">Annuler</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showAddModal === 'customer' && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block">
                        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75" onClick={() => setShowAddModal(null)}></div>
                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full mx-2">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const customerData = Object.fromEntries(new FormData(e.target));
                                if (editingItem) handleUpdateCustomer(editingItem.id, customerData);
                                else handleAddCustomer(customerData);
                            }}>
                                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{editingItem ? 'Modifier le client' : 'Ajouter un client'}</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                                            <input name="name" type="text" defaultValue={editingItem?.name || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                                            <input name="phone" type="text" defaultValue={editingItem?.phone || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                            <input name="email" type="email" defaultValue={editingItem?.email || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">{editingItem ? 'Modifier' : 'Ajouter'}</button>
                                    <button type="button" onClick={() => { setShowAddModal(null); setEditingItem(null); }} className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600">Annuler</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

          {showAddModal === 'reservation' && (
    <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block">
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75" onClick={() => setShowAddModal(null)}></div>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full mx-2">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const reservationData = Object.fromEntries(new FormData(e.target));
                    if (editingItem) handleUpdateReservation(editingItem.id, reservationData);
                    else handleAddReservation(reservationData);
                }}>
                    <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            {editingItem ? 'Modifier la réservation' : 'Ajouter une réservation'}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client</label>
                                <select
                                    name="customer_id"
                                    defaultValue={editingItem?.customer_id || ''}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                >
                                    <option value="">Sélectionner un client</option>
                                    {customers.map(customer => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name} ({customer.phone})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Véhicule</label>
                                <select
                                    name="car_id"
                                    defaultValue={editingItem?.car_id || ''}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                >
                                    <option value="">Sélectionner un véhicule</option>
                                    {cars.map(car => (
                                        <option key={car.id} value={car.id}>
                                            {car.name} ({car.brand})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date de début</label>
                                <input
                                    name="start_date"
                                    type="datetime-local"
                                    defaultValue={editingItem?.start_date ? new Date(editingItem.start_date).toISOString().slice(0, 16) : ''}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date de fin</label>
                                <input
                                    name="end_date"
                                    type="datetime-local"
                                    defaultValue={editingItem?.end_date ? new Date(editingItem.end_date).toISOString().slice(0, 16) : ''}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Statut</label>
                                <select
                                    name="status"
                                    defaultValue={editingItem?.status || 'pending'}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="pending">En attente</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Terminée</option>
                                    <option value="canceled">Annulée</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {editingItem ? 'Modifier' : 'Ajouter'}
                        </button>
                        <button
                            type="button"
                            onClick={() => { setShowAddModal(null); setEditingItem(null); }}
                            className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}

{showAddModal === 'testimonial' && (
    <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block">
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75" onClick={() => setShowAddModal(null)}></div>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full mx-2">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const testimonialData = Object.fromEntries(new FormData(e.target));
                    if (editingItem) handleUpdateTestimonial(editingItem.id, testimonialData);
                    else handleAddTestimonial(testimonialData);
                }}>
                    <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            {editingItem ? 'Modifier le témoignage' : 'Ajouter un témoignage'}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                                <input
                                    name="name"
                                    type="text"
                                    defaultValue={editingItem?.name || ''}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rôle</label>
                                <input
                                    name="role"
                                    type="text"
                                    defaultValue={editingItem?.role || ''}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contenu</label>
                                <textarea
                                    name="content"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    defaultValue={editingItem?.content || ''}
                                    rows="3"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Note (1-5)</label>
                                <input
                                    name="rating"
                                    type="number"
                                    min="1"
                                    max="5"
                                    defaultValue={editingItem?.rating || '5'}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {editingItem ? 'Modifier' : 'Ajouter'}
                        </button>
                        <button
                            type="button"
                            onClick={() => { setShowAddModal(null); setEditingItem(null); }}
                            className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}

{showConfirmDelete && (
    <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block">
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75" onClick={() => setShowConfirmDelete(null)}></div>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full mx-2">
                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                            <Trash className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                Supprimer {showConfirmDelete.type === 'car' ? 'ce véhicule' : showConfirmDelete.type === 'customer' ? 'ce client' : showConfirmDelete.type === 'reservation' ? 'cette réservation' : 'ce témoignage'}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Êtes-vous sûr de vouloir supprimer cet élément ? Cette action ne peut pas être annulée.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        onClick={() => {
                            if (showConfirmDelete.type === 'car') handleDeleteCar(showConfirmDelete.id);
                            else if (showConfirmDelete.type === 'customer') handleDeleteCustomer(showConfirmDelete.id);
                            else if (showConfirmDelete.type === 'reservation') handleDeleteReservation(showConfirmDelete.id);
                            else if (showConfirmDelete.type === 'testimonial') handleDeleteTestimonial(showConfirmDelete.id);
                            setShowConfirmDelete(null);
                        }}
                        className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Supprimer
                    </button>
                    <button
                        onClick={() => setShowConfirmDelete(null)}
                        className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    </div>
)}
        </div>
    );
};

export default AdminDashboard;