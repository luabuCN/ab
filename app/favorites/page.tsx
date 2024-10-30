import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { NoItem } from "../components/NoItem";
import ListingCard from "../components/ListinfCard";

async function getData(userId: string) {
  const data = await prisma.favorite.findMany({
    where: {
      userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          Favorite: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  });
  return data;
}
export default async function FavoriteRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user.id);

  return (
    <section className=" container mx-auto py-10 lg:py-5 my-5">
      <h2 className="text-3xl font-semibold tracking-wider">Your Favorites</h2>
      {data.length === 0 ? (
        <NoItem title="没有收藏的房间" description="快去收藏吧！" />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id}
              description={item.Home?.description as string}
              location={item.Home?.country as string}
              pathName="/favorites"
              homeId={item.Home?.photo as string}
              imagePath={item.Home?.photo as string}
              price={item.Home?.price as number}
              favoriteId={item.Home?.Favorite[0]?.id as string}
              userId={user.id as string}
              isInFavoriteList={
                (item.Home?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
