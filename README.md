# InvestHub

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application developed as part of the **Nexachain AI Technical Assessment**.

---

# Project Setup Steps

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/investment-platform.git
```

## 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

Run the backend server:

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
```

Run the frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

# Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

NODE_ENV=development

CLIENT_URL=http://localhost:5173
```

Create a `.env` file inside the **frontend** folder.
```env
VITE_API_URL=http://localhost:5000/api
```

---
# 📖 API Documentation

## Base URL

```text
http://localhost:5000/api
```

---

# Authentication APIs

## Register User

**Endpoint**

```http
POST /api/auth/register
```

**Description**

Registers a new user. Users can optionally register using a referral code.

### Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "password": "password123",
  "referralCode": "REF-ABC123"
}
```

### Success Response (201)

```json
{
  "success": true,
  "message": "User registered successfully."
}
```

---

## Login User

**Endpoint**

```http
POST /api/auth/login
```

**Description**

Authenticates a user and returns a JWT token.

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response (200)

```json
{
  "success": true,
  "message": "Login successful.",
  "token": "<JWT_TOKEN>"
}
```

---

## Get User Profile

**Endpoint**

```http
GET /api/auth/profile
```

**Authentication**

Bearer Token Required

### Headers

```text
Authorization: Bearer <JWT_TOKEN>
```

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobile": "9876543210",
    "walletBalance": 1500,
    "totalROIEarned": 400,
    "totalLevelIncomeEarned": 200,
    "accountStatus": "ACTIVE"
  }
}
```

---

# Investment APIs

## Create Investment

**Endpoint**

```http
POST /api/investments/create
```

**Authentication**

Bearer Token Required

### Headers

```text
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "amount": 5000,
  "plan": "Boost",
  "duration": 45,
  "dailyROIPercentage": 1.5
}
```

### Success Response (201)

```json
{
  "success": true,
  "message": "Investment created successfully."
}
```

---

## Get User Investments

**Endpoint**

```http
GET /api/investments
```

**Authentication**

Bearer Token Required

### Headers

```text
Authorization: Bearer <JWT_TOKEN>
```

### Success Response (200)

```json
{
  "success": true,
  "count": 2,
  "data": []
}
```

---

# Dashboard APIs

## Get Dashboard Summary

**Endpoint**

```http
GET /api/dashboard
```

**Authentication**

Bearer Token Required

### Headers

```text
Authorization: Bearer <JWT_TOKEN>
```

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "totalInvestments": 25000,
    "totalROIEarned": 1200,
    "totalLevelIncomeEarned": 350,
    "walletBalance": 1550
  }
}
```

---

# Referral APIs

## Get Direct Referrals

**Endpoint**

```http
GET /api/referrals/direct
```

**Authentication**

Bearer Token Required

### Success Response (200)

```json
{
  "success": true,
  "count": 3,
  "data": []
}
```

---

## Get Referral Tree

**Endpoint**

```http
GET /api/referrals/tree
```

**Authentication**

Bearer Token Required

### Success Response (200)

```json
{
  "success": true,
  "data": [
    {
      "user": {},
      "referrals": []
    }
  ]
}
```

---

# ROI History APIs

## Get ROI History

**Endpoint**

```http
GET /api/roi-history
```

**Authentication**

Bearer Token Required

### Success Response (200)

```json
{
  "success": true,
  "count": 15,
  "data": []
}
```

---

# Referral Income APIs

## Get Referral Income History

**Endpoint**

```http
GET /api/referral-income
```

**Authentication**

Bearer Token Required

### Success Response (200)

```json
{
  "success": true,
  "count": 6,
  "data": []
}
```

---

# Authentication

All protected endpoints require a JWT token.

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# API Summary

| Method | Endpoint | Description | Authentication |
|---------|----------|-------------|----------------|
| POST | `/api/auth/register` | Register a new user | ❌ No |
| POST | `/api/auth/login` | Login user | ❌ No |
| GET | `/api/auth/profile` | Get logged-in user profile | ✅ Yes |
| POST | `/api/investments/create` | Create investment | ✅ Yes |
| GET | `/api/investments` | Get investment history | ✅ Yes |
| GET | `/api/dashboard` | Dashboard summary | ✅ Yes |
| GET | `/api/referrals/direct` | Get direct referrals | ✅ Yes |
| GET | `/api/referrals/tree` | Get referral hierarchy | ✅ Yes |
| GET | `/api/roi-history` | Get ROI history | ✅ Yes |
| GET | `/api/referral-income` | Get referral income history | ✅ Yes |
---

# Assumptions Made During Development

The following assumptions were made during the implementation as certain business rules were not explicitly defined in the assessment:

1. **Investment Plans**
   - Five investment plans were assumed with predefined investment ranges, daily ROI percentages, and durations:
     | Plan | Investment Amount | Daily ROI | Duration |
     |------|-------------------|-----------|----------|
     | Launch | ₹1,000 – ₹4,999 | 1% | 30 Days |
     | Boost | ₹5,000 – ₹9,999 | 1.5% | 45 Days |
     | Orbit | ₹10,000 – ₹24,999 | 2% | 60 Days |
     | Nova | ₹25,000 – ₹49,999 | 2.5% | 90 Days |
     | Galaxy | ₹50,000 and above | 3% | 120 Days |

2. **Referral Income Distribution**
   - A three-level referral system was assumed for distributing referral income.
   - Referral income percentages are:
     - Level 1: **10%**
     - Level 2: **5%**
     - Level 3: **2%**
   - No referral income is distributed beyond Level 3.

