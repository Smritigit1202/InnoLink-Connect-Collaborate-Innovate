# InnoLink

## **Overview**
InnoLink is a platform designed to connect **innovators, entrepreneurs, and funders**, enabling idea-sharing, collaboration, and investment opportunities. It serves as a bridge between **business-minded individuals** seeking funding and investors looking for promising ventures.

---

## **Tech Stack**
- **Frontend:** React, Tailwind CSS
- **Backend:** Django (Django REST Framework - DRF)
- **Database:** SQLite3
- **Authentication:** DRF Authentication


---

## **Features**

### **1. Authentication & Onboarding**
- Users can **Sign Up / Log In** securely.
- Introduction page to explain InnoLink’s purpose.

### **2. Home Page (Image-Based Posts)**
- Users can **share business-related images** (e.g., books, events, strategies).
- Suggested profiles.
- Access personal **Profile Section**.

### **3. Explore Page (Text-Based Business Ideas)**
- Users can **post and browse startup ideas**.
- **Uplike / Dislike system** for idea ranking.
- **Funding Feature:** Investors can **fund a startup** via Paytm API.
- 
### **4. Pitch an Idea**
- Users submit **detailed startup descriptions**.
- Industry selection through a dropdown.
- Specify **funding goals** and collaboration needs.
- Option to **upload an image** with the pitch.

### **5. Investment & Engagement**
- Users can track **who has invested** in their business.
- Engagement via **comments and voting**.

### **6. Profile Section**
- Display user details (Username, Email, Age, etc.).
- Option to **edit profile**.
- View **past image and text-based posts**.

---

## **Installation & Setup**

### **1. Clone the Repository**
```bash
$ git clone https://github.com/smritigit1202/InnoLink-Connect-Collaborate-Innovate.git
$ cd innoLink
```

### **2. Backend (Django Setup)**
#### **Create Virtual Environment & Install Dependencies**
```bash
$ python -m venv env
$ source env/bin/activate   # For Linux/macOS
$ env\Scripts\activate     # For Windows
```

#### **Run Migrations & Start Server**
```bash
$ python manage.py migrate
$ python manage.py runserver
```

### **3. Frontend (React Setup)**
#### **Install Dependencies**
```bash
$ npm install
```

#### **Start Development Server**
```bash
$ npm start
```

---

## **Future Enhancements**
- Implement **Redis caching** for faster performance.
- Add **WebSockets** for real-time engagement.
- CI/CD pipeline for **automated deployment** on AWS.

---

## **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a **Pull Request**.

---

