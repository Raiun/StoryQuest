import datetime
import json
import subprocess
import os
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
#from db import test, unlocks_table, authorized_table
from bson.json_util import dumps
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pathlib import Path
import whisper
import base64
from pydantic import BaseModel
from openai import OpenAI
import aiofiles

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

@app.post("/getSTT")
async def getStory(file : UploadFile = File(...)):
    # Get the absolute path of the current file
    #print(result["text"])'''
    with open(f"./test2.mp3", "wb") as f:
        f.write(await file.read())
    return JSONResponse(content={
        "filename": file.filename,
        "content_type": file.content_type,
        "message": "File processed successfully"
    })