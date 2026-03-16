# 🛡️ CodeGuard AI

> **AI-Powered Code Security Analyzer** — Detect vulnerabilities, bugs, and security issues in your code instantly using artificial intelligence.

![CodeGuard AI](https://img.shields.io/badge/Built%20With-MERN%20Stack-blue?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-LLaMA%203.3%2070B-green?style=for-the-badge)
![Auth](https://img.shields.io/badge/Auth-Clerk-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

---

## 🚀 Live Demo

🌐 **[Try CodeGuard AI Live →]([https://codeguard-ai.vercel.app](https://code-guard-ai-seven.vercel.app/))**

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page](https://via.placeholder.com/800x400/050810/60a5fa?text=CodeGuard+AI+Landing+Page)

### 📊 Dashboard
![Dashboard](https://via.placeholder.com/800x400/050810/60a5fa?text=User+Dashboard)

### 🔍 Code Analysis
![Analysis](https://via.placeholder.com/800x400/050810/60a5fa?text=AI+Code+Analysis)

---

## ✨ Features

- 🔐 **Security Vulnerability Detection** — SQL Injection, XSS, CSRF, insecure APIs and 50+ vulnerability types
- 🐛 **Bug Detection** — Logical errors, memory leaks, performance bottlenecks
- 🤖 **AI-Powered Analysis** — Uses LLaMA 3.3 70B model via Groq API
- 📊 **Severity Levels** — Critical, High, Medium, Low risk classification
- 📜 **Analysis History** — Save and revisit all past code analyses
- 💳 **Credit System** — Freemium model with 5 free analyses on signup
- 🔒 **Secure Authentication** — JWT-based auth via Clerk
- 🌍 **10+ Languages** — JavaScript, Python, Java, C++, Go, Rust and more
- 📱 **Responsive Design** — Works on all devices

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI library |
| Vite 8 | Build tool |
| Tailwind CSS v4 | Styling |
| React Router v6 | Navigation |
| Axios | HTTP client |
| React Markdown | Render AI output |
| Clerk React | Authentication |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB + Mongoose | Database |
| Groq SDK | AI integration |
| @clerk/express | JWT validation |
| dotenv | Environment config |
| CORS | Cross-origin requests |

### Services
| Service | Purpose | Cost |
|---------|---------|------|
| MongoDB Atlas | Database hosting | Free |
| Clerk | Authentication | Free |
| Groq AI | LLaMA 3.3 70B model | Free |
| Vercel | Frontend deployment | Free |
| Render | Backend deployment | Free |

---

## 📁 Project Structure

```
codeGuard-ai/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── context/
│   │   │   └── UserContext.jsx # Global credits state
│   │   ├── lib/
│   │   │   └── axios.js        # Axios configuration
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Landing page
│   │   │   ├── Dashboard.jsx   # User dashboard
│   │   │   ├── Analyze.jsx     # Code analysis
│   │   │   ├── History.jsx     # Past analyses
│   │   │   └── Layout.jsx      # Sidebar layout
│   │   ├── App.jsx             # Routes + ProtectedRoute
│   │   └── main.jsx            # Entry point + providers
│   └── .env                    # Frontend env vars
│
└── server/                     # Express Backend
    ├── config/
    │   ├── db.js               # MongoDB connection
    │   └── groq.js             # Groq AI setup
    ├── controllers/
    │   ├── aiController.js     # Analysis logic
    │   └── userController.js   # User management
    ├── middleware/
    │   └── auth.js             # JWT verification
    ├── models/
    │   ├── User.js             # User schema
    │   └── Analysis.js         # Analysis schema
    ├── routes/
    │   ├── aiRoutes.js         # AI endpoints
    │   └── userRoutes.js       # User endpoints
    └── server.js               # Entry point
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- npm v8+
- MongoDB Atlas account (free)
- Clerk account (free)
- Groq API account (free)

### 1. Clone the Repository
```bash
git clone https://github.com/17yashaswini/codeGuard-ai.git
cd codeGuard-ai
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key
GROQ_API_KEY=your_groq_api_key
```

Start the backend:
```bash
npm run server
```

### 3. Setup Frontend
```bash
cd client
npm install --legacy-peer-deps
```

Create `client/.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

### 4. Open the App
Visit `http://localhost:5173` in your browser!

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/user/sync` | Create/sync user on login | ✅ |
| GET | `/api/user/credits` | Get remaining credits | ✅ |
| POST | `/api/ai/analyze` | Analyze code for vulnerabilities | ✅ |
| GET | `/api/ai/history` | Get past analyses | ✅ |

---

## 💳 Credit System

| Plan | Credits | Price |
|------|---------|-------|
| Free | 5 | ₹0 |
| Starter | 50 | ₹99 |
| Pro | 200 | ₹299 |
| Unlimited | ∞ | ₹599/month |

New users get **5 free credits** on signup. Each analysis uses 1 credit.

---

## 🔐 How Authentication Works

```
User logs in via Clerk
        ↓
Clerk issues JWT token
        ↓
Frontend sends token in Authorization header
        ↓
Backend validates JWT with Clerk middleware
        ↓
req.auth() provides userId
        ↓
User data attached to req.user
        ↓
Controller accesses user safely
```

---

## 🚀 Deployment

### Frontend — Vercel
1. Connect GitHub repo to Vercel
2. Set root directory: `client`
3. Add environment variables
4. Deploy!

### Backend — Render
1. Connect GitHub repo to Render
2. Set root directory: `server`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add environment variables
6. Deploy!

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👩‍💻 Author

**Yashaswini**
- MCA 4th Semester | Bangalore
- Cyber Security Intern
- GitHub: [@17yashaswini](https://github.com/17yashaswini)

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Show Your Support

Give a ⭐ if this project helped you or impressed you!

---

*Built with ❤️ using MERN Stack + AI + Cyber Security*
