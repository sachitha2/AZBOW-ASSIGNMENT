const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

// File path to product_categories.csv
const filePath = './product_categories.csv';

// API endpoint
const apiUrl = 'http://localhost:3000/api/categories';

// Function to add categories to the API
const addCategories = async () => {
    try {
        const categories = [];
        
        // Read CSV file
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                if (row.category) categories.push(row.category);
            })
            .on('end', async () => {
                console.log('CSV file successfully processed.');
                
                // Loop through categories and send POST requests
                for (const category of categories) {
                    try {
                        const response = await axios.post(apiUrl, {
                            category_name: category
                        }, {
                            headers: { 'Content-Type': 'application/json' }
                        });

                        console.log(`Added category: ${category} | Response:`, response.status);
                    } catch (error) {
                        console.error(`Failed to add category: ${category} | Error:`, error.message);
                    }
                }
            });
    } catch (err) {
        console.error('Error processing categories:', err.message);
    }
};

// Start adding categories
addCategories();
