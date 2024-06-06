import datetime
import json
import subprocess
import os
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Request
#from db import test, unlocks_table, authorized_table
from bson.json_util import dumps
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from pathlib import Path
import whisper
import base64
from pydantic import BaseModel
from openai import OpenAI
import aiofiles
import pyttsx3

load_dotenv()

app = FastAPI()
model = whisper.load_model("base")
engine = pyttsx3.init()

# Optionally, you can also change the rate and volume
engine.setProperty('rate', 150)  # Speed of speech
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    print("test")
    return {"cool": "guy"}

@app.get("/getStory/{title}")
def getStory(title: str):
    cursor = story_table.find_one({"title": title})
    return dumps(cursor)

@app.get("/getStorySection/{title}/{index}")
def getStory(title: str, index: int):
    text = ""
    cursor = story_table.find_one({"title": title})
    
    for document in cursor:
        text = document["content"]
        sentences = text.split('.')
        groups = [sentences[index:index+4]]
    
        # Join sentences back into strings
        for i, group in enumerate(groups):
            groups[i] = '.'.join(group).strip()
    return dumps(groups)

@app.post("/getSTT")
async def getStory(file : UploadFile = File(...)):
    # Get the absolute path of the current file
    #print(result["text"])'''
    with open(f"./test2.mp3", "wb") as f:
        f.write(await file.read())
    
    result = model.transcribe("./test2.mp3", fp16=False)
    print(result["text"])

    return JSONResponse(content={
        "SpeechToText": result["text"]
    })

@app.post("/getTTS")
async def getStory(request : Request):
    # Get the absolute path of the current file
    #print(result["text"])'''
    # Initialize the Pyttsx3 engine
    ttsAudioPath = "tts.mp3"
    text = await request.body()
    text.decode("utf-8")
    
    # We can use file extension as mp3 and wav, both will work
    engine.save_to_file(text, ttsAudioPath)
    
    # Wait until above command is not finished.
    engine.runAndWait()

    return FileResponse(ttsAudioPath, media_type='audio/mpeg', filename=ttsAudioPath)