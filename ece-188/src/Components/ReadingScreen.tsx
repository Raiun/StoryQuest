"use client"

import React, { useCallback, useEffect, useRef, useState } from "react";
import Recorder from "./Recorder";
import TtsButton from "./TtsButton";
import { useSearchParams } from 'next/navigation'

const sampleText = [
  "The sun did not shine. " +
  "It was too wet to play. " +
  "So we sat in the house " +
  "All that cold, cold, wet day. ",

  "I sat there with Sally. " +
  "We sat there, we two. " +
  "And I said, 'How I wish " +
  "We had something to do!' ",

  "Too wet to go out " +
  "And too cold to play ball. " +
  "So we sat in the house. " +
  "We did nothing at all. ",

  "So all we could do was to " +
  "Sit! " +
  "Sit! " +
  "Sit! " +
  "Sit! " +
  "And we did not like it. " +
  "Not one little bit. ",

  "BUMP! ",

  "And then " +
  "something went BUMP! " +
  "How that bump made us jump! ",

  "We looked! " +
  "Then we saw him step in on the mat! " +
  "We looked! " +
  "And we saw him! " +
  "The Cat in the Hat! " +
  "And he said to us, " +
  "'Why do you sit there like that?' " +
  "I know it is wet " +
  "And the sun is not sunny. " +
  "But we can have " +
  "Lots of good fun that is funny! "
];


const BookImage = ( {storyTitle} : {storyTitle: string} ) => {
  let imagePath;

  switch (storyTitle) {
    case "Cat in the Hat":
      imagePath = "/catInHat.jpg";
      break;
    case "A Bad Case of Stripes":
      imagePath = "/badCaseOfStripes.jpg";
      break;
    case "Brown Bear, Brown Bear, What Do...":
      imagePath = "/brownBear.jpg";
      break;
    case "The Very Hungry Caterpillar":
      imagePath = "/hungryCaterpillar.jpg";
      break;
    case "Horton Hears A Who":
      imagePath = "/hortonHearsWho.jpg";
      break;
    case "Cloudy With a Chance of Meatballs":
      imagePath = "/cloudyWMeatballs.jpg";
      break;
    default:
      imagePath = "/default.jpg"; // Default image if title does not match
  }

  return <img width="400" height="600" src={imagePath} alt={storyTitle} />;
};

const HorizontalBar = () => {
  return <div className="w-full h-[1px] mb-5 bg-slate-400"></div>;
}

const ReadingScreen = () => {
  const [storyIndex, SetStoryIndex] = useState<number>(0);
  const [userText, SetUserText] = useState<string>("");
  const [readMode, SetReadMode] = useState<number>(0);
  const [storySection, SetStorySection] = useState<string>("");
  const [correctBool, SetCorrectBool] = useState<boolean>(false);
  const searchParams = useSearchParams()
  const title = searchParams.get("title")
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/getStorySection" + title + "/" + storyIndex);
        const jsonData = await response.json();
        console.log(jsonData);
        SetStorySection(JSON.parse(jsonData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    return () => {
      // Cleanup logic here (if needed)
    };
  }, [storyIndex]);

  function getNextPage()  {
    SetStoryIndex(storyIndex + 1);
    SetCorrectBool(false);
  }

  const copyToClipboard = (text : string) => {
    navigator.clipboard.writeText(text)
  };

  useEffect(() => {
    if (correctBool && audioRef.current) {
      audioRef.current.play();
    }
  }, [correctBool])

  return (
    <div className="w-full h-30 flex flex-col mt-20 ml-36 mr-10 bg-white overflow-hidden shadow-lg justify-center items-center">
        <h1 className="mt-10 mb-0 m-auto font-bold text-center text-3xl">
            {(readMode == 0) ? <p>Read Along!</p> : <p>Review Mistakes</p>}
            <p className="text-gray-400 text-xl">{title}</p>
            <p className="text-gray-400 text-lg">Section: {storyIndex}</p>
        </h1>
        <HorizontalBar></HorizontalBar>
        <BookImage storyTitle={title}></BookImage>
        <div className="w-1/2 max-h-72 flex mt-5 mb-10 p-5 bg-gray-300 text-center justify-center items-center whitespace-pre-wrap">
          <TtsButton text={sampleText[storyIndex]}></TtsButton>
          <span onClick={() => copyToClipboard(sampleText[storyIndex])} className="w-1/3 hover:cursor-copy text-center m-auto text-lg hover:bg-gray-400 hover:underline">{sampleText[storyIndex]}</span>
        </div>
        <HorizontalBar></HorizontalBar>
        <Recorder storyText={sampleText[storyIndex]} setBool={SetCorrectBool} />
        {correctBool && 
          <button onClick={getNextPage} className="bg-blue-400 text-white font-bold shadow-lg m-auto mb-10 p-5 pt-3 pb-3 rounded-lg items-center">All Correct! Click to Continue!</button>
        }
        <audio className="invisible" ref={audioRef} controls src="duolingo-correct.mp3" />
    </div>
  );
}

/*
{transcriber.output?.text.includes(sampleText[storyIndex]) && <button onClick={getNextPage}>CORRECT!</button>}
*/

export default ReadingScreen