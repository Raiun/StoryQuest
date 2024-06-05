"use client"

import React, { useCallback, useEffect, useState } from "react";
import { AudioManager } from "./AudioManager";
import { useTranscriber } from "../hooks/useTranscriber";
import Transcript from "./Transcript";
import { AiFillSound } from "react-icons/ai";

const HorizontalBar = () => {
  return <div className="w-full h-[1px] mb-5 bg-slate-400"></div>;
}

const ReadingScreen = () => {
  const [storyIndex, SetStoryIndex] = useState<number>(0);
  const transcriber = useTranscriber();
  const [userText, SetUserText] = useState<string>("");

  function getNextPage()  {
    SetStoryIndex(storyIndex + 1);
  }

  function playAudio(text : string) {
    console.log("Audio Playing");
  }

  function cleanOutput(text : string | undefined) {
    if (text) {
      text = text.replace(/[^0-9a-z\s]/gi, '');
      text = text.toLowerCase();
    }

    return text;
  }

  function checkedMistakes() {
    let output = "";
    
    if (cleanOutput(transcriber.output?.text) === cleanOutput(sampleText[storyIndex])) {
      console.log("Correct");
      output = "Correct";
    }
    else {
      console.log("Mistakes were made");
      output = "Mistakes were made";
    }
    
    SetUserText(output);
  }

  return (
    <div className="w-full h-30 flex flex-col ml-10 mr-10 mt-20 bg-white overflow-hidden shadow-lg justify-center items-center">
        <h1 className="mt-10 mb-0 m-auto font-bold text-center text-3xl">
            Review Mistakes!
            <p className="text-gray-400 text-lg">Section: {storyIndex}</p>
        </h1>
        <HorizontalBar></HorizontalBar>
        <img width="400" height="600" src="/catInHat.jpg"></img>
        <div className="w-1/2 max-h-72 flex mt-5 mb-10 p-5 bg-gray-300 text-center justify-center items-center whitespace-pre-wrap">
          <button onClick={playAudio} className="hover:bg-gray-400 rounded-md"><AiFillSound size="36" /></button>
          <span className="text-center m-auto text-md"></span>
        </div>
        <HorizontalBar></HorizontalBar>
        <AudioManager transcriber={transcriber}></AudioManager>
        <Transcript transcribedData={transcriber.output}></Transcript>
        <button onClick={getNextPage}>Get Next Page</button>
        {userText}
    </div>
  );
}

export default ReadingScreen