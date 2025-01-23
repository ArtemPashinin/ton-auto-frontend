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
import { Media, User } from "../../interfaces/vehicle-info.interface";
import { fetchUser } from "../../utils/fetch-user";
import WebApp from "@twa-dev/sdk";
import { useRef } from "react";
import { removeAdretisement } from "../../utils/remove-advertisement";
import { useMenuContext } from "../Menu/MenuContext";

interface MyAdsContextState {
  advertisements: Advertisement[];
  fetchNextPageAdvertisements: () => void;
  user: User;
  loading: boolean;
  toggleIsDetailCardOpened: (advertisementId: string) => void;
  isDetailCardOpened: boolean;
  isOnEditDescription: boolean;
  isOnMediaEdit: boolean;
  openedAdvertisement: Advertisement;
  advertisementsRefs: MutableRefObject<Map<string, HTMLElement | null>>;
  toggleFavorite: (advertisementId: string) => void;
  advertisementsCount: number;
  advertisementOnEdit: Advertisement;
  mediaOnEdit: Media[];
  removeAd: (advertisementId: string) => void;
  toggleIsOnEditDescription: (advertisementId?: string) => void;
  toggleIsOnMediaEdit: (advertisementId?: string) => void;
  setUpAdvertisements: () => void;
}

const MyAdsContext = createContext<MyAdsContextState | undefined>(undefined);

export const MyAdsProvider = ({ children }: { children: ReactNode }) => {
  const startUpQuery = useMemo(() => {
    return { page: 1, owned: true } as QueryDto;
  }, []);
  const [loading, setLoading] = useState<boolean>(true);
  const advertisementsRefs = useRef<Map<string, HTMLElement | null>>(new Map());
  const [user, setUser] = useState<User>({} as User);
  const [isDetailCardOpened, setIsDetailCardOpened] = useState<boolean>(false);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [currentQuery, setCurrentQuery] = useState<QueryDto>(startUpQuery);
  const [openedAdvertisement, setOpenedAdvertisement] = useState<Advertisement>(
    {} as Advertisement
  );
  const [advertisementsCount, setAdvertisementsCount] = useState<number>(0);
  const [isOnEditDescription, setIsOnEditDescription] =
    useState<boolean>(false);
  const [isOnMediaEdit, setIsOnMediaEdit] = useState<boolean>(false);
  const [advertisementOnEdit, setAdvertisementOnEdit] = useState<Advertisement>(
    {} as Advertisement
  );
  const [mediaOnEdit, setMediaOnEdit] = useState<Media[]>([]);
  const { setMenuVisibility } = useMenuContext();

  const back = useCallback(() => {
    setOpenedAdvertisement({} as Advertisement);
    setIsDetailCardOpened(false);
    WebApp.BackButton.offClick(back);
    WebApp.BackButton.hide();
  }, []);

  const toggleIsDetailCardOpened = useCallback(
    (advertisementId: string) => {
      const ad =
        advertisements.find((ad) => ad.id === advertisementId) ||
        ({} as Advertisement);
      setIsDetailCardOpened((prevState) => !prevState);

      if (!isDetailCardOpened) {
        setOpenedAdvertisement(ad);
        WebApp.BackButton.show();
        WebApp.BackButton.onClick(back);
      } else {
        back();
      }
    },
    [advertisements, isDetailCardOpened, back]
  );

  const removeAd = useCallback(async (advertisementId: string) => {
    WebApp.showConfirm("Are you sure?", async (confirmed) => {
      if (confirmed) {
        await removeAdretisement(advertisementId);
        setAdvertisements((prevAdvertisements) =>
          prevAdvertisements.filter(
            (advertisement) => advertisement.id !== advertisementId
          )
        );
        setAdvertisementsCount((prev) => prev - 1);
        WebApp.showAlert("Your ad has been successfully removed!");
      }
    });
  }, []);

  const setUpAdvertisements = useCallback(async () => {
    setLoading(true);
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
    setLoading(false);
  }, [startUpQuery]);

  const toggleIsOnEditDescription = useCallback(
    async (advertisementId?: string) => {
      setIsOnEditDescription(!isOnEditDescription);
      if (!isOnEditDescription) {
        setAdvertisementOnEdit(
          advertisements.find((ad) => ad.id === advertisementId) ||
            ({} as Advertisement)
        );
      } else {
        await setUpAdvertisements();
      }
    },
    [advertisements, isOnEditDescription, setUpAdvertisements]
  );

  const toggleIsOnMediaEdit = useCallback(
    async (advertisementId?: string) => {
      setIsOnMediaEdit(!isOnMediaEdit);
      if (!isOnMediaEdit) {
        setMediaOnEdit(
          advertisements.find((ad) => ad.id === advertisementId)?.media || []
        );
      } else {
        await setUpAdvertisements();
      }
    },
    [advertisements, isOnMediaEdit, setUpAdvertisements]
  );

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
        prevAdvertisements.map((ad) =>
          ad.id === advertisementId
            ? {
                ...ad,
                favoritedBy:
                  ad.favoritedBy && ad.favoritedBy.length > 0 ? [] : [user],
              }
            : ad
        )
      );
    },
    [user]
  );

  useEffect(() => {
    setUpAdvertisements();
  }, [setUpAdvertisements]);

  useEffect(() => {
    setMenuVisibility(!isOnMediaEdit);
  }, [isOnMediaEdit, setMenuVisibility]);

  useEffect(() => {
    return () => {
      WebApp.BackButton.offClick(back);
    };
  }, [back]);

  return (
    <MyAdsContext.Provider
      value={{
        user,
        loading,
        advertisementsCount,
        isDetailCardOpened,
        advertisements,
        advertisementOnEdit,
        isOnEditDescription,
        isOnMediaEdit,
        advertisementsRefs,
        openedAdvertisement,
        mediaOnEdit,
        toggleIsOnMediaEdit,
        toggleIsDetailCardOpened,
        toggleIsOnEditDescription,
        fetchNextPageAdvertisements,
        toggleFavorite,
        removeAd,
        setUpAdvertisements,
      }}
    >
      {children}
    </MyAdsContext.Provider>
  );
};

export const useMyAdsContext = (): MyAdsContextState => {
  const context = useContext(MyAdsContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
