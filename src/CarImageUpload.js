import React, { useState } from 'react';

// Add this to your car modal form
const CarImageUpload = ({ defaultImage, onImageChange }) => {
  const [previewUrl, setPreviewUrl] = useState(defaultImage || '/cars/default.jpg');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    // Create a preview URL for the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
      setIsUploading(false);
      
      // Pass the file or URL back to parent component
      if (onImageChange) {
        // For a real implementation, you would upload the file to your server/cloud storage
        // and then pass the resulting URL
        onImageChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Image du véhicule
      </label>
      
      <div className="mt-1 flex items-center">
        <div className="w-32 h-24 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Car preview" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-500 dark:text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>
        
        <div className="ml-4">
          <label className="cursor-pointer bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            {isUploading ? 'Chargement...' : 'Choisir une image'}
            <input 
              type="file" 
              className="sr-only" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG, GIF jusqu'à 5MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarImageUpload;