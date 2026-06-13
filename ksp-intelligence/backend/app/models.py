from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text, Float, Date, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

# Association table for Cases and Criminals
case_criminal_association = Table(
    'case_criminal', Base.metadata,
    Column('case_id', Integer, ForeignKey('cases.id')),
    Column('criminal_id', Integer, ForeignKey('criminals.id'))
)

class Role(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)  # Admin, Officer, Analyst
    description = Column(String)
    users = relationship("User", back_populates="role")

class Station(Base):
    __tablename__ = "stations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    district = Column(String, index=True)
    address = Column(String)
    contact_number = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    users = relationship("User", back_populates="station")
    firs = relationship("FIR", back_populates="station")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    role_id = Column(Integer, ForeignKey("roles.id"))
    station_id = Column(Integer, ForeignKey("stations.id"), nullable=True)
    
    role = relationship("Role", back_populates="users")
    station = relationship("Station", back_populates="users")
    audit_logs = relationship("AuditLog", back_populates="user")

class CrimeType(Base):
    __tablename__ = "crime_types"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    category = Column(String)  # Violent, Property, Cyber, etc.
    cases = relationship("Case", back_populates="crime_type")

class Criminal(Base):
    __tablename__ = "criminals"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    alias = Column(String)
    dob = Column(Date)
    gender = Column(String)
    address = Column(String)
    photo_url = Column(String)
    risk_level = Column(String) # High, Medium, Low
    risk_score = Column(Float, nullable=True) # 0.0 to 100.0
    gang_affiliation = Column(String, nullable=True)
    
    arrests = relationship("ArrestRecord", back_populates="criminal")
    cases = relationship("Case", secondary=case_criminal_association, back_populates="suspects")
    financial_transactions = relationship("FinancialTransaction", back_populates="criminal")

class Victim(Base):
    __tablename__ = "victims"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    dob = Column(Date)
    gender = Column(String)
    contact = Column(String)
    case_id = Column(Integer, ForeignKey("cases.id"))
    case = relationship("Case", back_populates="victims")

class FIR(Base):
    __tablename__ = "firs"
    id = Column(Integer, primary_key=True, index=True)
    fir_number = Column(String, unique=True, index=True)
    date_filed = Column(DateTime(timezone=True), server_default=func.now())
    description = Column(Text)
    station_id = Column(Integer, ForeignKey("stations.id"))
    
    station = relationship("Station", back_populates="firs")
    case = relationship("Case", back_populates="fir", uselist=False)

class Case(Base):
    __tablename__ = "cases"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    status = Column(String) # Open, Closed, Under Investigation
    date_opened = Column(DateTime(timezone=True), server_default=func.now())
    date_closed = Column(DateTime(timezone=True), nullable=True)
    location_lat = Column(Float, nullable=True)
    location_lng = Column(Float, nullable=True)
    
    fir_id = Column(Integer, ForeignKey("firs.id"))
    crime_type_id = Column(Integer, ForeignKey("crime_types.id"))
    
    fir = relationship("FIR", back_populates="case")
    crime_type = relationship("CrimeType", back_populates="cases")
    victims = relationship("Victim", back_populates="case")
    suspects = relationship("Criminal", secondary=case_criminal_association, back_populates="cases")
    evidence = relationship("EvidenceRecord", back_populates="case")

class ArrestRecord(Base):
    __tablename__ = "arrest_records"
    id = Column(Integer, primary_key=True, index=True)
    date_of_arrest = Column(DateTime(timezone=True), server_default=func.now())
    location = Column(String)
    officer_in_charge = Column(String)
    criminal_id = Column(Integer, ForeignKey("criminals.id"))
    
    criminal = relationship("Criminal", back_populates="arrests")

class EvidenceRecord(Base):
    __tablename__ = "evidence_records"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(Text)
    type = Column(String) # Physical, Digital, Document
    collection_date = Column(DateTime(timezone=True), server_default=func.now())
    case_id = Column(Integer, ForeignKey("cases.id"))
    
    case = relationship("Case", back_populates="evidence")

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    message = Column(Text)
    severity = Column(String) # High, Medium, Low
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    action = Column(String)
    endpoint = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    user_id = Column(Integer, ForeignKey("users.id"))
    
    user = relationship("User", back_populates="audit_logs")

class FinancialTransaction(Base):
    __tablename__ = "financial_transactions"
    id = Column(Integer, primary_key=True, index=True)
    account_number = Column(String, index=True)
    bank_name = Column(String)
    transaction_type = Column(String) # Deposit, Withdrawal, Transfer
    amount = Column(Float)
    transaction_date = Column(DateTime(timezone=True), server_default=func.now())
    description = Column(Text)
    is_suspicious = Column(Boolean, default=False)
    criminal_id = Column(Integer, ForeignKey("criminals.id"), nullable=True)
    
    criminal = relationship("Criminal", back_populates="financial_transactions")

class SuspiciousActivity(Base):
    __tablename__ = "suspicious_activities"
    id = Column(Integer, primary_key=True, index=True)
    activity_type = Column(String)
    description = Column(Text)
    date_reported = Column(DateTime(timezone=True), server_default=func.now())
    location_lat = Column(Float, nullable=True)
    location_lng = Column(Float, nullable=True)
    risk_score = Column(Float, nullable=True)
    
class CrimeForecast(Base):
    __tablename__ = "crime_forecasts"
    id = Column(Integer, primary_key=True, index=True)
    forecast_date = Column(Date)
    district = Column(String, index=True)
    crime_type_category = Column(String)
    predicted_count = Column(Integer)
    confidence_score = Column(Float)
    reasoning = Column(Text) # Explainability part
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class VoiceNote(Base):
    __tablename__ = "voice_notes"
    id = Column(Integer, primary_key=True, index=True)
    audio_url = Column(String)
    transcript = Column(Text)
    translated_text = Column(Text, nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    case_id = Column(Integer, ForeignKey("cases.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    
    case = relationship("Case", backref="voice_notes")
    user = relationship("User", backref="voice_notes")

class InvestigationMemory(Base):
    __tablename__ = "investigation_memories"
    id = Column(Integer, primary_key=True, index=True)
    entity_type = Column(String) # Suspect, Vehicle, Location, Event
    entity_id = Column(String, nullable=True)
    fact_details = Column(Text)
    confidence = Column(Float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    case_id = Column(Integer, ForeignKey("cases.id"))
    
    case = relationship("Case", backref="memories")

class TimelineEvent(Base):
    __tablename__ = "timeline_events"
    id = Column(Integer, primary_key=True, index=True)
    event_time = Column(DateTime(timezone=True))
    description = Column(Text)
    source_type = Column(String) # VoiceNote, FIR, WitnessStatement
    source_id = Column(Integer)
    case_id = Column(Integer, ForeignKey("cases.id"))
    
    case = relationship("Case", backref="timeline_events")

class WitnessStatement(Base):
    __tablename__ = "witness_statements"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    contact = Column(String)
    statement = Column(Text)
    date_recorded = Column(DateTime(timezone=True), server_default=func.now())
    case_id = Column(Integer, ForeignKey("cases.id"))
    
    case = relationship("Case", backref="witness_statements")

class AIReport(Base):
    __tablename__ = "ai_reports"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String) # Summary, Briefing
    content = Column(Text)
    generated_date = Column(DateTime(timezone=True), server_default=func.now())
    case_id = Column(Integer, ForeignKey("cases.id"), nullable=True)
    
    case = relationship("Case", backref="ai_reports")
