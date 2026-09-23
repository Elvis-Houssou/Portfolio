CREATE TYPE "availability" AS ENUM (
  'available',
  'later',
  'unavailable'
);

CREATE TYPE "work_type" AS ENUM (
  'full_time',
  'part_time',
  'contract',
  'freelance'
);

CREATE TYPE "language_level" AS ENUM (
  'native',
  'beginner',
  'intermediate',
  'advanced',
  'professional'
);

CREATE TABLE "personal_infos" (
  "id" uuid PRIMARY KEY,
  "avatar" string,
  "logo" string,
  "resume_url" string,
  "firstname" string(100) NOT NULL,
  "lastname" string(100) NOT NULL,
  "phone" string(100),
  "dob" date,
  "city" string(100),
  "country" string(100),
  "post" string(150),
  "social_status" string(150),
  "profil_description" text,
  "short_description" text,
  "full_description" text,
  "availability" availability,
  "on_site" boolean,
  "hybrid" boolean,
  "remote" boolean,
  "work_type" work_type
);

CREATE TABLE "languages" (
  "id" uuid PRIMARY KEY,
  "personal_info_id" uuid NOT NULL,
  "language" string(100),
  "level" language_level,
  "order" number,
  "is_active" boolean
);

CREATE TABLE "contacts" (
  "id" uuid PRIMARY KEY,
  "personal_info_id" uuid NOT NULL,
  "icon" string(225),
  "name" string(100),
  "value" string(100),
  "link" string(225),
  "order" number,
  "is_active" boolean
);

CREATE TABLE "category_skills" (
  "id" uuid PRIMARY KEY,
  "icon" string(100),
  "name" string(100),
  "description" string,
  "order" number,
  "is_active" boolean
);

CREATE TABLE "skills" (
  "id" uuid PRIMARY KEY,
  "category_skill_id" uuid NOT NULL,
  "icon" string(100),
  "name" string(100),
  "description" string(100),
  "link" string,
  "order" number,
  "is_active" boolean
);

CREATE TABLE "projects" (
  "id" uuid PRIMARY KEY,
  "name" string(100),
  "project_link" string,
  "github_link" string,
  "short_description" string,
  "large_description" text,
  "technical_description" text,
  "order" number,
  "is_active" boolean
);

CREATE TABLE "project_images" (
  "id" uuid PRIMARY KEY,
  "project_id" uuid NOT NULL,
  "image" string,
  "order" number
);

CREATE TABLE "project_skills" (
  "id" uuid PRIMARY KEY,
  "project_id" uuid NOT NULL,
  "skill_id" uuid NOT NULL
);

CREATE TABLE "educations" (
  "id" uuid PRIMARY KEY,
  "school_name" string,
  "school_link" string,
  "school_avatar" string,
  "field_study" string,
  "degree" string,
  "start_date" date,
  "end_date" date,
  "mention" string,
  "major_promotion" boolean,
  "description" text,
  "extracurricular_activity" string
);

CREATE TABLE "education_skills" (
  "id" uuid PRIMARY KEY,
  "education_id" uuid NOT NULL,
  "skill_id" uuid NOT NULL
);

CREATE TABLE "professional_experiences" (
  "id" uuid PRIMARY KEY,
  "post_name" string,
  "image" string,
  "work_name" string,
  "work_link" string,
  "city" string,
  "country" string,
  "start_date" date,
  "end_date" date,
  "short_description" string,
  "large_description" text,
  "is_currently" boolean,
  "is_freelance" boolean,
  "project_link" string
);

CREATE TABLE "professional_experience_skills" (
  "id" uuid PRIMARY KEY,
  "professional_experience_id" uuid NOT NULL,
  "skill_id" uuid NOT NULL
);

ALTER TABLE "languages" ADD FOREIGN KEY ("personal_info_id") REFERENCES "personal_infos" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "contacts" ADD FOREIGN KEY ("personal_info_id") REFERENCES "personal_infos" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "skills" ADD FOREIGN KEY ("category_skill_id") REFERENCES "category_skills" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "project_images" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "project_skills" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "project_skills" ADD FOREIGN KEY ("skill_id") REFERENCES "skills" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "education_skills" ADD FOREIGN KEY ("education_id") REFERENCES "educations" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "education_skills" ADD FOREIGN KEY ("skill_id") REFERENCES "skills" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "professional_experience_skills" ADD FOREIGN KEY ("professional_experience_id") REFERENCES "professional_experiences" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "professional_experience_skills" ADD FOREIGN KEY ("skill_id") REFERENCES "skills" ("id") DEFERRABLE INITIALLY IMMEDIATE;
