const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

// Path to the updated CSV file
const filePath = './products.csv';

// API Endpoint
const apiUrl = 'http://localhost:3000/api/products';

// Function to add products to the API
const addProducts = async () => {
    const products = [];

    // Read CSV file
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            // Parse category_ids into an array
            const categoryIds = JSON.parse(row.category_ids.replace(/'/g, '"'));

            // Prepare product data
            const product = {
                product_name: row.product_name,
                price: parseFloat(row.price),
                in_stock: parseInt(row.in_stock),
                category_ids: categoryIds
            };
            products.push(product);
        })
        .on('end', async () => {
            console.log('CSV file successfully processed.');

            // Loop through products and send POST requests
            for (const product of products) {
                try {
                    const response = await axios.post(apiUrl, product, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(`Successfully added product: ${product.product_name}`);
                } catch (error) {
                    console.error(`Failed to add product: ${product.product_name} | Error: ${error.message}`);
                }
            }
        });
};

// Start adding products
addProducts();
