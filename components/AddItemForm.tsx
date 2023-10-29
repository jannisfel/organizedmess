"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { FormState, formStateSchema } from "@/app/items/create/schema";

export default function AddItemForm({
  createItem,
}: {
  createItem: (data: FormState) => Promise<void>;
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
      await createItem(data);
      router.push("/items");
    } catch (error) {
      alert("Error creating item");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Add an Item
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
        <Input
          className="w-full"
          {...register("expiration")}
          label="Expiration"
          size="lg"
        />
        <Input
          className="w-full"
          {...register("type")}
          label="Type"
          size="lg"
        />
        <Input
          className="w-full"
          {...register("location")}
          label="Location"
          size="lg"
          isRequired
        />
        <Button className="w-full" color="primary" type="submit">
          Add Item
        </Button>
      </form>
    </div>
  );
}
