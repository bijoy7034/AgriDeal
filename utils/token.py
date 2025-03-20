from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from jose import jwt, JWTError
from datetime import datetime, timedelta

def create_access(data : dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(int(10))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, "helloworld", algorithm="HS256")

def verify_access(token: str):
    try:
        token = token.split(" ")[1]
        payload = jwt.decode(token, "helloworld", algorithms="HS256")
        if not payload:
            raise HTTPException(status_code=401, detail="Invalid token")
        return payload  
    except JWTError:
        return{"detail" : "Invalid token"}