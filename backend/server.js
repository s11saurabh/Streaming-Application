import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import connectDB from './config/database.js';
import { initializeSocket } from './config/socket.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import streamRoutes from './routes/streamRoutes.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Trust proxy (important for Render)
app.set('trust proxy', 1);

// Allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean);

// Initialize Socket.io
initializeSocket(httpServer);

// Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type']
};

app.use(cors(corsOptions));

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/stream', streamRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Video Platform API',
    version: '1.0.0',
    status: 'running'
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;

httpServer.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`Server is live on port ${PORT}`);
});

export default app;
