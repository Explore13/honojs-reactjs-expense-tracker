ALTER TABLE "expenses" ALTER COLUMN "creation_date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "creation_date" SET DEFAULT now();