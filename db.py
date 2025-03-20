from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import HTTPException

try:
    client = AsyncIOMotorClient("mongodb+srv://bijoyanil74:6hAWOQwiuz74SpTh@cluster0.ld84s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

    db = client.Agriculture
    user_collection = db.users
    deals_Collection = db.deals

except HTTPException as e:
    print(f"An error occurred: {e}")
    raise e