# 🧭 Maze Pathfinder – A* Visualizer with Live Updates

A full-stack pathfinding visualizer that uses the A* algorithm to solve mazes in real-time, featuring a React + Tailwind frontend and a ExpressJs + WebSocket backend.

<img width="665" height="737" alt="Screenshot 2025-07-29 at 16 28 54" src="https://github.com/user-attachments/assets/76ea5f20-2ed0-4260-a0bb-a690b3a72c81" />


https://github.com/user-attachments/assets/c042a867-ec15-4807-beb9-5b365777d1b3


---

## 🛠️ Technologies Used

### **Frontend (`web-ui`)**
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- Native WebSocket client for real-time updates

### **Backend (`web-api`)**
- Node.js
- Express.js
- WebSocket server
- TypeScript
- Implementation of A* pathfinding
- Jest for testing
  
---
## Environment Variables

Create a .env.local in web-ui/:
- NEXT_PUBLIC_API_ENDPOINT_BASE_URL=http://localhost:3001

---
## ▶️ Running the Maze Pathfinder Locally

### 📦 Step 1: Install & Start Frontend

```bash
cd web-ui
npm install
npm run dev
```

App will be available at:
🌐 Frontend: http://localhost:3000

### 🔧 Step 2: Install & Start Backend
Open a second terminal tab/window:

```bash
cd web-api 
npm install
npx ts-node server.ts
```

API & WebSocket server will be running at:
🔌 Backend: http://localhost:3001

---
## Resources
1. A* Search Algorithm - https://medium.com/@nicholas.w.swift/easy-a-star-pathfinding-7e6689c7f7b2 
2. What exactly is a MAZE and algortihms like DFS, Hunt & Kill , Origin Shift- https://youtu.be/uctN47p_KVk?si=KNhXi4c4s23wn0a-
3. MUI Components - https://mui.com/material-ui/all-components/
4. Web Socket - https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API & https://youtu.be/1BfCnjr_Vjg?si=XckCN6TlvPESgH8s
5. Express js - https://www.geeksforgeeks.org/node-js/node-js-building-simple-rest-api-in-express/
6. Web Socket library npm - https://www.npmjs.com/package/ws
