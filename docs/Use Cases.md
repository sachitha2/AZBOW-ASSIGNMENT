**functional** and **non-functional requirements**:

---

## **Functional Requirements**

1. **Display all cosmetic products on the home page**  
   - **Actor:** User  
   - **Description:** The user visits the home page and views a list of products with details.  

2. **Product details on the home page**  
   - **Actor:** System  
   - **Description:** Each product displayed includes:  
     - Product image  
     - Product name  
     - Product price  
     - Product category  

3. **Pagination on the home page**  
   - **Actor:** User  
   - **Description:** Users can navigate between pages to view more products.

4. **View a single product**  
   - **Actor:** User  
   - **Description:** Users can click on a product to open a new page/view showing its detailed information:  
     - Product image  
     - Product name  
     - Product price  
     - Product description  
     - Product usage  

5. **CRUD operations for products (RESTful API)**  
   - **Actor:** Admin/System  
   - **Description:** The API provides endpoints to perform:  
     - Create a new product  
     - Retrieve product details  
     - Update existing product information  
     - Delete a product  

6. **Cross-device and cross-browser compatibility**  
   - **Actor:** User  
   - **Description:** The website should function seamlessly on various devices (desktop, tablet, mobile) and browsers (e.g., Chrome, Firefox, Safari, Edge).  

---

## **Non-Functional Requirements**

1. **Cross-device and cross-browser compatibility**  
   - Ensure consistent performance across devices and browsers.

2. **Performance**  
   - Product data loading (including pagination) must be fast and responsive.

3. **Scalability**  
   - The system should handle an increasing number of products efficiently.

4. **Security**  
   - Ensure secure CRUD operations (e.g., validating inputs and protecting the RESTful API).  

5. **Maintainability**  
   - Code should be modular and easy to maintain or extend.

6. **Usability**  
   - User-friendly interface with intuitive navigation and proper error handling.  

7. **Testing**  
   - Unit tests for both front-end and back-end components.

8. **Deployment**  
   - Instructions provided in `README.md` for running the project.
