import React, { useState } from 'react';
import { Calendar, Car, Users, Settings, PieChart, Plus, Edit, Trash, Search, MessageSquare, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from './context/DataContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    
        const navigate = useNavigate();
      
        const handleLogout = () => {
            localStorage.removeItem("token");  
            sessionStorage.clear(); // Supprime toutes les sessions actives
        
            // Remplacement de l'historique pour empêcher le retour en arrière
            navigate("/logout", { replace: true });
        
            // Optionnel : recharger la page pour éviter le cache
            window.location.href = "/";
        };
    
    const [activeTab, setActiveTab] = useState('apercu');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(null); // 'car', 'customer', 'reservation', or 'testimonial'
    const [editingItem, setEditingItem] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(null);
    const formatDateForMySQL = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };
    // Destructure everything from useData() in one go
    const {
        cars = [], reservations = [], customers = [], settings = {}, testimonials = [],
        isLoading, addCar, updateCar, deleteCar, addCustomer, updateCustomer, deleteCustomer,
        addReservation, updateReservation, deleteReservation, addTestimonial, updateTestimonial,
        deleteTestimonial, updateSettings, refreshData
    } = useData();

    // Ensure testimonials has a fallback value
    const filteredTestimonials = (testimonials || []).filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddTestimonial = async (testimonialData) => {
        await addTestimonial(testimonialData);
        setSearchTerm(''); // Reset search term to display all testimonials
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
        const updatedSettings = {
            site_name: formData.get('siteName'),
            phone:formData.get('phone'),
            contact_email: formData.get('contactEmail'),
            facebook : formData.get('facebook'),
            instagram : formData.get('instagram'),
            adress : formData.get('adress'),
            gps : formData.get('gps'),
            maintenance_mode: formData.get('maintenanceMode') === 'on' ? 1 : 0,
            

        };
        console.log('Settings to submit:', updatedSettings);
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
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) || car.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredReservations = (reservations || []).filter(res =>
        res.car_name?.toLowerCase().includes(searchTerm.toLowerCase()) || res.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) || res.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredCustomers = (customers || []).filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || customer.phone.includes(searchTerm)
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
            // Format dates for MySQL
            const formattedData = {
                ...reservationData,
                start_date: formatDateForMySQL(reservationData.start_date),
                end_date: formatDateForMySQL(reservationData.end_date),
            };
            
            const newReservation = await addReservation(formattedData);
            
            // Trigger WhatsApp message after successful reservation
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
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="w-16 md:w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
                <nav className="flex-1 mt-4">
                    {['apercu', 'voitures', 'reservations', 'clients', 'témoignages', 'parametres'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full flex items-center justify-center md:justify-start p-3 md:px-6 ${activeTab === tab ? 'bg-red-50 text-red-500 dark:bg-gray-700 dark:text-red-400 border-l-4 border-red-500' : 'text-gray-600 dark:text-gray-400'}`}
                        >
                            {tab === 'apercu' && <PieChart className="h-5 w-5" />}
                            {tab === 'voitures' && <Car className="h-5 w-5" />}
                            {tab === 'reservations' && <Calendar className="h-5 w-5" />}
                            {tab === 'clients' && <Users className="h-5 w-5" />}
                            {tab === 'témoignages' && <MessageSquare className="h-5 w-5" />}
                            {tab === 'parametres' && <Settings className="h-5 w-5" />}
                            <span className="hidden md:block ml-3">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center md:justify-start p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="hidden md:block ml-3">Déconnexion</span>
                    </button>
    </div>
            </div>

            <div className="flex-1 overflow-x-hidden">
                <header className="bg-white dark:bg-gray-800 shadow p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold">
                            {activeTab === 'apercu' && 'Tableau de bord'}
                            {activeTab === 'voitures' && 'Gestion des véhicules'}
                            {activeTab === 'reservations' && 'Gestion des réservations'}
                            {activeTab === 'clients' && 'Gestion des clients'}
                            {activeTab === 'témoignages' && 'Gestion des témoignages'}
                            {activeTab === 'parametres' && 'Paramètres du site'}
                        </h1>
                        <div className="flex items-center">
                            <div className="relative mr-4">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                    <span className="text-sm">AM</span>
                                </div>
                                <span className="ml-2 hidden sm:block">Admin</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-4 sm:p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'apercu' && (
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                            <div className="flex items-center">
                                                <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900">
                                                    <Car className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Véhicules</p>
                                                    <p className="text-xl font-bold">{stats.totalCars}</p>
                                                    <p className="text-xs text-green-500">{stats.availableCars} disponibles</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                            <div className="flex items-center">
                                                <div className="rounded-full p-3 bg-red-100 dark:bg-red-900">
                                                    <Calendar className="h-6 w-6 text-red-500 dark:text-red-300" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Réservations</p>
                                                    <p className="text-xl font-bold">{reservations.length}</p>
                                                    <p className="text-xs text-yellow-500">{stats.activeReservations} actives</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                            <div className="flex items-center">
                                                <div className="rounded-full p-3 bg-green-100 dark:bg-green-900">
                                                    <Users className="h-6 w-6 text-green-500 dark:text-green-300" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Clients</p>
                                                    <p className="text-xl font-bold">{stats.totalCustomers}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                            <div className="flex items-center">
                                                <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900">
                                                    <PieChart className="h-6 w-6 text-purple-500 dark:text-purple-300" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Revenus</p>
                                                    <p className="text-xl font-bold">{stats.revenue.toLocaleString()} DH</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                            <h2 className="text-lg font-semibold mb-4">Réservations récentes</h2>
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
                                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                            <h2 className="text-lg font-semibold mb-4">Véhicules populaires</h2>
                                            {cars.sort((a, b) => b.reservations_count - a.reservations_count).slice(0, 3).map(car => (
                                                <div key={car.id} className="flex items-center mb-4 pb-4 border-b dark:border-gray-700 last:border-0 last:pb-0 last:mb-0">
                                                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                                                        <img src={car.image_url} alt={car.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="ml-4 flex-1">
                                                        <h3 className="font-medium">{car.name}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">{car.reservations_count} réservations</p>
                                                        <p className="text-sm font-medium">{car.price} DH/jour</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'voitures' && (
                                <div>
                                    <div className="flex justify-end mb-4">
                                        <button onClick={() => setShowAddModal('car')} className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                                            <Plus className="h-4 w-4 mr-2" /> Ajouter une voiture
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
                                    <div className="flex justify-end mb-4">
                                        <button onClick={() => setShowAddModal('reservation')} className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                                            <Plus className="h-4 w-4 mr-2" /> Ajouter une réservation
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
                                    <div className="flex justify-end mb-4">
                                        <button onClick={() => setShowAddModal('customer')} className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                                            <Plus className="h-4 w-4 mr-2" /> Ajouter un client
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
                                    <div className="flex justify-end mb-4">
                                        <button onClick={() => setShowAddModal('testimonial')} className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                                            <Plus className="h-4 w-4 mr-2" /> Ajouter un témoignage
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
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                                    <h2 className="text-lg font-semibold mb-4">Paramètres du site</h2>
                                    <form onSubmit={handleSettingsSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Nom du site
                                            </label>
                                            <input
                                                name="siteName"
                                                type="text"
                                                defaultValue={settings.siteName || 'Luxury Drive'}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Téléphone
                                            </label>
                                            <input
                                                name="phone"
                                                type="number"
                                                defaultValue={settings.phone || '212xxxxxx'}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Email de contact
                                            </label>
                                            <input
                                                name="contactEmail"
                                                type="email"
                                                defaultValue={settings.contactEmail || 'admin@luxurydrive.com'}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Facebook
                                            </label>
                                            <input
                                                name="facebook"
                                                type="url"
                                                defaultValue={settings.facebook || 'facebook.com'}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Instagram
                                            </label>
                                            <input
                                                name="instagram"
                                                type="url"
                                                defaultValue={settings.instagram || 'instagram.com'}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Adresse
                                            </label>
                                            <input
                                                name="adress"
                                                type="Text"
                                                defaultValue={settings.adress || 'Adress'}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Lien GPS
                                            </label>
                                            <input
                                                name="gps"
                                                type="url"
                                                defaultValue={settings.adress || 'gps'}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                required
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-4">
                                                Mode maintenance
                                            </label>
                                            <input
                                                name="maintenanceMode"
                                                type="checkbox"
                                                defaultChecked={settings.maintenanceMode || false}
                                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 rounded"
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                Enregistrer
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            {/* Modals */}
            {showAddModal === 'car' && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Disponibilité</label>
                                            <select name="available" defaultValue={editingItem?.available.toString() || 'true'} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700">
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
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const reservationData = Object.fromEntries(new FormData(e.target));
                                if (editingItem) handleUpdateReservation(editingItem.id, reservationData);
                                else handleAddReservation(reservationData);
                            }}>
                                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{editingItem ? 'Modifier la réservation' : 'Ajouter une réservation'}</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client</label>
                                            <select name="customer_id" defaultValue={editingItem?.customer_id || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required>
                                                <option value="">Sélectionner un client</option>
                                                {customers.map(customer => (
                                                    <option key={customer.id} value={customer.id}>{customer.name} ({customer.phone})</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Véhicule</label>
                                            <select name="car_id" defaultValue={editingItem?.car_id || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required>
                                                <option value="">Sélectionner un véhicule</option>
                                                {cars.map(car => (
                                                    <option key={car.id} value={car.id}>{car.name} ({car.brand})</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date de début</label>
                                            <input name="start_date" type="datetime-local" defaultValue={editingItem?.start_date ? new Date(editingItem.start_date).toISOString().slice(0, 16) : ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date de fin</label>
                                            <input name="end_date" type="datetime-local" defaultValue={editingItem?.end_date ? new Date(editingItem.end_date).toISOString().slice(0, 16) : ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Statut</label>
                                            <select name="status" defaultValue={editingItem?.status || 'pending'} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700">
                                                <option value="pending">En attente</option>
                                                <option value="active">Active</option>
                                                <option value="completed">Terminée</option>
                                                <option value="canceled">Annulée</option>
                                            </select>
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

            {showAddModal === 'testimonial' && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const testimonialData = Object.fromEntries(new FormData(e.target));
                                if (editingItem) handleUpdateTestimonial(editingItem.id, testimonialData);
                                else handleAddTestimonial(testimonialData);
                            }}>
                                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{editingItem ? 'Modifier le témoignage' : 'Ajouter un témoignage'}</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                                            <input name="name" type="text" defaultValue={editingItem?.name || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rôle</label>
                                            <input name="role" type="text" defaultValue={editingItem?.role || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contenu</label>
                                            <textarea name="content" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" defaultValue={editingItem?.content || ''} rows="3" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Note (1-5)</label>
                                            <input name="rating" type="number" min="1" max="5" defaultValue={editingItem?.rating || '5'} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
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

            {showConfirmDelete && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                                <button onClick={() => {
                                    if (showConfirmDelete.type === 'car') handleDeleteCar(showConfirmDelete.id);
                                    else if (showConfirmDelete.type === 'customer') handleDeleteCustomer(showConfirmDelete.id);
                                    else if (showConfirmDelete.type === 'reservation') handleDeleteReservation(showConfirmDelete.id);
                                    else if (showConfirmDelete.type === 'testimonial') handleDeleteTestimonial(showConfirmDelete.id);
                                    setShowConfirmDelete(null);
                                }} className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Supprimer</button>
                                <button onClick={() => setShowConfirmDelete(null)} className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600">Annuler</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;