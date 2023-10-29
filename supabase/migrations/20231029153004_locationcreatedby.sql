alter table "public"."items" drop constraint "items_created_by_fkey";

alter table "public"."items" alter column "created_by" set not null;

alter table "public"."items" disable row level security;

alter table "public"."locations" add column "created_by" uuid not null;

alter table "public"."locations" disable row level security;

alter table "public"."users" disable row level security;

alter table "public"."locations" add constraint "locations_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."locations" validate constraint "locations_created_by_fkey";

alter table "public"."items" add constraint "items_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."items" validate constraint "items_created_by_fkey";


