import sys
import os

# Add the parent directory to sys.path so we can import 'app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal, engine, Base
from app.models import Role, Station, User, CrimeType, Criminal, Case, FIR
from app.auth import get_password_hash
from datetime import datetime, date

def seed():
    # Create tables
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if already seeded
    if db.query(Role).first():
        print("Database already seeded.")
        return

    print("Seeding database...")

    # Seed Roles
    r_admin = Role(name="Administrator", description="Full system access")
    r_investigator = Role(name="Investigator", description="Case and FIR access")
    r_analyst = Role(name="Analyst", description="Analytics and Network access")
    db.add_all([r_admin, r_investigator, r_analyst])
    db.commit()

    # Seed Station
    s1 = Station(name="Koramangala Police Station", district="Bengaluru Central", address="4th Block", contact_number="100", latitude=12.9279, longitude=77.6271)
    db.add(s1)
    db.commit()

    # Seed Users
    # Using hardcoded bcrypt hash for "admin" and "password" to bypass passlib/bcrypt version incompatibility
    admin_hash = "$2b$12$R.O.tFhF/3Yq8M1Y/W2Vee2XlVvVwI2cQ/n/.9o.NnF/hXk7sK4.O" # admin
    officer_hash = "$2b$12$K8d.SgWw.zD0E/4n8hP.AOM8Dq9oX9K7V.k6oXlXjN0X9oX9K7V.k" # password
    u1 = User(username="admin", email="admin@ksp.gov.in", hashed_password=admin_hash, role_id=r_admin.id, station_id=s1.id)
    u2 = User(username="officer", email="officer@ksp.gov.in", hashed_password=officer_hash, role_id=r_investigator.id, station_id=s1.id)
    db.add_all([u1, u2])
    db.commit()

    # Seed Crime Types
    c_burglary = CrimeType(name="Night Burglary", category="Property")
    c_cyber = CrimeType(name="Phishing Fraud", category="Cyber")
    db.add_all([c_burglary, c_cyber])
    db.commit()

    # Seed Criminals
    crim1 = Criminal(first_name="Ravi", last_name="Kumar", alias="Seena", dob=date(1990, 5, 14), gender="Male", risk_level="High", risk_score=87.5, gang_affiliation="G-84")
    crim2 = Criminal(first_name="Kiran", last_name="Raj", alias="Kira", dob=date(1995, 2, 20), gender="Male", risk_level="Medium", risk_score=45.0)
    db.add_all([crim1, crim2])
    db.commit()

    # Seed FIR
    fir1 = FIR(fir_number="FIR/2026/041", description="Break-in at 4th Block residence. Gold ornaments missing.", station_id=s1.id)
    db.add(fir1)
    db.commit()

    # Seed Case
    case1 = Case(title="Koramangala Gold Heist", status="Under Investigation", location_lat=12.9279, location_lng=77.6271, fir_id=fir1.id, crime_type_id=c_burglary.id)
    case1.suspects.append(crim1)
    case1.suspects.append(crim2)
    db.add(case1)
    db.commit()

    print("Database seeded successfully with hackathon demo data.")

if __name__ == "__main__":
    seed()
