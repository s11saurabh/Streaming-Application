// import Video from '../models/Video.js';
// import fs from 'fs';
// import path from 'path';

// export const streamVideo = async (req, res, next) => {
//   try {
//     console.log('Stream request for video:', req.params.id);
    
//     const video = await Video.findById(req.params.id);

//     if (!video) {
//       console.error('Video not found:', req.params.id);
//       return res.status(404).json({ success: false, message: 'Video not found' });
//     }

//     console.log('Video found:', {
//       id: video._id,
//       path: video.path,
//       status: video.status
//     });

//     const videoPath = path.resolve(video.path);
//     console.log('Resolved video path:', videoPath);

//     if (!fs.existsSync(videoPath)) {
//       console.error('Video file not found on disk:', videoPath);
//       return res.status(404).json({ success: false, message: 'Video file not found on disk' });
//     }

//     const stat = fs.statSync(videoPath);
//     const fileSize = stat.size;
//     const range = req.headers.range;

//     console.log('File size:', fileSize, 'Range:', range);

//     if (range) {
//       const parts = range.replace(/bytes=/, '').split('-');
//       const start = parseInt(parts[0], 10);
//       const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//       const chunksize = (end - start) + 1;
      
//       console.log('Streaming chunk:', { start, end, chunksize });
      
//       const file = fs.createReadStream(videoPath, { start, end });
//       const head = {
//         'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//         'Accept-Ranges': 'bytes',
//         'Content-Length': chunksize,
//         'Content-Type': video.mimeType || 'video/mp4',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Headers': 'Range',
//         'Access-Control-Expose-Headers': 'Content-Range, Content-Length',
//       };

//       res.writeHead(206, head);
//       file.pipe(res);
      
//       file.on('error', (err) => {
//         console.error('File stream error:', err);
//         res.status(500).end();
//       });
//     } else {
//       console.log('Streaming full file');
      
//       const head = {
//         'Content-Length': fileSize,
//         'Content-Type': video.mimeType || 'video/mp4',
//         'Accept-Ranges': 'bytes',
//         'Access-Control-Allow-Origin': '*',
//       };

//       res.writeHead(200, head);
//       const stream = fs.createReadStream(videoPath);
//       stream.pipe(res);
      
//       stream.on('error', (err) => {
//         console.error('File stream error:', err);
//         res.status(500).end();
//       });
//     }
//   } catch (error) {
//     console.error('Stream error:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getThumbnail = async (req, res, next) => {
//   try {
//     const video = await Video.findById(req.params.id);

//     if (!video) {
//       return res.status(404).json({ success: false, message: 'Video not found' });
//     }

//     if (!video.thumbnailPath) {
//       return res.status(404).json({ success: false, message: 'Thumbnail not generated yet' });
//     }

//     const thumbnailPath = path.resolve(video.thumbnailPath);
    
//     if (!fs.existsSync(thumbnailPath)) {
//       return res.status(404).json({ success: false, message: 'Thumbnail file not found' });
//     }

//     res.setHeader('Content-Type', 'image/jpeg');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     fs.createReadStream(thumbnailPath).pipe(res);
//   } catch (error) {
//     console.error('Thumbnail error:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

















import Video from '../models/Video.js';
import fs from 'fs';
import path from 'path';

export const streamVideo = async (req, res, next) => {
  try {
    console.log('Stream request for video:', req.params.id);
    
    const video = await Video.findById(req.params.id);

    if (!video) {
      console.error('Video not found:', req.params.id);
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    console.log('Video found:', {
      id: video._id,
      path: video.path,
      status: video.status
    });

    const videoPath = path.resolve(video.path);
    console.log('Resolved video path:', videoPath);

    if (!fs.existsSync(videoPath)) {
      console.error('Video file not found on disk:', videoPath);
      return res.status(404).json({ success: false, message: 'Video file not found on disk' });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    console.log('File size:', fileSize, 'Range:', range);

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': video.mimeType || 'video/mp4',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Range',
        'Access-Control-Expose-Headers': 'Content-Range, Content-Length',
      };

      res.writeHead(206, head);
      file.pipe(res);
      
      file.on('error', (err) => {
        console.error('File stream error:', err);
        res.status(500).end();
      });
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': video.mimeType || 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Access-Control-Allow-Origin': '*',
      };

      res.writeHead(200, head);
      const stream = fs.createReadStream(videoPath);
      stream.pipe(res);
      
      stream.on('error', (err) => {
        console.error('File stream error:', err);
        res.status(500).end();
      });
    }
  } catch (error) {
    console.error('Stream error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getThumbnail = async (req, res, next) => {
  try {
    console.log('Thumbnail request for video:', req.params.id);
    
    const video = await Video.findById(req.params.id);

    if (!video) {
      console.error('Video not found:', req.params.id);
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    console.log('Video thumbnail path from DB:', video.thumbnailPath);

    if (!video.thumbnailPath) {
      console.error('Thumbnail path not set in database');
      return res.status(404).json({ success: false, message: 'Thumbnail not generated yet' });
    }

    const thumbnailPath = path.resolve(video.thumbnailPath);
    console.log('Resolved thumbnail path:', thumbnailPath);
    
    if (!fs.existsSync(thumbnailPath)) {
      console.error('Thumbnail file not found on disk:', thumbnailPath);
      return res.status(404).json({ success: false, message: 'Thumbnail file not found' });
    }

    console.log('Serving thumbnail:', thumbnailPath);
    
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    
    const stream = fs.createReadStream(thumbnailPath);
    stream.pipe(res);
    
    stream.on('error', (err) => {
      console.error('Thumbnail stream error:', err);
      res.status(500).end();
    });
  } catch (error) {
    console.error('Thumbnail error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};