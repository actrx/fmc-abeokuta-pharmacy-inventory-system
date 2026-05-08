# NHIA Pharmacy Inventory Transfer & Management System

## FMC Abeokuta – Internship Project

---

# 📌 Project Overview

The NHIA Pharmacy Inventory Transfer & Management System is a modern web-based healthcare inventory application developed for the Nigeria Health Insurance Authority (NHIA) Pharmacy Unit at Federal Medical Centre (FMC) Abeokuta.

The system digitizes and automates pharmacy inventory movement, stock monitoring, transfer documentation, and inventory control between pharmacy departments.

---

# 🎯 Objectives

- Digitize pharmacy inventory transfer operations
- Reduce paperwork and manual errors
- Improve accountability and transparency
- Track inventory movement between departments
- Monitor stock balance and reorder levels
- Improve healthcare inventory management

---

# 🏥 Departments

1. Main Store
2. Sub Store
3. Dispensary

---

# 🔄 Transfer Flow Rules

## Main Store → Sub Store
- One-directional transfer only
- Reverse transfer not allowed

## Sub Store ↔ Dispensary
- Bi-directional transfer allowed

---

# 👥 User Roles

## Admin
- Full system access
- Manage users
- View reports

## Main Store Officer
- Transfer inventory to Sub Store

## Sub Store Officer
- Receive from Main Store
- Transfer to Dispensary
- Receive from Dispensary

## Dispensary Officer
- Receive inventory
- Return inventory to Sub Store

---

# 📦 Core Features

## Inventory Management
- Department-specific inventory
- Centralized database architecture
- Stock balance tracking
- Batch number management
- FEFO implementation
- Expiry monitoring

## Transfer Management
- Transfer workflow
- Transfer validation
- Digital signatures
- Transfer history tracking

## Stock Monitoring
- Reorder level alerts
- Low stock warnings
- Out-of-stock detection

## Reporting
- Inventory reports
- Transfer reports
- Expiry reports
- Low-stock reports

---

# 🧮 Selling Price Formula

Selling Price = Cost Price + ((Profit Margin / 100) × Cost Price)

---

# 🛠 Recommended Tech Stack

## Frontend
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend
- Node.js
- Express.js
- TypeScript

## Database
- PostgreSQL
- Prisma ORM

## Authentication
- JWT Authentication

## Validation
- Zod

## File Storage
- Cloudinary

---

# 🚀 Deployment

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |
| Storage | Cloudinary |

---

# 📂 Folder Structure

```bash
nhia-pharmacy-inventory-system/
│
├── client/
├── server/
├── docs/
├── prisma/
└── package.json
```

---

# 📈 Future Improvements

- Barcode scanning
- QR code inventory
- AI stock prediction
- Supplier management
- Procurement module
- Mobile app

---

# 👨‍💻 Internship Project Information

| Item | Details |
|---|---|
| Project Name | NHIA Pharmacy Inventory Transfer & Management System |
| Organization | FMC Abeokuta |
| Department | NHIA Pharmacy Unit |
| Project Type | Internship Project |
