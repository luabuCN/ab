import { createReservation } from "@/app/actions";
import CategoryShowcase from "@/app/components/CategoryShowcase";
import HomeMap from "@/app/components/HomeMap";
import { SelectCalender } from "@/app/components/SelectCalender";
import { ReservationSubmit } from "@/app/components/submitButtons";
import prisma from "@/app/lib/db";
import { countriesFormatted, useCountries } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getData(homeId: string) {
  noStore();
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
      User: true,
      Reservation: {
        where: {
          homeId: homeId,
        },
      },
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
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const getCountryByValue = (value: string) => {
    return countriesFormatted.find((item) => item.value === value);
  };
  const country = getCountryByValue(data?.country as string);
  return (
    <div className=" w-[75%] mx-auto mt-10 mb-10">
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
          <div className="flex items-center mt-6">
            <Image
              src={
                data?.User?.profileImage ??
                "https://gd-hbimg.huaban.com/951d39b4ab5b6dd752ed07c6e3a8b8f0bff1af6028fd-V8jEyY_fw236"
              }
              alt="用户头像"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className=" font-medium">{data?.User?.firstName} 的房源</h3>
              <p className="text-sm text-muted-foreground">自从2015开始</p>
            </div>
          </div>

          <Separator className="my-7" />
          <CategoryShowcase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <p className="text-muted-foreground">{data?.description}</p>
          <Separator className="my-7" />

          <HomeMap locationValue={country?.value as string} />
        </div>
        <form action={createReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user.id} />
          <SelectCalender reservation={data?.Reservation} />

          {user?.id ? (
            <ReservationSubmit />
          ) : (
            <Button className="w-full">
              <Link href="/api/auth/login">预定房间</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
