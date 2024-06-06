import React, { useEffect, useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import { FaMicrophone } from "react-icons/fa";
import checkMistakes from "@/utils/checkMistakes";
import Highlighter from "react-highlight-words";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const Recorder = (props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [stt, setStt] = useState(null);
  const [mistakes, setMistakes] = useState(null);
  const [highlightMistakeText, setHighlightMistakeText] = useState("");
  const storyText = props.storyText;
  
  let file;

  const start = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          setIsRecording(true);
        }).catch((e) => console.error(e));
    }
    setStt("");
    setMistakes([]);
  };

  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        file = new File(buffer, "music.mp3", {
          type: blob.type,
          lastModified: Date.now()
        });
        uploadFile()
        setIsRecording(false);
      }).catch((e) => console.log(e));
  };

  const uploadFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:8000/getSTT", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
          const jsonData = await response.json()
          console.log(jsonData)
          setStt(jsonData["SpeechToText"])
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          console.log("Permission Granted");
          setIsBlocked(false);
        })
        .catch(() => {
          console.log("Permission Denied");
          setIsBlocked(true);
        });
    }

    if (stt !== null) {
      let check = checkMistakes(stt, storyText);
      setMistakes(check[0]);
      props.setBool(check[1])
    }
  }, [stt]);


  return (
    <div className="w-full justify-center items-center mb-5">
      <button className="w-28 flex bg-white shadow-lg m-auto mb-5 p-5 pt-3 pb-3 rounded-lg items-center" onClick={isRecording ? stop : start}>
        <FaMicrophone className="mr-2" />
        <span>{isRecording ? "Stop" : "Record"}</span>
      </button>
      {(stt && mistakes) &&
        <div className="text-lg text-center">
          <p>You've Made a Few Mistakes! Try Again!</p>
          <div dangerouslySetInnerHTML={{ __html: mistakes }} className="w-4/5 min-h-12 m-auto mt-5 p-5 bg-gray-300 overflow-hidden text-lg">
          </div>
        </div>
      }
    </div>
  );
};

export default Recorder;
