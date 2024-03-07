CREATE TABLE IF NOT EXISTS "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"desctiption" text DEFAULT 'this is my content',
	"created_at" timestamp DEFAULT now()
);
