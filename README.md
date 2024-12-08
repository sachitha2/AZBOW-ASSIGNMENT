

## **Setup Instructions**

### **Backend Setup** (`api`)
1. **Clone the repository:**
   ```bash
   git clone <repository-link>
   cd api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the database:**
   - Create a database:
     ```sql
     CREATE DATABASE shop_app;
     ```
   - Import the provided `data.sql` file:
     ```bash
     mysql -u root -p shop_app < data.sql
     ```

4. **Set environment variables:**
   - Copy the `.env.example` file and configure:
     ```
     DB_NAME=shop_app
     DB_USER=root
     DB_PASSWORD=root
     DB_HOST=localhost
     DB_PORT=9008
     BACKEND_PORT=3000
     ```

5. **Start the backend server:**
   ```bash
   npm start
   ```
   - Backend API will run at: **`http://localhost:3000`**

6. **Run Unit Tests:**
   ```bash
   npx jest
   ```

---

### **Frontend Setup** (`web_app`)
1. **Navigate to the frontend path:**
   ```bash
   cd web_app
   ```

2. **Install dependencies:**
   - Recommended:
     ```bash
     npm i
     ```
   - Use this if you encounter dependency conflicts:
     ```bash
     npm i --legacy-peer-deps
     ```

3. **Start the frontend server:**
   ```bash
   npm run dev
   ```
   - Frontend will run at: **`http://localhost:3001`**.

---

## **Folder Structure**
```
project-root/
│-- api/             # Backend folder
│   ├── src/
│   ├── .env.example
│   ├── package.json
│-- web_app/         # Frontend folder
│   ├── src/
│   ├── package.json
│-- docs/
│   ├── ER_Diagram.pdf
│   ├── Use_Cases.pdf
│   ├── postman_collection.json
│-- README.md
```

---

## **Testing**
- **Backend Tests:**
   ```bash
   npx jest
   ```
- **Frontend Tests:** (Framework-specific, optional)  
   ```bash
   npm test
   ```

---

