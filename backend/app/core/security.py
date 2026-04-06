import hashlib
import bcrypt
from authlib.jose import jwt
from authlib.jose.errors import JoseError
from datetime import datetime, timezone, timedelta

from app.core.config import settings



def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())


def create_access_token(subject: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": subject,
        "iat": now,
        "exp": now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        "type": "access",
    }
    return jwt.encode({"alg": "HS256"}, payload, settings.SECRET_KEY).decode()


def decode_access_token(token: str) -> dict | None:
    try:
        claims = jwt.decode(token, settings.SECRET_KEY)
        claims.validate()
        return claims
    except JoseError:
        return None


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()
