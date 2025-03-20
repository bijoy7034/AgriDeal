from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class User(BaseModel):
    name:str
    email:str
    password:str
    role: str
    mobile: int

class LoginUser(BaseModel):
    email: str
    password:str

class Deals(BaseModel):
    title: str
    description: str
    requested_quantity: int
    unit: str
    max_price_per_unit: float
    category: Optional[str]
    required_quality_grade: Optional[str]
    needed_by: Optional[datetime]
    location: Optional[str] 
