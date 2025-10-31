# 🧭 BookIt

BookIt is a full-stack experience booking platform that allows users to browse experiences, view available slots, apply promo codes, and confirm bookings. It's built with **Next.js**, **Express.js**, and **Prisma**, offering a seamless and responsive experience.

---

## 🚀 Features

- 🏝️ Browse and explore curated experiences  
- 🗓️ View available slots by date and time  
- 💰 Apply promo codes for discounts  
- 📦 Real-time slot availability updates  
- 🔐 Secure booking flow  

---

## 🧩 Tech Stack

**Frontend:** Next.js, TypeScript, Tailwind CSS  
**Backend:** Express.js, Prisma, Node.js  
**Database:** PostgreSQL  
**Deployment:** Vercel (Frontend) + Render / Railway (Backend)

---

## ⚙️ Project Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Mohfazam/BookIt.git
cd BookIt
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/bookit"
```

Generate Prisma client and start the server:

```bash
npx prisma generate
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

---

## 🧱 Folder Structure

```
BookIt/
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── routes/
│   │   └── index.ts
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   └── lib/
    ├── package.json
    └── .env.local
```

---

## 🔗 API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/public/experiences` | Fetch all experiences |
| GET | `/api/public/experiences/:id` | Fetch single experience details |
| GET | `/api/public/promos/:code` | Validate a promo code |

### Booking Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/book` | Create a booking |

---

## 🧠 Promo Code Logic

- Each promo has a code (`SAVE10`, `FLAT100`)
- Can be percentage-based or flat value
- Automatically checks validity and status before applying

---

## 🧑‍💻 Developer

**Mohammed Sarwar Khan**

- [Resume](https://drive.google.com/file/d/1qD-kUkfvaTRNuQuBgZ1d8-qxxSw2l31k/view?usp=drive_link)
- [LinkedIn](https://www.linkedin.com/in/mohammed-sarwar-khan)
- [GitHub](https://github.com/Mohfazam)

---

## 📦 Deployment

- **Frontend:** Vercel → https://bookit.vercel.app
- **Backend:** Vercel

---

| Method | Endpoint              | Description                                                                                  | Access  |
|:-------|:----------------------|:---------------------------------------------------------------------------------------------|:--------|
| GET    | `/api/experiences`    | Fetch all experiences (title, image, description, price, etc.)                               | Public  |
| GET    | `/api/experiences/:id`| Fetch details of a single experience (with available slots)                                  | Public  |
| POST   | `/api/bookings`       | Create a new booking (with user details, selected slot, and promo code if applicable)        | Public  |
| POST   | `/api/promo/validate` | Validate a promo code (e.g., `SAVE10`, `FLAT100`)                                            | Public  |

---

## 🔒 Developer-Only Endpoints (For Seeding / Admin Use)

| Method | Endpoint              | Description                                                                                  | Access          |
|:-------|:----------------------|:---------------------------------------------------------------------------------------------|:----------------|
| POST   | `/api/dev/experiences`| Add a new experience with title, image, description, price, location, etc.                   | Developer Only - ✅  |
| POST   | `/api/dev/slots`      | Add available date and time slots for a specific experience                                  | Developer Only  |
| POST   | `/api/dev/promos`     | Add or update promo codes (type: percentage or flat discount)                                | Developer Only  |
