import React, { useState } from 'react';
import { Calendar, Car, Users, Settings, PieChart, Plus, Edit, Trash, Search, MessageSquare, LogOut, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from './context/DataContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.clear();
        navigate("/logout", { replace: true });
        window.location.href = "/";
    };

    const [activeTab, setActiveTab] = useState('apercu');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar

    const formatDateForMySQL = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    const { cars = [], reservations = [], customers = [], settings = {}, testimonials = [],
        isLoading, addCar, updateCar, deleteCar, addCustomer, updateCustomer, deleteCustomer,
        addReservation, updateReservation, deleteReservation, addTestimonial, updateTestimonial,
        deleteTestimonial, updateSettings, refreshData } = useData();

    const filteredTestimonials = (testimonials || []).filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        const updatedSettings = {
            site_name: formData.get('siteName'),
            phone: formData.get('phone'),
            contact_email: formData.get('contactEmail'),
            facebook: formData.get('facebook'),
            instagram: formData.get('instagram'),
            adress: formData.get('adress'),
            gps: formData.get('gps'),
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
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-md transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <nav className="flex-1 mt-4">
                    {['apercu', 'voitures', 'reservations', 'clients', 'témoignages', 'parametres'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center justify-start p-3 px-6 ${activeTab === tab ? 'bg-red-50 text-red-500 dark:bg-gray-700 dark:text-red-400 border-l-4 border-red-500' : 'text-gray-600 dark:text-gray-400'}`}
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
                        className="w-full flex items-center justify-start p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="ml-3">Déconnexion</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-x-hidden">
                <header className="bg-white dark:bg-gray-800 shadow p-4 flex items-center justify-between md:justify-start">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden p-2 text-gray-600 dark:text-gray-400"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <h1 className="text-lg md:text-xl font-bold flex-1 text-center md:text-left">
                        {activeTab === 'apercu' && 'Tableau de bord'}
                        {activeTab === 'voitures' && 'Gestion des véhicules'}
                        {activeTab === 'reservations' && 'Gestion des réservations'}
                        {activeTab === 'clients' && 'Gestion des clients'}
                        {activeTab === 'témoignages' && 'Gestion des témoignages'}
                        {activeTab === 'parametres' && 'Paramètres du site'}
                    </h1>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8 pr-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 w-24 md:w-40"
                            />
                        </div>
                        <div className="hidden md:flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                <span className="text-sm">AM</span>
                            </div>
                            <span className="ml-2">Admin</span>
                        </div>
                    </div>
                </header>

                <main className="p-2 md:p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'apercu' && (
                                <div>
                                    <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4 md:gap-4 mb-4 md:mb-6">
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
                                            <div className="space-y-2">
                                                {reservations.slice(0, 5).map(reservation => (
                                                    <div key={reservation.id} className="border-b dark:border-gray-700 pb-2 md:pb-3 text-xs md:text-sm">
                                                        <p><strong>ID:</strong> {reservation.id}</p>
                                                        <p><strong>Client:</strong> {reservation.customer_name}</p>
                                                        <p><strong>Véhicule:</strong> {reservation.car_name}</p>
                                                        <p><strong>Date:</strong> {new Date(reservation.start_date).toLocaleDateString()}</p>
                                                        <p><strong>Statut:</strong> <span className={`inline-block px-2 py-1 rounded-full text-xs ${reservation.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>{reservation.status}</span></p>
                                                    </div>
                                                ))}
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
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                        <div className="space-y-2 md:space-y-0 md:table min-w-full">
                                            <div className="hidden md:table-header-group bg-gray-50 dark:bg-gray-700">
                                                <div className="md:table-row">
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Véhicule</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Marque</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Prix</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Statut</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Réservations</div>
                                                    <div className="md:table-cell text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</div>
                                                </div>
                                            </div>
                                            <div className="md:table-row-group">
                                                {filteredCars.map(car => (
                                                    <div key={car.id} className="border-b dark:border-gray-700 p-2 md:p-0 md:table-row text-xs md:text-sm flex flex-col md:flex-row">
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">ID:</span> {car.id}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4 flex items-center">
                                                            <span className="md:hidden font-bold mr-1">Véhicule:</span>
                                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                                                                <img src={car.image_url} alt={car.name} className="w-full h-full object-cover" />
                                                            </div>
                                                            <span className="ml-2">{car.name}</span>
                                                        </div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Marque:</span> {car.brand}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Prix:</span> {car.price} DH/jour</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4">
                                                            <span className="md:hidden font-bold">Statut:</span>
                                                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${car.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                                                                {car.available ? 'Disponible' : 'Réservé'}
                                                            </span>
                                                        </div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Réservations:</span> {car.reservations_count}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4 text-right flex md:table-cell justify-end">
                                                            <button onClick={() => { setEditingItem(car); setShowAddModal('car'); }} className="text-blue-500 hover:text-blue-700 mr-2 md:mr-3">
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button onClick={() => setShowConfirmDelete({ type: 'car', id: car.id })} className="text-red-500 hover:text-red-700">
                                                                <Trash className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
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
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                        <div className="space-y-2 md:space-y-0 md:table min-w-full">
                                            <div className="hidden md:table-header-group bg-gray-50 dark:bg-gray-700">
                                                <div className="md:table-row">
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Client</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Véhicule</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Dates</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Total</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Statut</div>
                                                    <div className="md:table-cell text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</div>
                                                </div>
                                            </div>
                                            <div className="md:table-row-group">
                                                {filteredReservations.map(reservation => (
                                                    <div key={reservation.id} className="border-b dark:border-gray-700 p-2 md:p-0 md:table-row text-xs md:text-sm flex flex-col md:flex-row">
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">ID:</span> {reservation.id}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Client:</span> {reservation.customer_name}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Véhicule:</span> {reservation.car_name}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Dates:</span> {new Date(reservation.start_date).toLocaleDateString()} - {new Date(reservation.end_date).toLocaleDateString()}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Total:</span> {reservation.total} DH</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4">
                                                            <span className="md:hidden font-bold">Statut:</span>
                                                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${reservation.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                                                                {reservation.status}
                                                            </span>
                                                        </div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4 text-right flex md:table-cell justify-end">
                                                            <button onClick={() => { setEditingItem(reservation); setShowAddModal('reservation'); }} className="text-blue-500 hover:text-blue-700 mr-2 md:mr-3">
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button onClick={() => setShowConfirmDelete({ type: 'reservation', id: reservation.id })} className="text-red-500 hover:text-red-700">
                                                                <Trash className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
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
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                        <div className="space-y-2 md:space-y-0 md:table min-w-full">
                                            <div className="hidden md:table-header-group bg-gray-50 dark:bg-gray-700">
                                                <div className="md:table-row">
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Nom</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Téléphone</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Réservations</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Dépenses</div>
                                                    <div className="md:table-cell text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</div>
                                                </div>
                                            </div>
                                            <div className="md:table-row-group">
                                                {filteredCustomers.map(customer => (
                                                    <div key={customer.id} className="border-b dark:border-gray-700 p-2 md:p-0 md:table-row text-xs md:text-sm flex flex-col md:flex-row">
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">ID:</span> {customer.id}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Nom:</span> {customer.name}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Téléphone:</span> {customer.phone}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Réservations:</span> {customer.reservations_count}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Dépenses:</span> {customer.total_spent} DH</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4 text-right flex md:table-cell justify-end">
                                                            <button onClick={() => { setEditingItem(customer); setShowAddModal('customer'); }} className="text-blue-500 hover:text-blue-700 mr-2 md:mr-3">
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button onClick={() => setShowConfirmDelete({ type: 'customer', id: customer.id })} className="text-red-500 hover:text-red-700">
                                                                <Trash className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
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
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                        <div className="space-y-2 md:space-y-0 md:table min-w-full">
                                            <div className="hidden md:table-header-group bg-gray-50 dark:bg-gray-700">
                                                <div className="md:table-row">
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Nom</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Rôle</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Contenu</div>
                                                    <div className="md:table-cell text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Note</div>
                                                    <div className="md:table-cell text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</div>
                                                </div>
                                            </div>
                                            <div className="md:table-row-group">
                                                {filteredTestimonials.map(t => (
                                                    <div key={t.id} className="border-b dark:border-gray-700 p-2 md:p-0 md:table-row text-xs md:text-sm flex flex-col md:flex-row">
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">ID:</span> {t.id}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Nom:</span> {t.name}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Rôle:</span> {t.role}</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Contenu:</span> {t.content.substring(0, 30)}...</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4"><span className="md:hidden font-bold">Note:</span> {t.rating}/5</div>
                                                        <div className="md:table-cell py-1 md:py-3 px-2 md:px-4 text-right flex md:table-cell justify-end">
                                                            <button onClick={() => { setEditingItem(t); setShowAddModal('testimonial'); }} className="text-blue-500 hover:text-blue-700 mr-2 md:mr-3">
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                            <button onClick={() => setShowConfirmDelete({ type: 'testimonial', id: t.id })} className="text-red-500 hover:text-red-700">
                                                                <Trash className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'parametres' && (
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6">
                                    <h2 className="text-base md:text-lg font-semibold mb-4">Paramètres du site</h2>
                                    <form onSubmit={handleSettingsSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom du site</label>
                                            <input name="siteName" type="text" defaultValue={settings.siteName || 'Luxury Drive'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                                            <input name="phone" type="number" defaultValue={settings.phone || '212xxxxxx'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email de contact</label>
                                            <input name="contactEmail" type="email" defaultValue={settings.contactEmail || 'admin@luxurydrive.com'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Facebook</label>
                                            <input name="facebook" type="url" defaultValue={settings.facebook || 'facebook.com'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instagram</label>
                                            <input name="instagram" type="url" defaultValue={settings.instagram || 'instagram.com'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse</label>
                                            <input name="adress" type="text" defaultValue={settings.adress || 'Adress'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lien GPS</label>
                                            <input name="gps" type="url" defaultValue={settings.gps || 'gps'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" required />
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

            {/* Modals */}
            {showAddModal === 'car' && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-2 md:p-4">
                        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        <div className="relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl w-full max-w-md md:max-w-lg">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                if (editingItem) handleUpdateCar(editingItem.id, formData);
                                else handleAddCar(formData);
                            }}>
                                <div className="p-3 md:p-6">
                                    <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-3 md:mb-4">{editingItem ? 'Modifier le véhicule' : 'Ajouter un véhicule'}</h3>
                                    <div className="space-y-3 md:space-y-4">
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom du véhicule</label>
                                            <input name="name" type="text" defaultValue={editingItem?.name || ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marque</label>
                                            <input name="brand" type="text" defaultValue={editingItem?.brand || ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prix par jour (DH)</label>
                                            <input name="price" type="number" defaultValue={editingItem?.price || ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                            <textarea name="description" className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" defaultValue={editingItem?.description || ''} rows="2 md:rows-3" />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Accélération (0-100 km/h)</label>
                                            <input name="acceleration" type="text" defaultValue={editingItem?.acceleration || ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Consommation</label>
                                            <input name="consumption" type="text" defaultValue={editingItem?.consumption || ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Puissance (CV)</label>
                                            <input name="puissance" type="text" defaultValue={editingItem?.puissance || ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Disponibilité</label>
                                            <select name="available" defaultValue={editingItem?.available.toString() || 'true'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700">
                                                <option value="true">Disponible</option>
                                                <option value="false">Non disponible</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image du véhicule</label>
                                            <input type="file" name="image" accept="image/*" className="w-full text-sm" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 px-3 py-2 md:px-6 md:py-3 flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-3">
                                    <button type="submit" className="w-full md:w-auto px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm md:text-base">{editingItem ? 'Modifier' : 'Ajouter'}</button>
                                    <button type="button" onClick={() => { setShowAddModal(null); setEditingItem(null); }} className="w-full md:w-auto px-3 py-1 md:px-4 md:py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 text-sm md:text-base">Annuler</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showAddModal === 'customer' && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-2 md:p-4">
                        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        <div className="relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl w-full max-w-md md:max-w-lg">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const customerData = Object.fromEntries(new FormData(e.target));
                                if (editingItem) handleUpdateCustomer(editingItem.id, customerData);
                                else handleAddCustomer(customerData);
                            }}>
                                <div className="p-3 md:p-6">
                                    <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-3 md:mb-4">{editingItem ? 'Modifier le client' : 'Ajouter un client'}</h3>
                                    <div className="space-y-3 md:space-y-4">
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                                            <input name="name" type="text" defaultValue={editingItem?.name || ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                                            <input name="phone" type="text" defaultValue={editingItem?.phone || ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                            <input name="email" type="email" defaultValue={editingItem?.email || ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 px-3 py-2 md:px-6 md:py-3 flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-3">
                                    <button type="submit" className="w-full md:w-auto px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm md:text-base">{editingItem ? 'Modifier' : 'Ajouter'}</button>
                                    <button type="button" onClick={() => { setShowAddModal(null); setEditingItem(null); }} className="w-full md:w-auto px-3 py-1 md:px-4 md:py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 text-sm md:text-base">Annuler</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showAddModal === 'reservation' && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-2 md:p-4">
                        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        <div className="relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl w-full max-w-md md:max-w-lg">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const reservationData = Object.fromEntries(new FormData(e.target));
                                if (editingItem) handleUpdateReservation(editingItem.id, reservationData);
                                else handleAddReservation(reservationData);
                            }}>
                                <div className="p-3 md:p-6">
                                    <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-3 md:mb-4">{editingItem ? 'Modifier la réservation' : 'Ajouter une réservation'}</h3>
                                    <div className="space-y-3 md:space-y-4">
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client</label>
                                            <select name="customer_id" defaultValue={editingItem?.customer_id || ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required>
                                                <option value="">Sélectionner un client</option>
                                                {customers.map(customer => (
                                                    <option key={customer.id} value={customer.id}>{customer.name} ({customer.phone})</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Véhicule</label>
                                            <select name="car_id" defaultValue={editingItem?.car_id || ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required>
                                                <option value="">Sélectionner un véhicule</option>
                                                {cars.map(car => (
                                                    <option key={car.id} value={car.id}>{car.name} ({car.brand})</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date de début</label>
                                            <input name="start_date" type="datetime-local" defaultValue={editingItem?.start_date ? new Date(editingItem.start_date).toISOString().slice(0, 16) : ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date de fin</label>
                                            <input name="end_date" type="datetime-local" defaultValue={editingItem?.end_date ? new Date(editingItem.end_date).toISOString().slice(0, 16) : ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Statut</label>
                                            <select name="status" defaultValue={editingItem?.status || 'pending'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700">
                                                <option value="pending">En attente</option>
                                                <option value="active">Active</option>
                                                <option value="completed">Terminée</option>
                                                <option value="canceled">Annulée</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 px-3 py-2 md:px-6 md:py-3 flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-3">
                                    <button type="submit" className="w-full md:w-auto px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm md:text-base">{editingItem ? 'Modifier' : 'Ajouter'}</button>
                                    <button type="button" onClick={() => { setShowAddModal(null); setEditingItem(null); }} className="w-full md:w-auto px-3 py-1 md:px-4 md:py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 text-sm md:text-base">Annuler</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showAddModal === 'testimonial' && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-2 md:p-4">
                        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        <div className="relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl w-full max-w-md md:max-w-lg">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const testimonialData = Object.fromEntries(new FormData(e.target));
                                if (editingItem) handleUpdateTestimonial(editingItem.id, testimonialData);
                                else handleAddTestimonial(testimonialData);
                            }}>
                                <div className="p-3 md:p-6">
                                    <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-3 md:mb-4">{editingItem ? 'Modifier le témoignage' : 'Ajouter un témoignage'}</h3>
                                    <div className="space-y-3 md:space-y-4">
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                                            <input name="name" type="text" defaultValue={editingItem?.name || ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rôle</label>
                                            <input name="role" type="text" defaultValue={editingItem?.role || ''} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contenu</label>
                                            <textarea name="content" className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" defaultValue={editingItem?.content || ''} rows="2 md:rows-3" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Note (1-5)</label>
                                            <input name="rating" type="number" min="1" max="5" defaultValue={editingItem?.rating || '5'} className="w-full px-2 py-1 md:px-3 md:py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 px-3 py-2 md:px-6 md:py-3 flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-3">
                                    <button type="submit" className="w-full md:w-auto px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm md:text-base">{editingItem ? 'Modifier' : 'Ajouter'}</button>
                                    <button type="button" onClick={() => { setShowAddModal(null); setEditingItem(null); }} className="w-full md:w-auto px-3 py-1 md:px-4 md:py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 text-sm md:text-base">Annuler</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showConfirmDelete && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-2 md:p-4">
                        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        <div className="relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl w-full max-w-md md:max-w-lg">
                            <div className="p-3 md:p-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-100 dark:bg-red-900">
                                        <Trash className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div className="ml-3 md:ml-4">
                                        <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white">
                                            Supprimer {showConfirmDelete.type === 'car' ? 'ce véhicule' : showConfirmDelete.type === 'customer' ? 'ce client' : showConfirmDelete.type === 'reservation' ? 'cette réservation' : 'ce témoignage'}
                                        </h3>
                                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            Êtes-vous sûr de vouloir supprimer cet élément ? Cette action ne peut pas être annulée.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 px-3 py-2 md:px-6 md:py-3 flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-3">
                                <button onClick={() => {
                                    if (showConfirmDelete.type === 'car') handleDeleteCar(showConfirmDelete.id);
                                    else if (showConfirmDelete.type === 'customer') handleDeleteCustomer(showConfirmDelete.id);
                                    else if (showConfirmDelete.type === 'reservation') handleDeleteReservation(showConfirmDelete.id);
                                    else if (showConfirmDelete.type === 'testimonial') handleDeleteTestimonial(showConfirmDelete.id);
                                    setShowConfirmDelete(null);
                                }} className="w-full md:w-auto px-3 py-1 md:px-4 md:py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm md:text-base">Supprimer</button>
                                <button onClick={() => setShowConfirmDelete(null)} className="w-full md:w-auto px-3 py-1 md:px-4 md:py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 text-sm md:text-base">Annuler</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;