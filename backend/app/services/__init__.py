from app.services.education import education_service
from app.services.personal_info import (
    contact_service,
    language_service,
    personal_info_service,
)
from app.services.professional_experience import professional_experience_service
from app.services.project import project_image_service, project_service
from app.services.skill import category_skill_service, skill_service

__all__ = [
    "category_skill_service",
    "contact_service",
    "education_service",
    "language_service",
    "personal_info_service",
    "professional_experience_service",
    "project_image_service",
    "project_service",
    "skill_service",
]
