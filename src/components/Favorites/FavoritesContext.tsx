import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Advertisement } from "../../interfaces/advertisement.interface";
import { QueryDto } from "../../interfaces/dto/query.dto";
import { fetchAdvertisements } from "../../utils/fetch-advertisements";
import { User } from "../../interfaces/vehicle-info.interface";
import { fetchUser } from "../../utils/fetch-user";
import WebApp from "@twa-dev/sdk";
import { useRef } from "react";

interface FavoritesContextState {
  advertisements: Advertisement[];
  fetchNextPageAdvertisements: () => void;
  user: User;
  toggleIsDetailCardOpened: (advertisementId: string) => void;
  isDetailCardOpened: boolean;
  openedAdvertisement: Advertisement;
  advertisementsRefs: MutableRefObject<Map<string, HTMLElement | null>>;
  toggleFavorite: (advertisementId: string) => void;
  advertisementsCount: number;
}

const FavoritesContext = createContext<FavoritesContextState | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const startUpQuery = useMemo(() => {
    return { page: 1, favorites: true } as QueryDto;
  }, []);
  const advertisementsRefs = useRef<Map<string, HTMLElement | null>>(new Map());

  const [user, setUser] = useState<User>({} as User);
  const [isDetailCardOpened, setIsDetailCardOpened] = useState<boolean>(false);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [currentQuery, setCurrentQuery] = useState<QueryDto>(startUpQuery);
  const [openedAdvertisement, setOpenedAdvertisement] = useState<Advertisement>(
    {} as Advertisement
  );
  const [advertisementsCount, setAdvertisementsCount] = useState<number>(0);

  const back = useCallback(() => {
    setOpenedAdvertisement({} as Advertisement);
    setIsDetailCardOpened(false);
    WebApp.BackButton.offClick(back);
    WebApp.BackButton.hide();
  }, []);

  const toggleIsDetailCardOpened = useCallback(
    (advertisementId: string) => {
      setIsDetailCardOpened(!isDetailCardOpened);
      setOpenedAdvertisement(
        advertisements.find((ad) => ad.id === advertisementId) ||
          ({} as Advertisement)
      );
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(() => {
        setOpenedAdvertisement({} as Advertisement);
        setIsDetailCardOpened(false);
        WebApp.BackButton.hide();
      });
    },
    [advertisements, isDetailCardOpened]
  );

  const setUpAdvertisements = useCallback(async () => {
    const user = await fetchUser();
    const query = {
      ...startUpQuery,
      userId: user.id,
    };
    const { advertisements, count } = await fetchAdvertisements(query);
    setAdvertisements(advertisements);
    setAdvertisementsCount(count);
    setCurrentQuery(query);
    setUser(user);
  }, [startUpQuery]);

  const fetchNextPageAdvertisements = useCallback(async () => {
    try {
      const nextPageQuery = { ...currentQuery, page: currentQuery.page + 1 };
      const { advertisements: newAdvertisements } = await fetchAdvertisements(
        nextPageQuery
      );
      setAdvertisements((prevAdvertisements) => [
        ...prevAdvertisements,
        ...newAdvertisements,
      ]);
      setCurrentQuery(nextPageQuery);
    } catch (error) {
      console.error("Error fetching next page of advertisements:", error);
    }
  }, [currentQuery]);

  const toggleFavorite = useCallback(
    (advertisementId: string) => {
      setAdvertisements((prevAdvertisements) =>
        prevAdvertisements
          .map((ad) =>
            ad.id === advertisementId
              ? {
                  ...ad,
                  favoritedBy:
                    ad.favoritedBy && ad.favoritedBy.length > 0 ? [] : [user],
                }
              : ad
          )
          .filter((ad) => ad.favoritedBy.length > 0)
      );
    },
    [user]
  );

  useEffect(() => {
    setUpAdvertisements();
  }, [setUpAdvertisements]);

  useEffect(() => {
    setAdvertisementsCount(advertisements.length);
  }, [advertisements.length]);

  useEffect(() => {
    return () => {
      WebApp.BackButton.offClick(back);
    };
  }, [back]);

  return (
    <FavoritesContext.Provider
      value={{
        user,
        advertisementsCount,
        isDetailCardOpened,
        advertisements,
        advertisementsRefs,
        openedAdvertisement,
        toggleIsDetailCardOpened,
        fetchNextPageAdvertisements,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = (): FavoritesContextState => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
