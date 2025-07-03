from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("AIzaSyBRGOawlVufmtKxaRX1uPsrXxfaJTvH7dY"))

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class Message(BaseModel):
    text: str

@app.get("/", response_class=HTMLResponse)
def get_home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/chat")
def chat(message: Message):
    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(message.text)
        return {"response": response.text.strip()}
    except Exception as e:
        return {"response": f"⚠️ Error: {str(e)}"}
