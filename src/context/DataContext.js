import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [cars, setCars] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [settings, setSettings] = useState({
      siteName: 'Luxury Drive',
      phone:'212xxxxxx',
      contactEmail: 'admin@luxurydrive.com',
      instagram : 'instagram.com',
      facebook : 'facebook.com',
      adress : 'adress',
      gps : 'gps',
      maintenanceMode: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = 'https://luxury-drive-back.onrender.com//api';

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
            throw new Error('Failed to fetch data');
        }
        const carsData = await carsRes.json();
        const reservationsData = await reservationsRes.json();
        const customersData = await customersRes.json();
        const testimonialsData = await testimonialsRes.json();
        console.log('Fetched Testimonials:', testimonialsData); // Debug log
        setTestimonials(testimonialsData);
        const settingsData = await settingsRes.json();

        setCars(carsData);
        setReservations(reservationsData);
        setCustomers(customersData);
        setSettings({
            siteName: settingsData.site_name,
            phone: settingsData.phone,
            contactEmail: settingsData.contact_email,
            instagram: settingsData.instagram,
            facebook: settingsData.facebook,
            adress: settingsData.adress,
            gps: settingsData.gps,
            maintenanceMode: settingsData.maintenance_mode === 1,
        });
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        setIsLoading(false);
    }
};
    const addCar = async (formData) => {
        const response = await fetch(`${API_BASE_URL}/cars`, { method: 'POST', body: formData });
        if (!response.ok) throw new Error('Failed to add car');
        const addedCar = await response.json();
        setCars([...cars, addedCar]);
        return addedCar;
    };

    const updateCar = async (id, formData) => {
        const response = await fetch(`${API_BASE_URL}/cars/${id}`, { method: 'PUT', body: formData });
        if (!response.ok) throw new Error('Failed to update car');
        const updatedCar = await response.json();
        setCars(cars.map(car => (car.id === id ? updatedCar : car)));
        return updatedCar;
    };

    const deleteCar = async (id) => {
        const response = await fetch(`${API_BASE_URL}/cars/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete car');
        setCars(cars.filter(car => car.id !== id));
    };

    const addCustomer = async (customerData) => {
        const response = await fetch(`${API_BASE_URL}/customers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData),
        });
        if (!response.ok) throw new Error('Failed to add customer');
        const addedCustomer = await response.json();
        setCustomers([...customers, addedCustomer]);
        return addedCustomer;
    };

    const updateCustomer = async (id, customerData) => {
        const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData),
        });
        if (!response.ok) throw new Error('Failed to update customer');
        const updatedCustomer = await response.json();
        setCustomers(customers.map(cust => (cust.id === id ? updatedCustomer : cust)));
        return updatedCustomer;
    };

    const deleteCustomer = async (id) => {
        const response = await fetch(`${API_BASE_URL}/customers/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete customer');
        setCustomers(customers.filter(cust => cust.id !== id));
    };

    const addReservation = async (reservationData) => {
        const response = await fetch(`${API_BASE_URL}/reservations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservationData),
        });
        if (!response.ok) throw new Error('Failed to add reservation');
        const addedReservation = await response.json();
        setReservations([...reservations, addedReservation]);
        await fetchData(); // Refresh all data to sync car availability and customer stats
        return addedReservation;
    };

    const updateReservation = async (id, reservationData) => {
        const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservationData),
        });
        if (!response.ok) throw new Error('Failed to update reservation');
        const updatedReservation = await response.json();
        setReservations(reservations.map(res => (res.id === id ? updatedReservation : res)));
        await fetchData(); // Refresh all data
        return updatedReservation;
    };

    const deleteReservation = async (id) => {
        const response = await fetch(`${API_BASE_URL}/reservations/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete reservation');
        setReservations(reservations.filter(res => res.id !== id));
        await fetchData(); // Refresh all data
    };

    

    const updateSettings = async (settingsData) => {
      try {
          const response = await fetch(`${API_BASE_URL}/settings`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(settingsData),
          });
          if (!response.ok) throw new Error('Failed to update settings');
          const updatedSettings = await response.json();
          console.log('Updated settings from API:', updatedSettings); // Debug here
          setSettings({
              siteName: updatedSettings.site_name,
             phone: updatedSettings.phone,
              contactEmail: updatedSettings.contact_email,
              facebook: updatedSettings.facebook,
              instagram: updatedSettings.instagram,
              adress: updatedSettings.adress,
              gps: updatedSettings.gps,
              maintenanceMode: updatedSettings.maintenance_mode === 1,
          });
          return updatedSettings;
      } catch (error) {
          console.error('Error updating settings:', error);
          throw error;
      }
  };

  //Testimonials
  const addTestimonial = async (testimonialData) => {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialData),
    });
    if (!response.ok) throw new Error('Failed to add testimonial');
    const addedTestimonial = await response.json();
    await fetchData(); // Refresh all data
    return addedTestimonial;
};

const updateTestimonial = async (id, testimonialData) => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialData),
    });
    if (!response.ok) throw new Error('Failed to update testimonial');
    const updatedTestimonial = await response.json();
    setTestimonials(testimonials.map(t => (t.id === id ? updatedTestimonial : t)));
    return updatedTestimonial;
};

const deleteTestimonial = async (id) => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete testimonial');
    setTestimonials(testimonials.filter(t => t.id !== id));
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
            addTestimonial, // Add testimonial functions
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