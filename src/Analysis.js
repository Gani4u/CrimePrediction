import React from 'react';
import './ImageGallery.css'; // Import your CSS file for styling

const ImageGallery = () => {
  return (
    <div className="image-gallery-container">
      <h2 className="gallery-title">Image Gallery</h2>
      <div className="image-row">
        <div className="image-item">
          <img src="image1.jpg" alt="Image 1" />
          <p className="image-label">Image 1 Label</p>
        </div>
        <div className="image-item">
          <img src="image2.jpg" alt="Image 2" />
          <p className="image-label">Image 2 Label</p>
        </div>
      </div>
      <div className="image-row">
        <div className="image-item">
          <img src="image3.jpg" alt="Image 3" />
          <p className="image-label">Image 3 Label</p>
        </div>
        <div className="image-item">
          <img src="image4.jpg" alt="Image 4" />
          <p className="image-label">Image 4 Label</p>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

