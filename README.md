# 🔐 VaultNotes – Sovereign Digital Vault

> Your encrypted sanctuary for notes, links & files — with zero email friction, per-item passwords, and permanent shareable links.

<p align="center">

![Demo](https://img.shields.io/badge/demo-live-amber?style=for-the-badge\&logo=vercel)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

</p>

---

## 🌌 Why VaultNotes?

In a world where every service demands an email, phone number, or 2FA app, **VaultNotes stands apart.**

Born from a college lab’s frustrating reality — where institutional firewalls lock you out of your own data — this platform is a **digital sovereignty toolkit** for the privacy-conscious individual.

> No email.
> No OTP.
> No tracking.
> No noise.

Just you and your encrypted vault, accessible from any browser.

---

# ✨ Core Features

---

## 🔒 Privacy-First Authentication

* Username + password only
* Zero personally identifiable information stored
* No email verification — ever
* JWT stored in **httpOnly cookies**
* Designed to be resistant to XSS attacks

---

## 📦 Three Permanent Public Slots (Free Forever)

Every user receives **3 immutable public endpoints**.

Replace the content anytime — the link never changes.

Perfect for:

* 📄 Resumes that evolve
* 🎨 Portfolios that grow
* 📑 Project briefs that iterate
* 📰 Press kits that update

Example:

```
vaultnotes.app/@sanjay/resume
```

Share once. Update forever.

---

## 📝 Rich Content Ecosystem

### 📝 Text Notes

Full rich-text editor with formatting support.

### 🔗 Link Vault

Save URLs with descriptions and auto previews.

### 📁 File Armory

Upload:

* Images
* PDFs
* Code files
* Documents

Maximum size: **10MB per item**

---

## 🔐 Per-Item Password Protection

Each vault item can be locked with its own password.

Even if someone accesses your account — sensitive items remain sealed.

---

## 🗑️ Graveyard System

Deleted items move to the **Graveyard**, not oblivion.

* Restore instantly
* Permanently delete
* Your data. Your timeline.

---

## ❓ Security Questions & Recovery

Forgot password?

Answer one of your pre-set security questions:

* Place
* Friend

No email required. Ever.

---

# 🎨 Design Ethos

* Subtle dark grid background
* Amber glow accents
* Command-meets-luxury aesthetic
* Floating UI with depth shadows
* Fade-up motion animations
* Fully responsive (4K → Mobile)

Typography:

* **DM Serif Display** — Authority
* **DM Sans** — Clarity
* Accent color: `#fbbf24` (Amber vault glow)

---

# ⚡ Technical Stack

---

## 🖥 Frontend

```
⚛️ React 18 (Hooks, Context, Functional)
🎨 TailwindCSS – Utility-first styling
🔄 React Router 6
🔐 Context API – Auth state management
🌐 Axios – Interceptors & token handling
🎬 Custom CSS animations
```

---

## 🧠 Backend

```
🟢 Node.js – Non-blocking I/O
🚂 Express.js – Routing layer
🗄️ MongoDB Atlas – Document database
☁️ Cloudinary – Media storage & CDN
🔑 JWT – Stateless auth
🛡️ bcryptjs – Password hashing
📦 Multer – File upload handling
```

---

# ☁️ Deployment Architecture

| Layer     | Technology                  |
| --------- | --------------------------- |
| Frontend  | Vercel Edge Network         |
| Backend   | Vercel Serverless Functions |
| Database  | MongoDB Atlas               |
| Media CDN | Cloudinary                  |

---

# 🧠 Architecture Deep Dive

## 🔐 Security Layers

```
┌─────────────────────────────────────┐
│ Browser (httpOnly cookie)           │
├─────────────────────────────────────┤
│ CORS + CSRF Protection              │
├─────────────────────────────────────┤
│ JWT Verification Middleware         │
├─────────────────────────────────────┤
│ Per-Item Password Hashing (bcrypt)  │
├─────────────────────────────────────┤
│ MongoDB (Encrypted at rest)         │
│ Cloudinary (Authenticated delivery) │
└─────────────────────────────────────┘
```

---

## 🔄 Data Flow

```
[Client]
    ↓
[Vercel Edge]
    ↓
[Serverless Function]
    ↓
[MongoDB Atlas]
    ↓
[Cloudinary CDN]
```

---

# 🚦 API Reference

---

## 🔐 Authentication

| Endpoint                         | Method | Description          |
| -------------------------------- | ------ | -------------------- |
| /api/auth/register               | POST   | Create vault account |
| /api/auth/login                  | POST   | Enter the vault      |
| /api/auth/logout                 | POST   | Seal the vault       |
| /api/auth/profile                | GET    | Who am I?            |
| /api/auth/security-questions     | POST   | Set recovery answers |
| /api/auth/forgot-password/init   | POST   | Start recovery       |
| /api/auth/forgot-password/verify | POST   | Verify answer        |
| /api/auth/reset-password         | POST   | Set new password     |
| /api/auth/update-username        | PUT    | Change username      |

---

## 📦 Vault Items

| Endpoint                 | Method | Description          |
| ------------------------ | ------ | -------------------- |
| /api/items               | GET    | List vault contents  |
| /api/items               | POST   | Add new item         |
| /api/items/:id           | GET    | Peek inside          |
| /api/items/:id           | PUT    | Modify item          |
| /api/items/:id           | DELETE | Move to graveyard    |
| /api/items/:id/verify    | POST   | Unlock with password |
| /api/items/trash         | GET    | View graveyard       |
| /api/items/trash/empty   | DELETE | Empty graveyard      |
| /api/items/:id/restore   | PUT    | Restore item         |
| /api/items/:id/permanent | DELETE | Permanently delete   |

---

## 🔗 Permanent Slots

| Endpoint                   | Method | Description       |
| -------------------------- | ------ | ----------------- |
| /api/resumes               | GET    | View your 3 slots |
| /api/resumes/upload        | POST   | Occupy a slot     |
| /api/resumes/:position     | DELETE | Vacate slot       |
| /api/resumes/public/:token | GET    | Public access     |

---

# 🛠 Zero-to-Vault Setup

---

## 🔧 Local Development

```bash
git clone https://github.com/yourname/vaultnotes.git
cd vaultnotes

npm install
cd client && npm install
cd ../server && npm install

# Setup environment variables
# Backend: MONGO_URI, JWT_SECRET, CLOUDINARY_*, CLIENT_URL
# Frontend: VITE_API_URL

npm run dev
```

---

## 🚀 Production (Vercel)

Frontend:

```bash
cd client
vercel --prod
```

Backend:

```bash
cd server
vercel --prod
```

---

# 🧪 The Vault in Numbers

```
✓ 0 emails collected
✓ 3 permanent public links
✓ 10MB max file size
✓ 15MB resume slot limit
✓ 30-day cookie lifespan
✓ 15-minute reset window
✓ 100% open source
```

---

# 🗺️ Roadmap

| Timeline | Feature                               |
| -------- | ------------------------------------- |
| Q2 2025  | 🔐 Client-side AES-256 encryption     |
| Q3 2025  | 🌐 Custom domains                     |
| Q4 2025  | 📱 PWA support                        |
| Q1 2026  | 🤖 AI note summarization              |
| Future   | 🧬 End-to-end encrypted collaboration |

---

# 🤝 Contributing

```bash
git checkout -b feature/AmazingIdea
git commit -m "Add AmazingIdea"
git push origin feature/AmazingIdea
```

Open a Pull Request 🚀

---

# 📜 License

MIT License — Do whatever you want, just don’t hold us liable.

---

# 👨‍💻 The Architect

**Sanjay**
B.Tech Information Technology
Frontend & Full-Stack Developer

Built in a college lab, fueled by chai and frustration.

<p align="center">

![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge\&logo=github\&logoColor=white)
![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge\&logo=linkedin\&logoColor=white)

</p>

---

# ⭐ Star the Vault

If you've ever:

* Been blocked by email verification
* Lost access due to 2FA
* Wanted simple file hosting
* Cared about digital sovereignty

Give this project a ⭐
