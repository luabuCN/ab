import { categoryItems } from "../lib/cateforyItems";
import Image from "next/image";

export default function CategoryShowcase({
  categoryName,
}: {
  categoryName: string;
}) {
  const category = categoryItems.find((item) => item.path === categoryName);
  return (
    <div className="flex items-center">
      <Image
        src={category?.imageUrl as string}
        alt={category?.name as string}
        width={44}
        height={44}
      />
      <div className="flex flex-col ml-4">
        <h3 className="font-medium ">{category?.title}</h3>
        <p className="text-sm text-gray-500">{category?.description}</p>
      </div>
    </div>
  );
}
