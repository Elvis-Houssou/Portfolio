import enum


class Availability(str, enum.Enum):
    available = "available"
    later = "later"
    unavailable = "unavailable"


class WorkType(str, enum.Enum):
    full_time = "full_time"
    part_time = "part_time"
    contract = "contract"
    freelance = "freelance"


class LanguageLevel(str, enum.Enum):
    native = "native"
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"
    professional = "professional"
