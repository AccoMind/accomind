#!/usr/bin/env python3
"""
Script to create a test user for AccoMind application
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from db.session import SessionLocal, engine
from models.user import User
from core.security import get_password_hash
import models

# Create tables if they don't exist
models.user.Base.metadata.create_all(bind=engine)

def create_test_user():
    """Create a test user for login"""
    db: Session = SessionLocal()
    
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == "test@accomind.com").first()
        if existing_user:
            print("Test user already exists!")
            print(f"Email: test@accomind.com")
            print(f"Password: testpassword123")
            return
        
        # Create new test user
        test_user = User(
            username="testuser",
            email="test@accomind.com",
            password=get_password_hash("testpassword123"),
            full_name="Test User"
        )
        
        db.add(test_user)
        db.commit()
        db.refresh(test_user)
        
        print("✅ Test user created successfully!")
        print(f"📧 Email: test@accomind.com")
        print(f"🔑 Password: testpassword123")
        print(f"👤 Full Name: Test User")
        print("\nYou can now login to the application using these credentials.")
        
    except Exception as e:
        print(f"❌ Error creating test user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_test_user()
