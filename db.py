from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import HTTPException

try:
    client = AsyncIOMotorClient("mongodb://localhost:27017/")

    db = client.Agriculture
    user_collection = db.users
    deals_Collection = db.deals

except HTTPException as e:
    print(f"An error occurred: {e}")
    raise e