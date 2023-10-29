"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { FormState, formStateSchema } from "@/app/locations/create/schema";

export default function AddLocationForm({
  createLocation,
}: {
  createLocation: (data: FormState) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    resolver: zodResolver(formStateSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormState) => {
    try {
      await createLocation(data);
      router.push("/locations");
    } catch (error) {
      alert("Error creating location");
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col locations-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col locations-center gap-2 min-w-[50%]">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Add an Location
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="w-full"
            {...register("name")}
            isInvalid={errors.name !== undefined}
            errorMessage={errors.name?.message}
            label="Name"
            size="lg"
          />
          <Input
            className="w-full"
            {...register("description")}
            label="Description"
            size="lg"
          />
          <Button className="w-full" color="primary" type="submit">
            Add Location
          </Button>
        </form>
      </div>
      <div className="text-center">
        <h3>Recently Added Locations</h3>
        {/* Display recently added locations here */}
      </div>
    </section>
  );
}
