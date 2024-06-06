import React, { useState, useRef, RefObject, useEffect } from "react";
import { AiFillSound } from "react-icons/ai";

interface TtsButtonProps {
    text: string;
}

const TtsButton: React.FC<TtsButtonProps> = (props) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchAudio = async () => {
    if (audioUrl == null) {
        
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/getTTS", {
          method: "POST",
          body: props.text,
        });
        
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      
      // Reset the audio URL to null first
      setAudioUrl(null);
      
      // Then set the new audio URL
      setAudioUrl(url);

      // Ensure audioRef.current is not null
      if (audioRef.current) {
        audioRef.current.play();
      }
    } catch (error) {
      console.error("Error fetching and playing audio:", error);
    }
    
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
    }
  }, [audioUrl]);

  return (
    <div className="w-1 h-full justify-center ietms-center m-auto ml-0 mr-0">
      <button onClick={fetchAudio} className="hover:bg-gray-400 rounded-md"><AiFillSound size="36"/></button>
      <audio className="invisible" ref={audioRef} controls src={audioUrl ?? undefined} />
    </div>
  );
};

export default TtsButton;
