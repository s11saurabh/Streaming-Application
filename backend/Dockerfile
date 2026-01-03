# Use Node.js 18 Alpine (lightweight)
FROM node:18-alpine

# Install FFmpeg and build dependencies
RUN apk add --no-cache \
    ffmpeg \
    python3 \
    make \
    g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create uploads directory
RUN mkdir -p /app/uploads

# Expose port
EXPOSE 10000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 10000) + '/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "server.js"]
```

---

## **Step 5: Verify File Structure**

Your GitHub repo should look like this:
```
Streaming-Application/
└── backend/
    ├── Dockerfile          ← Must exist!
    ├── .dockerignore       ← Must exist!
    ├── package.json
    ├── package-lock.json   ← Must exist!
    ├── server.js
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── services/
    └── utils/
```

---

## **Step 6: Create `.dockerignore`**

Create `backend/.dockerignore`:
```
node_modules
npm-debug.log
.env
.env.local
.git
.gitignore
uploads/*
!uploads/.gitkeep
*.md
.DS_Store
*.log
