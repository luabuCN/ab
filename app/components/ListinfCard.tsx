import Image from "next/image";
import { useCountries } from "../lib/getCountries";
import Link from "next/link";
import {
  AddToFavoritesButton,
  DeleteFormFavoritesButton,
} from "./submitButtons";
import { addToFavorite, deleteFavorite } from "../actions";

interface IAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
}

export default function ListingCard({
  imagePath,
  description,
  location,
  price,
  userId,
  favoriteId,
  isInFavoriteList,
  homeId,
  pathName,
}: IAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  return (
    <div className="flex flex-col">
      <div className=" relative h-72">
        <Image
          src={`https://myxzmjfrynltdndonwjx.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="image"
          fill
          className=" rounded-lg h-full object-cover"
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={deleteFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFormFavoritesButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoritesButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={"/"} className="mt-2">
        <h3>
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className=" text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground ">
          <span className="font-medium text-black mr-2">${price}</span>Night
        </p>
      </Link>
    </div>
  );
}
