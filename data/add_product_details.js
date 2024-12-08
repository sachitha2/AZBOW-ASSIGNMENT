const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const axios = require('axios');

// API Endpoint
const API_URL = 'http://localhost:3000/api/product-details';

// Path to the CSV file
const CSV_FILE = './products.csv';

// Function to upload product details
const uploadProductDetails = async () => {
    try {
        // Read the CSV file
        const products = [];

        fs.createReadStream(CSV_FILE)
            .pipe(csv())
            .on('data', (row) => {
                // Push each row to the products array
                products.push({
                    product_id: row.id,
                    product_description: row.product_description,
                    directions: row.directions
                });
            })
            .on('end', async () => {
                console.log('CSV file successfully processed.');

                // Loop through each product and send POST requests
                for (const product of products) {
                    try {
                        const response = await axios.post(API_URL, product, {
                            headers: { 'Content-Type': 'application/json' }
                        });

                        console.log(`Uploaded: Product ID ${product.product_id}`);
                    } catch (error) {
                        console.error(`Failed to upload Product ID: ${product.product_id}`);
                        console.error(error.message);
                    }
                }

                console.log('Product details upload process completed.');
            });
    } catch (error) {
        console.error('Error processing product details:', error.message);
    }
};

// Run the function
uploadProductDetails();
