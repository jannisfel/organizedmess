import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col items-center gap-2 min-w-[50%]">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Add an Item
        </h3>
        <Input className="w-full" label="Name" size="lg" />
        <Input className="w-full" label="Description" size="lg" />
        <Input className="w-full" label="Expiration" size="lg" />
        <Input className="w-full" label="Type" size="lg" />
        <Input className="w-full" label="Location" size="lg" />
        <Button className="w-full" color="primary">
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
