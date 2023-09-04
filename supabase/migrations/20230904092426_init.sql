create table "public"."items" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "updated_at" timestamp with time zone not null default now(),
    "name" text not null,
    "description" text,
    "expires_at" timestamp with time zone,
    "item_type" text,
    "location" uuid not null
);


alter table "public"."items" enable row level security;

create table "public"."locations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "description" text
);


alter table "public"."locations" enable row level security;

create table "public"."users" (
    "id" uuid not null,
    "name" text not null
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX items_pkey ON public.items USING btree (id);

CREATE UNIQUE INDEX locations_pkey ON public.locations USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."items" add constraint "items_pkey" PRIMARY KEY using index "items_pkey";

alter table "public"."locations" add constraint "locations_pkey" PRIMARY KEY using index "locations_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."items" add constraint "items_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) not valid;

alter table "public"."items" validate constraint "items_created_by_fkey";

alter table "public"."items" add constraint "items_location_fkey" FOREIGN KEY (location) REFERENCES locations(id) ON DELETE CASCADE not valid;

alter table "public"."items" validate constraint "items_location_fkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_id_fkey";


