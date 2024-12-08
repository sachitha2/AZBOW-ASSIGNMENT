import sequelize from './db'
// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection successful!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close(); // Close the connection
    }
};

// Run the test
testConnection();
