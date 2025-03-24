from typing import List
from bson import ObjectId
from fastapi import APIRouter, Request
from pydantic import BaseModel
from models import Deals, User, LoginUser
from db import user_collection, deals_Collection, complaint_collection
from fastapi import HTTPException
from utils.security import hash_password, verify_password
from utils.token import create_access, verify_access


router = APIRouter()

@router.post('/auth/create')
async def create_account(user: User):
    try:
        existing_user = await user_collection.find_one({'email': user.email})
        if existing_user:
            raise HTTPException(status_code=400, detail='Email already exists')
        user.password = hash_password(user.password)
        await user_collection.insert_one(user.dict())
        return {"message": "Account created successfully", "user": user.dict()}
    except HTTPException as e:
        raise e

@router.post("/auth/login")
async def login_user(user: LoginUser):
    try:
        existing_user = await user_collection.find_one({"email" : user.email})
        existing_user['_id'] = str( existing_user['_id'])
        if not existing_user:
            raise HTTPException(status_code=401, detail='Invalid email or password')
        if not verify_password(hashed=existing_user["password"], plain=user.password):
            raise HTTPException(status_code=401, detail='Invalid email or password')
        access_token = create_access({
            "email": existing_user['email'],
            "name" : existing_user['name'],
            "role" : existing_user['role']
        })
        return {"message": "Logged in successfully", "user": existing_user, "access_token": access_token}
    except HTTPException as e:
        raise e


#dealer endpoints
@router.post('/dealer/deals')
async def create_deals(deal: Deals, request: Request):
    user = verify_access(request.headers.get("Authorization"))
    print(user['role'] )
    if user['role'] != "dealer":
        raise HTTPException(status_code=403, detail='You are not authorized to perform this action')

    try:
        deal_data = deal.model_dump()  
        deal_data['_id'] = str(ObjectId())  
        deal_data['posted_by'] = user['email']  
        deal_data['accepted'] = False
        deal_data['accepted_by'] = ""

   
        await deals_Collection.insert_one(deal_data)

        return {"message": "Deal created successfully", "deal": deal_data}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@router.get('/mydeals')
async def get_deals(request: Request):
    user = verify_access(request.headers.get("Authorization"))
    if user['role'] != "dealer":
        raise HTTPException(status_code=403, detail='You are not authorized to perform this action')
    try:
        deals = await deals_Collection.find({"posted_by": user['email']}).to_list()
        return {"message": "Deals fetched successfully", "deals": deals}
    except HTTPException as e:
        raise e

@router.get('/dealer/deal/view/{deal_id}')
async def get_deal_dealer(deal_id: str, request: Request):
    user = verify_access(request.headers.get("Authorization"))

    if user['role'] != "dealer":
        raise HTTPException(status_code=403, detail='You are not authorized to perform this action')

    try:
        pipeline = [
            {"$match": {"_id": deal_id}}, 
            {
                "$lookup": {
                    "from": "users",
                    "localField": "accepted_by",
                    "foreignField": "email",
                    "as": "user_accepted"
                }
            }
        ]

        deal_cursor = deals_Collection.aggregate(pipeline)
        deal = await deal_cursor.to_list(length=1)

        if not deal:
            raise HTTPException(status_code=404, detail="Deal not found")

        deal[0]["_id"] = str(deal[0]["_id"])  

        if deal[0].get("user_accepted") and len(deal[0]["user_accepted"]) > 0:
            deal[0]["user_accepted"][0]["_id"] = str(deal[0]["user_accepted"][0]["_id"])

        return {"message": "Deals fetched successfully", "deals": deal[0]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")




#farmer endpoints
@router.get('/deals/all')
async def get_all_deals(request: Request):
    user = verify_access(request.headers.get("Authorization"))
    if user['role'] != "farmer":
        raise HTTPException(status_code=403, detail='You are not authorized to perform this action')
    try:
        deals = await deals_Collection.find({"accepted" : False}).to_list(length=None)
        return {"message": "Deals fetched successfully", "deals": deals}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    
@router.get('/farmer/deals/accepted')
async def get_deals_accepted(request: Request):
    user = verify_access(request.headers.get("Authorization"))
    if user['role'] != "farmer":
        raise HTTPException(status_code=403, detail='You are not authorized to perform this action')
    try:
        deals = await deals_Collection.find({"accepted" : True, "accepted_by" : user["email"]}).to_list(length=None)
        return {"message": "Deals fetched successfully", "deals": deals}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@router.get('/farmer/deal/{deal_id}')
async def get_deal(deal_id: str, request: Request):
    user = verify_access(request.headers.get("Authorization"))
    print(deal_id)
    if user['role'] != "farmer":
        raise HTTPException(status_code=403, detail='You are not authorized to perform this action')
    try:
        deal = await deals_Collection.find_one({"_id":deal_id})
        return {"message": "Deals fetched successfully", "deals": deal}
    except HTTPException as e:
        raise e


@router.patch("/farmer/accept/{deal_id}")
async def accept_deal(deal_id: str, request: Request):
    user = verify_access(request.headers.get("Authorization"))
    if user['role'] != "farmer":
        raise HTTPException(status_code=403, detail='You are not authorized to perform this action')
    try:
        await deals_Collection.update_one({"_id" : deal_id}, {
            "$set":{
                "accepted" : True,
                "accepted_by": user['email']
            }
        })
        return {"message" : "Deal accepted successfully", "deal" : deal_id}
    except HTTPException as e:
        raise e

@router.get('/farmer/users')
async def get_farmers(request:  Request):
    user = verify_access(request.headers.get("Authorization"))
    if user['role'] != "farmer":
        raise HTTPException(status_code=403, detail='You are not authorized to perform this action')
    try:
        users = await user_collection.find({"email": {"$ne": user['email']}, "role" : {"$ne" : "dealer"}}).to_list(length=None)
        for u in users:
            u["_id"] = str(u['_id'])
        return users
    except HTTPException as e:
        raise e
    
@router.get("/all/users")
async def get_all_users(request: Request):
    user = verify_access(request.headers.get("Authorization"))
    if user['role'] != "admin":
        raise HTTPException(status_code=403, detail='You are not authorized to perform this action')
    try:
        users = await user_collection.find({"role" : {"$ne" : "admin"}}).to_list(length=None)
        for u in users:
            u["_id"] = str(u['_id'])
        return users
    except HTTPException as e:
        raise e
    

class Complaint(BaseModel):
    name: str
    email: str
    subject: str
    description: str


@router.post("/complaints")
async def create_complaint(request:  Request, complaint: Complaint):
    user = verify_access(request.headers.get("Authorization"))
    if user['role'] != "farmer":
        raise HTTPException(status_code=403, detail='You are not authorized to perform this action')
    try:
        complaint_data = complaint.dict()
        complaint_data["user"] = user['email']
        result = await complaint_collection.insert_one(complaint_data)
        return {"message": "Complaint registered successfully", "complaint_id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/complaints", response_model=List[Complaint])
async def get_complaints(request:  Request):
    user = verify_access(request.headers.get("Authorization"))
    if user['role'] != "admin":
        raise HTTPException(status_code=403, detail='You are not authorized to perform this action')
    try:
        complaints = await complaint_collection.find({}, {"_id": 0}).to_list()
        return complaints
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))