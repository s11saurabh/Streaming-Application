FROM node:18-alpine

# Install FFmpeg
RUN apk add --no-cache ffmpeg

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Expose port
EXPOSE 10000

# Start application
CMD ["npm", "start"]
```

Create `backend/.dockerignore`:
```
node_modules
npm-debug.log
.env
.git
.gitignore
uploads/
*.md
