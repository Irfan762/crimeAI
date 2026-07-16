"use client";

import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2, Check } from 'lucide-react';

interface VoiceRecorderProps {
  caseId: number;
  userId: number;
  onRecordingComplete?: (noteId: number, transcript: string) => void;
}

export function VoiceRecorder({ caseId, userId, onRecordingComplete }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await uploadAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setSuccessMsg('');
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const uploadAudio = async (blob: Blob) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('audio_file', blob, 'recording.webm');
      formData.append('case_id', caseId.toString());
      formData.append('user_id', userId.toString());

      const res = await fetch('http://localhost:8000/copilot/voice-note', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload recording');
      }

      const data = await res.json();
      setSuccessMsg('Investigation Note Saved Successfully');
      if (onRecordingComplete) {
        onRecordingComplete(data.note_id, data.transcript);
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Error uploading audio:', error);
      alert('Error uploading voice note. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-xl bg-slate-50 dark:bg-slate-900">
      <h3 className="text-lg font-semibold">Voice Note</h3>
      
      <div className="flex items-center gap-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition disabled:opacity-50"
          >
            <Mic size={20} />
            Record Note
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-900 transition animate-pulse"
          >
            <Square size={20} />
            Stop Recording
          </button>
        )}
      </div>

      {isUploading && (
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="animate-spin" size={16} />
          <span>Processing Audio...</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg text-sm">
          <Check size={16} />
          <span>{successMsg}</span>
        </div>
      )}
    </div>
  );
}
