#!/usr/bin/env node

/**
 * Audio Generation Script for Blog Posts
 *
 * This script automatically generates audio versions of blog posts using ElevenLabs API
 * and stores the URLs in the post metadata.
 *
 * Usage: npm run generate-audio
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB'; // Adam voice
const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');

// ElevenLabs API configuration
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

/**
 * Generate audio for a single blog post
 */
async function generateAudio(text, title) {
  if (!ELEVENLABS_API_KEY) {
    throw new Error('ELEVENLABS_API_KEY not found in environment variables');
  }

  // Clean the text - remove MDX components and code blocks
  const cleanText = text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/<[^>]*>/g, '') // Remove HTML/JSX tags
    .replace(/\{[^}]*\}/g, '') // Remove JSX expressions
    .replace(/^import.*$/gm, '') // Remove import statements
    .replace(/^export.*$/gm, '') // Remove export statements
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/[#*_~]/g, '') // Remove markdown formatting
    .trim();

  // Add introduction
  const audioText = `${title}. ${cleanText}`;

  try {
    // Generate audio using ElevenLabs
    const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: audioText,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    // Get the audio data
    const audioBuffer = await response.buffer();

    // For production, you'd upload this to S3/GCS
    // For now, we'll save locally and you can upload manually
    const audioFileName = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.mp3`;
    const audioPath = path.join(process.cwd(), 'public/audio', audioFileName);

    // Ensure directory exists
    fs.mkdirSync(path.dirname(audioPath), { recursive: true });

    // Save audio file
    fs.writeFileSync(audioPath, audioBuffer);

    // Return the public URL
    return `/audio/${audioFileName}`;
  } catch (error) {
    console.error(`Error generating audio for "${title}":`, error.message);
    return null;
  }
}

/**
 * Process all blog posts
 */
async function processAllPosts() {
  const files = getFilesRecursively(CONTENT_DIR);

  for (const filePath of files) {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);

    // Skip if audio already exists or if it's a draft
    if (data.audioUrl || data.draft) {
      console.log(`Skipping: ${data.title || 'Untitled'} (${data.audioUrl ? 'has audio' : 'draft'})`);
      continue;
    }

    console.log(`Generating audio for: ${data.title}...`);

    const audioUrl = await generateAudio(content, data.title);

    if (audioUrl) {
      // Update the frontmatter with the audio URL
      data.audioUrl = audioUrl;
      const updatedContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✅ Audio generated: ${audioUrl}`);
    } else {
      console.log(`❌ Failed to generate audio for: ${data.title}`);
    }

    // Rate limiting - ElevenLabs has rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

/**
 * Get all MDX files recursively
 */
function getFilesRecursively(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFilesRecursively(fullPath));
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Alternative: Use AWS Polly
async function generateAudioWithPolly(text, title) {
  const AWS = require('aws-sdk');
  const polly = new AWS.Polly({ region: 'us-east-1' });
  const s3 = new AWS.S3();

  const params = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Matthew', // Neural voice
    Engine: 'neural',
    TextType: 'text',
  };

  try {
    const data = await polly.synthesizeSpeech(params).promise();

    // Upload to S3
    const uploadParams = {
      Bucket: 'your-blog-audio',
      Key: `audio/${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.mp3`,
      Body: data.AudioStream,
      ContentType: 'audio/mpeg',
      CacheControl: 'public, max-age=31536000', // Cache for 1 year
    };

    const result = await s3.upload(uploadParams).promise();
    return result.Location;
  } catch (error) {
    console.error('Polly error:', error);
    return null;
  }
}

// Run the script
if (process.argv[1] === import.meta.url) {
  processAllPosts()
    .then(() => console.log('✨ Audio generation complete!'))
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

export { generateAudio, generateAudioWithPolly };