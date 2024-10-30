import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { NoItem } from "../components/NoItem";
import ListingCard from "../components/ListinfCard";

async function getData(userId: string) {
  const data = await prisma.home.findMany({
    where: {
      userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      price: true,
      description: true,
      Favorite: {
        where: {
          userId,
        },
      },
    },
    orderBy: {
      categoryName: "desc",
    },
  });
  return data;
}

export default async function MyHomes() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user.id);

  return (
    <section className="container mx-auto py-10lg:py-5 my-5">
      <h2 className="text-3xl font-semibold tracking-wider">My Home</h2>
      {data.length === 0 ? (
        <NoItem title="你没有自己的房间" description="快去创建吧！" />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              location={item.country as string}
              pathName="/my-homes"
              homeId={item.photo as string}
              imagePath={item.photo as string}
              price={item.price as number}
              favoriteId={item.Favorite[0]?.id as string}
              userId={user.id as string}
              isInFavoriteList={
                (item.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
