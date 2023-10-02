import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="item-name" className="text-lg font-semibold">
          Enter Item Name:
        </label>
        <Input
          id="item-name"
          placeholder="Type item name here..."
          width="300px"
          size="lg"
        />
        <div style={{ margin: "1rem 0" }}>
          <Button color="primary">
            Add Item
          </Button>
        </div>
      </div>
      <div className="text-center">
        <h3>Recently Added Items</h3>
        {/* Display recently added items here */}
      </div>
    </section>
  );
}
