import React from 'react';
import './ImageGallery.css'; // Import your CSS file for styling
import NavigationToolbar from './NavigationToolbar';

const ImageGallery = () => {
  return (
    <div className="image-gallery-container">
      <h1 className="gallery-title">Model Analysis</h1>
      <div className="image-row">
        <div className="image-item">
          <img src="image1.jpg" alt="Image 1" style={{ width: '800px', height: '600px' }} />
          <p className="image-label">Decision Tree snapshot with foucus on root nodes where decision is made.</p>
        </div>
        <div className="image-item">
          <img src="image2.jpg" alt="Image 2" style={{ width: '800px', height: '600px' }} />
          <p className="image-label">Confusion Matrix for the features provided to the model.</p>
        </div>
      </div>
      <div className="image-row">
        <div className="image-item">
          <img src="image3.jpg" alt="Image 3" style={{ width: '800px', height: '600px' }} />
          <p className="image-label">Distribution of crime types across the dataset.</p>
        </div>
        <div className="image-item">
          <img src="image4.jpg" alt="Image 4" style={{ width: '800px', height: '600px' }} />
          <p className="image-label">Cluster Map for crimes divided by types.</p>
        </div>
        <NavigationToolbar />
      </div>
    </div>
  );
};

export default ImageGallery;

