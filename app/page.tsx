import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MapFilterItems } from "./components/MapFilterItems";
import prisma from "./lib/db";
import ListingCard from "./components/ListinfCard";
import Link from "next/link";
import { Suspense } from "react";
import SkeletonCard from "./components/SkeletonCard";
import { NoItem } from "./components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams: {
    filter?: string;
  };
}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });
  return data;
}
export default function Home({
  searchParams,
}: {
  searchParams: {
    filter?: string;
  };
}) {
  return (
    <div className=" container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({
    searchParams: searchParams as any,
    userId: user?.id,
  });
  return (
    <>
      {data.length === 0 ? (
        <NoItem
          title="没有找打对应的房源"
          description="请检查或者创建你的房源"
        />
      ) : (
        <div className=" grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              price={item.price as number}
              location={item.country as string}
              imagePath={item.photo as string}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/"
            />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className=" grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
