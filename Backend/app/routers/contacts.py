from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from app.dependencies import DbDependency, bcrypt_context
from app.models.contact import Contact, ContactCreate
from sqlalchemy.exc import IntegrityError
import logging

# Configurer les logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix = "/contacts",
    tags= ['contacts']
)

@router.get("/get", response_model=Contact, status_code=status.HTTP_200_OK)
def get_contact(db: DbDependency):
    """Récupère les informations de la section 'Contact'."""
    contact = db.query(Contact).first()
    if not contact:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact information not found")
    return contact

@router.post("/create", response_model=Contact, status_code=status.HTTP_201_CREATED)
def create_contact(contact_data: ContactCreate, db: DbDependency):
    """Crée une nouvelle section 'Contact'."""
    contact = Contact.from_orm(contact_data)
    db.add(contact)
    try:
        db.commit()
        db.refresh(contact)
        logger.info("Contact created successfully")
        return contact
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while creating contact: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Contact already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while creating contact: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while creating contact")
    
@router.put("/update/{contact_id}", response_model=Contact, status_code=status.HTTP_200_OK)
def update_contact(contact_id: int, contact_data: ContactCreate, db: DbDependency):
    """Met à jour les informations de la section 'Contact'."""
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact not found")
    
    for key, value in contact_data.dict(exclude_unset=True).items():
        setattr(contact, key, value)
    
    db.add(contact)
    try:
        db.commit()
        db.refresh(contact)
        logger.info("Contact updated successfully")
        return contact
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while updating contact: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Contact already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while updating contact: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while updating contact")
    
@router.delete("/delete/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact(contact_id: int, db: DbDependency):
    """Supprime la section 'Contact'."""
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact not found")
    
    db.delete(contact)
    try:
        db.commit()
        logger.info("Contact deleted successfully")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while deleting contact: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while deleting contact")