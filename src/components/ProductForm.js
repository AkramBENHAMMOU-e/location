// components/ProductForm.js
import React, { useState } from 'react';

function ProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    nom: '',
    brand: '',
    fileName: '',
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      setFile(selectedFile);
      
      // Créer un aperçu de l'image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.brand || !file) {
      setMessage('Veuillez remplir tous les champs et sélectionner une image');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const data = new FormData();
      data.append('nom', formData.nom);
      data.append('brand', formData.brand);
      data.append('image', file);
      data.append('fileName', formData.fileName);

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Produit ajouté avec succès!');
        setFormData({ nom: '', brand: '' });
        setFile(null);
        setPreviewUrl('');
        onProductAdded();
      } else {
        const error = await response.json();
        setMessage(`Erreur: ${error.message}`);
      }
    } catch (error) {
      setMessage(`Erreur de connexion au serveur: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Ajouter un Produit</h2>
      {message && <div className={message.includes('succès') ? 'success' : 'error'}>{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom du produit"
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Marque</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Marque du produit"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="Aperçu" />
          </div>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Envoi en cours...' : 'Ajouter Produit'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;