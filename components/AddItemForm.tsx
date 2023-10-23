"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

const formStateSchema = z.object({
  name: z.string(),
  description: z.string(),
  expiration: z.string(),
  type: z.string(),
  location: z.string(),
});
type FormState = z.infer<typeof formStateSchema>;

export default function AddItemForm() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    description: "",
    expiration: "",
    type: "",
    location: "",
  });

  const valueChangeHandler = (key: keyof typeof formState) => (value: string) =>
    setFormState((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    // validate formState\
    const result = formStateSchema.safeParse(formState);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col items-center gap-2 min-w-[50%]">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Add an Item
        </h3>
        <Input
          className="w-full"
          value={formState.name}
          onValueChange={valueChangeHandler("name")}
          label="Name"
          size="lg"
          isRequired
        />
        <Input
          className="w-full"
          value={formState.description}
          onValueChange={valueChangeHandler("description")}
          label="Description"
          size="lg"
        />
        <Input
          className="w-full"
          value={formState.expiration}
          onValueChange={valueChangeHandler("expiration")}
          label="Expiration"
          size="lg"
        />
        <Input
          className="w-full"
          value={formState.type}
          onValueChange={valueChangeHandler("type")}
          label="Type"
          size="lg"
        />
        <Input
          className="w-full"
          value={formState.location}
          onValueChange={valueChangeHandler("location")}
          label="Location"
          size="lg"
          isRequired
        />
        <Button className="w-full" color="primary" onClick={handleSubmit}>
          Add Item
        </Button>
      </div>
      <div className="text-center">
        <h3>Recently Added Items</h3>
        {/* Display recently added items here */}
      </div>
    </section>
  );
}
