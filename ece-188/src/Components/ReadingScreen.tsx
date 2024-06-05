"use client"

import React, { useCallback, useEffect, useState } from "react";
import { AudioManager } from "./AudioManager";
import { useTranscriber } from "../hooks/useTranscriber";
import Transcript from "./Transcript";
import { AiFillSound } from "react-icons/ai";

const sampleText = ["The sun did not shine.\n" +
"It was too wet to play.\n" +
"So we sat in the house\n" +
"All that cold, cold, wet day.\n",

"I sat there with Sally.\n" +
"We sat there, we two.\n" +
"And I said, 'How I wish\n" +
"We had something to do!'\n",

"Too wet to go out\n" +
"And too cold to play ball.\n" +
"So we sat in the house.\n" +
"We did nothing at all.\n",

"So all we could do was to\n" +
"Sit!\n" +
"Sit!\n" +
"Sit!\n" +
"Sit!\n" +
"And we did not like it.\n" +
"Not one little bit.\n",

"BUMP!\n",

"And then\n" +
"something went BUMP!\n" +
"How that bump made us jump!\n",

"We looked!\n" +
"Then we saw him step in on the mat!\n" +
"We looked!\n" +
"And we saw him!\n" +
"The Cat in the Hat!\n" +
"And he said to us,\n" +
"'Why do you sit there like that?'\n" +
"I know it is wet\n" +
"And the sun is not sunny.\n" +
"But we can have\n" +
"Lots of good fun that is funny!\n"
]

const HorizontalBar = () => {
  return <div className="w-full h-[1px] mb-5 bg-slate-400"></div>;
}

const ReadingScreen = (props: {storyName : string;}) => {
  const [storyIndex, SetStoryIndex] = useState<number>(0);
  const [userText, SetUserText] = useState<string>("");
  const [readMode, SetReadMode] = useState<number>(0);
  const transcriber = useTranscriber();

  function getNextPage()  {
    SetStoryIndex(storyIndex + 1);
  }

  function playAudio() {
    console.log("Audio Playing");
  }

  function cleanOutput(text : string | undefined) {
    if (text) {
      text = text.replace(/[^0-9a-z\s]/gi, '');
      text = text.toLowerCase();
    }

    return text;
  }

  function getMistakeText(text : string | undefined) {
    return "mistakes";
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
            {(readMode == 0) ? <p>Read Along!</p> : <p>Review Mistakes</p>}
            <p className="text-gray-400 text-lg">Section: {storyIndex}{props.storyName}</p>
        </h1>
        <HorizontalBar></HorizontalBar>
        <img width="400" height="600" src="/catInHat.jpg"></img>
        <div className="w-1/2 max-h-72 flex mt-5 mb-10 p-5 bg-gray-300 text-center justify-center items-center whitespace-pre-wrap">
          <button onClick={playAudio} className="hover:bg-gray-400 rounded-md"><AiFillSound size="36" /></button>
          <span className="text-center m-auto text-md hover:bg-gray-400 hover:underline">{(readMode == 0) ? sampleText[storyIndex] : getMistakeText(transcriber.output?.text)}</span>
        </div>
        <HorizontalBar></HorizontalBar>
        <AudioManager transcriber={transcriber}></AudioManager>
        <Transcript transcribedData={transcriber.output}></Transcript>
        <button onClick={getNextPage}>Get Next Page</button>
        {userText}
    </div>
  );
}

/*
{transcriber.output?.text.includes(sampleText[storyIndex]) && <button onClick={getNextPage}>CORRECT!</button>}
*/

export default ReadingScreen