import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function Home() {



    const placements = ["inside", "outside", "outside-left"];
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
        <label htmlFor="item-description" className="text-lg font-semibold">
          Enter Item description:
        </label>
        <Input
          id="item-description"
          placeholder="Type item description here..."
          width="300px"
          size="lg"
        />
        <label htmlFor="item-expiration" className="text-lg font-semibold">
          Enter Item expiration:
        </label>
        <Input
          id="item-expiration"
          placeholder="Type item expiration here..."
          width="300px"
          size="lg"
        />
        <label htmlFor="item-type" className="text-lg font-semibold">
          Enter Item type:
        </label>
        <Input
          id="item-type"
          placeholder="Type item type here..."
          width="300px"
          size="lg"
        />
        <label htmlFor="item-location" className="text-lg font-semibold">
          Enter Item Location:
        </label>
        <Input
          id="item-location"
          placeholder="Type item location here..."
          width="300px"
          size="lg"
        />
        <div style={{ margin: "1rem 0" }}>
          <Button color="primary">Add Item</Button>
        </div>
      </div>
      <div className="text-center">
        <h3>Recently Added Items</h3>
        {/* Display recently added items here */}
      </div>
    </section>
  );
}
