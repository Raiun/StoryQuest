import datetime
import json
import subprocess
from fastapi import FastAPI
#from db import test, unlocks_table, authorized_table
from bson.json_util import dumps
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from openai import OpenAI

app = FastAPI()

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

@app.get("/getTTS")
def getStory():
    client = OpenAI()

    response = client.audio.speech.create(
        model="tts-1",
        voice="onyx",
        input="Hello world! This is a streaming test.",
    )

    response.stream_to_file("./output.mp3")