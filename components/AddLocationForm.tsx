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
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Add an Location
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-4 max-w-md w-full"
      >
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
  );
}
