import React, { useEffect, useState } from 'react';

const Recorder: React.FC = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  let mediaRecorder: MediaRecorder | null = null;
  let audioStream: MediaStream | null = null;

  useEffect(() => {
    
  }, [recording])

  const startRecording = async () => {
    try {
      audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(audioStream);
      mediaRecorder.ondataavailable = event => {
        setAudioChunks(prev => [...prev, event.data]);
      };
      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
      setRecording(false);
    }
  };

  const saveRecording = () => {
    const blob = new Blob(audioChunks, { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test.mp3';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioChunks.length > 0 && (
        <button onClick={saveRecording}>Save Recording</button>
      )}
    </div>
  );
};

export default Recorder;
