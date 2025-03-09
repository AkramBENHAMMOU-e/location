import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [cars, setCars] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [settings, setSettings] = useState({
    siteName: 'YLH CAR',
    phone: '212661918917',
    contactEmail: 'reservation@ylhcar.ma',
    instagram: 'https://instagram.com/ylhcarofficiel',
    facebook: 'https://www.facebook.com/YLHCAR',
    adress: 'Bouchouk résidence annakhil 2, Salé',
    gps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.566074414049!2d-6.785799300000001!3d34.0806362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda769b090183891%3A0x39e21bb9b22eafd5!2sYLH%20CAR!5e0!3m2!1sfr!2sma!4v1741453156087!5m2!1sfr!2sma',
    maintenanceMode: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = 'https://backend-iota-peach.vercel.app/api';

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [carsRes, reservationsRes, customersRes, testimonialsRes, settingsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/cars`),
        fetch(`${API_BASE_URL}/reservations`),
        fetch(`${API_BASE_URL}/customers`),
        fetch(`${API_BASE_URL}/testimonials`),
        fetch(`${API_BASE_URL}/settings`),
      ]);

      if (!carsRes.ok || !reservationsRes.ok || !customersRes.ok || !testimonialsRes.ok || !settingsRes.ok) {
        throw new Error('Échec de la récupération des données');
      }

      const carsData = await carsRes.json();
      const reservationsData = await reservationsRes.json();
      const customersData = await customersRes.json();
      const testimonialsData = await testimonialsRes.json();
      const settingsData = await settingsRes.json();

      setCars(carsData);
      setReservations(reservationsData);
      setCustomers(customersData);
      setTestimonials(testimonialsData);
      setSettings({
        siteName: settingsData.site_name || 'YLH CAR',
        phone: settingsData.phone || '212661918917',
        contactEmail: settingsData.contact_email || 'reservation@ylhcar.ma',
        instagram: settingsData.instagram || 'https://instagram.com/ylhcarofficiel',
        facebook: settingsData.facebook || 'https://www.facebook.com/YLHCAR',
        adress: settingsData.adress || 'Bouchouk résidence annakhil 2, Salé',
        gps: settingsData.gps || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.566074414049!2d-6.785799300000001!3d34.0806362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda769b090183891%3A0x39e21bb9b22eafd5!2sYLH%20CAR!5e0!3m2!1sfr!2sma!4v1741453156087!5m2!1sfr!2sma',
        maintenanceMode: settingsData.maintenance_mode === 1,
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCar = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cars`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de l’ajout de la voiture : ${errorText}`);
      }
      const addedCar = await response.json();
      setCars((prevCars) => [...prevCars, addedCar]);
      return addedCar;
    } catch (error) {
      console.error('Erreur dans addCar :', error);
      throw error;
    }
  };

  const updateCar = async (id, formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de la mise à jour de la voiture : ${errorText}`);
      }
      const updatedCar = await response.json();
      setCars((prevCars) => prevCars.map((car) => (car.id === id ? updatedCar : car)));
      return updatedCar;
    } catch (error) {
      console.error('Erreur dans updateCar :', error);
      throw error;
    }
  };

  const deleteCar = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de la suppression de la voiture : ${errorText}`);
      }
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (error) {
      console.error('Erreur dans deleteCar :', error);
      throw error;
    }
  };

  const addCustomer = async (customerData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de l’ajout du client : ${errorText}`);
      }
      const addedCustomer = await response.json();
      setCustomers((prevCustomers) => [...prevCustomers, addedCustomer]);
      return addedCustomer;
    } catch (error) {
      console.error('Erreur dans addCustomer :', error);
      throw error;
    }
  };

  const updateCustomer = async (id, customerData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de la mise à jour du client : ${errorText}`);
      }
      const updatedCustomer = await response.json();
      setCustomers((prevCustomers) => prevCustomers.map((cust) => (cust.id === id ? updatedCustomer : cust)));
      return updatedCustomer;
    } catch (error) {
      console.error('Erreur dans updateCustomer :', error);
      throw error;
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de la suppression du client : ${errorText}`);
      }
      setCustomers((prevCustomers) => prevCustomers.filter((cust) => cust.id !== id));
    } catch (error) {
      console.error('Erreur dans deleteCustomer :', error);
      throw error;
    }
  };

  const addReservation = async (reservationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de l’ajout de la réservation : ${errorText}`);
      }
      const addedReservation = await response.json();
      setReservations((prevReservations) => [...prevReservations, addedReservation]);
      await fetchData(); // Rafraîchir toutes les données pour synchroniser
      return addedReservation;
    } catch (error) {
      console.error('Erreur dans addReservation :', error);
      throw error;
    }
  };

  const updateReservation = async (id, reservationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de la mise à jour de la réservation : ${errorText}`);
      }
      const updatedReservation = await response.json();
      setReservations((prevReservations) => prevReservations.map((res) => (res.id === id ? updatedReservation : res)));
      await fetchData(); // Rafraîchir toutes les données
      return updatedReservation;
    } catch (error) {
      console.error('Erreur dans updateReservation :', error);
      throw error;
    }
  };

  const deleteReservation = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de la suppression de la réservation : ${errorText}`);
      }
      setReservations((prevReservations) => prevReservations.filter((res) => res.id !== id));
      await fetchData(); // Rafraîchir toutes les données
    } catch (error) {
      console.error('Erreur dans deleteReservation :', error);
      throw error;
    }
  };

  const updateSettings = async (settingsData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de la mise à jour des paramètres : ${errorText}`);
      }
      const updatedSettings = await response.json();
      setSettings({
        siteName: updatedSettings.site_name || 'YLH CAR',
        phone: updatedSettings.phone || '212661918917',
        contactEmail: updatedSettings.contact_email || 'reservation@ylhcar.ma',
        instagram: updatedSettings.instagram || 'https://instagram.com/ylhcarofficiel',
        facebook: updatedSettings.facebook || 'https://www.facebook.com/YLHCAR',
        adress: updatedSettings.adress || 'Bouchouk résidence annakhil 2, Salé',
        gps: updatedSettings.gps || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.566074414049!2d-6.785799300000001!3d34.0806362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda769b090183891%3A0x39e21bb9b22eafd5!2sYLH%20CAR!5e0!3m2!1sfr!2sma!4v1741453156087!5m2!1sfr!2sma',
        maintenanceMode: updatedSettings.maintenance_mode === 1,
      });
      return updatedSettings;
    } catch (error) {
      console.error('Erreur dans updateSettings :', error);
      throw error;
    }
  };

  const addTestimonial = async (testimonialData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de l’ajout du témoignage : ${errorText}`);
      }
      const addedTestimonial = await response.json();
      setTestimonials((prevTestimonials) => [...prevTestimonials, addedTestimonial]);
      await fetchData(); // Rafraîchir toutes les données
      return addedTestimonial;
    } catch (error) {
      console.error('Erreur dans addTestimonial :', error);
      throw error;
    }
  };

  const updateTestimonial = async (id, testimonialData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de la mise à jour du témoignage : ${errorText}`);
      }
      const updatedTestimonial = await response.json();
      setTestimonials((prevTestimonials) => prevTestimonials.map((t) => (t.id === id ? updatedTestimonial : t)));
      return updatedTestimonial;
    } catch (error) {
      console.error('Erreur dans updateTestimonial :', error);
      throw error;
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de la suppression du témoignage : ${errorText}`);
      }
      setTestimonials((prevTestimonials) => prevTestimonials.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Erreur dans deleteTestimonial :', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        cars,
        reservations,
        customers,
        testimonials,
        settings,
        isLoading,
        addCar,
        updateCar,
        deleteCar,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addReservation,
        updateReservation,
        deleteReservation,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateSettings,
        refreshData: fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}