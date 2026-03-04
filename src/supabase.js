import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://pelwuoapihfdscgmiauk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlbHd1b2FwaWhmZHNjZ21pYXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MTc3MzgsImV4cCI6MjA4ODE5MzczOH0.2b6W5xXiMakx1kLPjhcgp14IuTd3YbQHcSndEuX_43Y"
);