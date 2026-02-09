-- Database Schema v1

create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  created_at timestamp with time zone default now()
);

create table athlete_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  birth_date date,
  height_cm int,
  weight_kg int,
  category text,
  experience_level text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
