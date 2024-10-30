import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import Image from "next/image";
async function getData(homeId: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
    },
  });
  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  return (
    <div className=" w-[75%] mx-auto mt-10">
      <h1 className=" font-medium text-2xl mb-5">{data?.title}</h1>
      <div className=" relative h-[550px]">
        <Image
          alt="房间图片"
          src={`https://myxzmjfrynltdndonwjx.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className=" rounded-lg h-full object-cover w-full"
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3 ">
          <h3 className=" text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests </p> * <p>{data?.bedrooms} Bedrooms</p> *
            <p>{data?.bathrooms} Bathrooms</p>
          </div>
        </div>
      </div>
    </div>
  );
}
