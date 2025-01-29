import {
  createContext,
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
import { fetchModels } from "../../utils/fetch-models";
import {
  fetchVehicleData,
  VehicleEndpoint,
} from "../../utils/fetch-vehicle-data";
import {
  Make,
  Model,
  EngineType,
  Condition,
  City,
  Country,
  User,
  Color,
} from "../../interfaces/vehicle-info.interface";
import { fetchCities } from "../../utils/fetch-cities";
import { fetchUser } from "../../utils/fetch-user";
import WebApp from "@twa-dev/sdk";
import { VehicleType } from "../../enums/VehicleType.enum";

interface SearchData {
  makes: Make[];
  models: Model[];
  engineTypes: EngineType[];
  colors: Color[];
  conditions: Condition[];
  cities: City[];
  countries: Country[];
  years: number[];
  mileage: number[];
}

interface SearchContextState {
  advertisements: Advertisement[];
  searchData: SearchData;
  virtualQuery: QueryDto;
  currentQuery: QueryDto;
  isDetailCardOpened: boolean;
  openedAdvertisement: Advertisement;
  user: User;
  loading: boolean;
  vehicleType: VehicleType | string;
  advertisementsCount: number;
  fetchNextPageAdvertisements: () => void;
  updateVehicleType: (type: VehicleType) => void;
  searchAdvertisements: () => void;
  setUpAdvertisements: () => void;
  toggleIsDetailCardOpened: (advertisementId: string) => void;
  toggleFavorite: (advertisementId: string) => void;
  updateQuery: <T extends keyof QueryDto>(key: T, value: QueryDto[T]) => void;
}

const SearchContext = createContext<SearchContextState | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const startUpQuery = useMemo(() => {
    return { page: 1, type: "car" } as QueryDto;
  }, []);
  const [vehicleType, setVehicleType] = useState<VehicleType | string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({} as User);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [searchData, setSearchData] = useState<SearchData>({
    makes: [],
    models: [],
    engineTypes: [],
    countries: [],
    cities: [],
    colors: [],
    conditions: [],
    years: useMemo(() => {
      const currentYear = new Date().getFullYear();
      return Array.from(
        { length: currentYear - 1960 + 1 },
        (_, i) => currentYear - i
      );
    }, []),
    mileage: [
      0, 20, 10000, 25000, 50000, 75000, 100000, 150000, 200000, 250000, 300000,
      500000, 1000000,
    ],
  });
  const [currentQuery, setCurrentQuery] = useState<QueryDto>(startUpQuery);
  const [virtualQuery, setVirtualQuery] = useState<QueryDto>(startUpQuery);
  const [openedAdvertisement, setOpenedAdvertisement] = useState<Advertisement>(
    {} as Advertisement
  );
  const [isDetailCardOpened, setIsDetailCardOpened] = useState<boolean>(false);
  const [advertisementsCount, setAdvertisementsCount] = useState<number>(0);
  const updateVehicleType = useCallback((type: VehicleType) => {
    setVehicleType(type);
  }, []);

  const back = useCallback(() => {
    WebApp.BackButton.offClick(back);
    WebApp.BackButton.hide();
    setOpenedAdvertisement({} as Advertisement);
    setIsDetailCardOpened(false);
  }, []);

  const toggleIsDetailCardOpened = useCallback(
    (advertisementId: string) => {
      setIsDetailCardOpened(!isDetailCardOpened);
      setOpenedAdvertisement(
        advertisements.find((ad) => ad.id === advertisementId) ||
          ({} as Advertisement)
      );
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(back);
    },
    [advertisements, back, isDetailCardOpened]
  );

  const fetchData = useCallback(
    async (endpoint: VehicleEndpoint, key: keyof SearchData) => {
      try {
        const vehicleData = await fetchVehicleData(endpoint);
        setSearchData((prev) => ({ ...prev, [key]: vehicleData }));
      } catch (error) {
        console.error(`Error fetching ${key}:`, error);
      }
    },
    []
  );

  const setUpAdvertisements = useCallback(async () => {
    setLoading(true);
    const user = await fetchUser();
    const { city } = user;
    const query = {
      ...startUpQuery,
      country: city.country.id,
      userId: user.id,
    };
    const { advertisements, count } = await fetchAdvertisements(query);
    setAdvertisementsCount(count);
    setAdvertisements(advertisements);
    setCurrentQuery(query);
    setVirtualQuery(query);
    setVehicleType("");
    setUser(user);
    setLoading(false);
  }, [startUpQuery]);

  const searchAdvertisements = useCallback(async () => {
    setLoading(true);
    console.log("NEW SEARCH");
    const { advertisements, count } = await fetchAdvertisements(virtualQuery);
    setAdvertisementsCount(count);
    setAdvertisements(advertisements);
    setCurrentQuery(virtualQuery);
    setLoading(false);
  }, [virtualQuery]);

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

  const updateModels = useCallback(async () => {
    if (virtualQuery.make) {
      const models = await fetchModels(virtualQuery.make);
      setSearchData((prevSearchData) => ({
        ...prevSearchData,
        models,
      }));
    }
  }, [virtualQuery.make]);

  const updateCities = useCallback(async () => {
    if (virtualQuery.country) {
      const cities = await fetchCities(virtualQuery.country);
      setSearchData((prevSearchData) => ({
        ...prevSearchData,
        cities,
      }));
    }
  }, [virtualQuery.country]);

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

  const updateQuery = <T extends keyof QueryDto>(
    key: T,
    value: QueryDto[T]
  ): void => {
    setVirtualQuery((prevQuery) => ({
      ...prevQuery,
      [key]: value,
    }));
  };

  useEffect(() => {
    fetchData("makes", "makes");
    fetchData("engineTypes", "engineTypes");
    fetchData("countries", "countries");
  }, [fetchData]);

  // useEffect(() => {
  //   setUpAdvertisements();
  // }, []);

  useEffect(() => {
    updateModels();
    updateCities();
  }, [updateCities, updateModels]);

  useEffect(() => {
    updateQuery("commercial", false);
    updateQuery("condition", "");
    updateQuery("type", "car");

    if (vehicleType === VehicleType.NEW_CARS) {
      updateQuery("condition", 1);
    } else if (vehicleType === VehicleType.USED_CARS) {
      updateQuery("condition", 2);
    } else if (vehicleType === VehicleType.COMMERCIAL) {
      updateQuery("commercial", true);
    } else if (vehicleType === VehicleType.MOTORCICLE) {
      updateQuery("type", "motorcycle");
    }
  }, [vehicleType]);

  useEffect(() => {
    searchAdvertisements();
  }, [virtualQuery.type, virtualQuery.commercial, virtualQuery.condition]);

  useEffect(() => {
    return () => {
      WebApp.BackButton.offClick(back);
    };
  }, [back]);

  return (
    <SearchContext.Provider
      value={{
        vehicleType,
        updateVehicleType,
        advertisements,
        currentQuery,
        advertisementsCount,
        searchData,
        loading,
        isDetailCardOpened,
        virtualQuery,
        openedAdvertisement,
        user,
        fetchNextPageAdvertisements,
        toggleIsDetailCardOpened,
        setUpAdvertisements,
        updateQuery,
        toggleFavorite,
        searchAdvertisements,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = (): SearchContextState => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
