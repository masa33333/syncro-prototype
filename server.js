require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }
});

// 静的ファイル配信
app.use(express.static(__dirname));

app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY is not set' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    const audioBlob = new Blob([req.file.buffer], {
      type: req.file.mimetype || 'audio/webm'
    });

    const form = new FormData();
    form.append('file', audioBlob, req.file.originalname || 'recording.webm');
    form.append('model', 'gpt-4o-mini-transcribe');
    form.append('language', 'en');
    form.append('response_format', 'json');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: form
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || 'Transcription request failed'
      });
    }

    return res.json({
      transcript: (data.text || '').trim()
    });
  } catch (error) {
    console.error('[TRANSCRIBE ERROR]', error);
    return res.status(500).json({
      error: error.message || 'Unexpected server error'
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/battle.html`);
});