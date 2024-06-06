import datetime
import json
import subprocess
import os
from dotenv import load_dotenv
from fastapi import FastAPI
#from db import test, unlocks_table, authorized_table
from bson.json_util import dumps
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import whisper

load_dotenv()

app = FastAPI()
model = whisper.load_model("base")

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

@app.get("/getSTT")
def getStory():
    # Get the absolute path of the current file
    current_dir = os.path.dirname(os.path.abspath(__file__))

    result = model.transcribe(os.path.join(current_dir, "test.mp3"), fp16=False)
    print(result["text"])
    return result["text"]