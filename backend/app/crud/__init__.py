from app.crud.education import education
from app.crud.personal_info import contact, language, personal_info
from app.crud.professional_experience import professional_experience
from app.crud.project import project, project_image
from app.crud.skill import category_skill, skill

__all__ = [
    "category_skill",
    "contact",
    "education",
    "language",
    "personal_info",
    "professional_experience",
    "project",
    "project_image",
    "skill",
]
