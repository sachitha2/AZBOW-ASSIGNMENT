const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

// API Endpoint
const API_URL = 'http://localhost:3000/api/product-images';

// Path to the images folder
const IMAGES_DIR = './images';

// Function to upload images for each product
const uploadImages = async () => {
    try {
        // Read all product folders inside the images directory
        const productFolders = fs.readdirSync(IMAGES_DIR);

        for (const folder of productFolders) {
            const productPath = path.join(IMAGES_DIR, folder);

            if (fs.statSync(productPath).isDirectory()) {
                const productId = folder; // Folder name represents the product ID
                console.log(`Uploading images for Product ID: ${productId}`);

                // Read all image files in the product folder
                const files = fs.readdirSync(productPath);

                for (const file of files) {
                    const filePath = path.join(productPath, file);

                    if (fs.statSync(filePath).isFile()) {
                        const formData = new FormData();
                        formData.append('product_id', productId);
                        formData.append('image', fs.createReadStream(filePath));

                        try {
                            // Send the POST request
                            const response = await axios.post(API_URL, formData, {
                                headers: formData.getHeaders(),
                            });
                            console.log(`Uploaded: ${file} for Product ID: ${productId}`);
                        } catch (error) {
                            console.error(`Failed to upload ${file} for Product ID: ${productId}`);
                            console.error(error.message);
                        }
                    }
                }
            }
        }
        console.log('Image upload process completed.');
    } catch (error) {
        console.error('Error processing images:', error.message);
    }
};

// Run the script
uploadImages();
