// import mongoose from 'mongoose';

// const videoSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   description: {
//     type: String,
//     trim: true
//   },
//   filename: {
//     type: String,
//     required: true
//   },
//   originalName: {
//     type: String,
//     required: true
//   },
//   path: {
//     type: String,
//     required: true
//   },
//   size: {
//     type: Number,
//     required: true
//   },
//   duration: {
//     type: Number,
//     default: 0
//   },
//   mimeType: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['uploading', 'processing', 'completed', 'failed'],
//     default: 'uploading'
//   },
//   processingProgress: {
//     type: Number,
//     default: 0,
//     min: 0,
//     max: 100
//   },
//   sensitivityStatus: {
//     type: String,
//     enum: ['pending', 'safe', 'flagged'],
//     default: 'pending'
//   },
//   thumbnailPath: {
//     type: String
//   },
//   uploadedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   organization: {
//     type: String,
//     required: true
//   },
//   metadata: {
//     type: mongoose.Schema.Types.Mixed,
//     default: {}
//   }
// }, {
//   timestamps: true
// });

// videoSchema.index({ uploadedBy: 1, createdAt: -1 });
// videoSchema.index({ organization: 1, status: 1 });
// videoSchema.index({ status: 1, sensitivityStatus: 1 });

// const Video = mongoose.model('Video', videoSchema);

// export default Video;






























import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 0
  },
  mimeType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['uploading', 'processing', 'completed', 'failed'],
    default: 'uploading'
  },
  processingProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  sensitivityStatus: {
    type: String,
    enum: ['pending', 'safe', 'flagged'],
    default: 'pending'
  },
  thumbnail: {
    type: String, // Base64 encoded image
    default: null
  },
  thumbnailPath: {
    type: String // Legacy field, keeping for compatibility
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

videoSchema.index({ uploadedBy: 1, createdAt: -1 });
videoSchema.index({ organization: 1, status: 1 });
videoSchema.index({ status: 1, sensitivityStatus: 1 });

const Video = mongoose.model('Video', videoSchema);

export default Video;