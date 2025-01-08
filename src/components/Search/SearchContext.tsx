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
import { Make } from "../../interfaces/make.interface";
import { EngineType } from "../../interfaces/engine-type.interface";
import { Model } from "../../interfaces/model.interface";
import { fetchAdvertisements } from "../../utils/fetch-advertisements";
import { fetchModels } from "../../utils/fetch-models";
import {
  fetchVehicleData,
  VehicleEndpoint,
} from "../../utils/fetch-vehicle-data";

interface SearchData {
  makes: Make[];
  models: Model[];
  engineTypes: EngineType[];
}

interface SearchContextState {
  advertisements: Advertisement[];
  searchData: SearchData;
  virtualQuery: QueryDto;
  fetchNexPageAdvertisements: () => void;
  updateQuery: <T extends keyof QueryDto>(key: T, value: QueryDto[T]) => void;
}

const SearchContext = createContext<SearchContextState | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const startUpQuery = useMemo(() => {
    return { page: 1 } as QueryDto;
  }, []);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [searchData, setSearchData] = useState<SearchData>({
    makes: [] as Make[],
    models: [] as Model[],
    engineTypes: [] as EngineType[],
  } as SearchData);
  const [currentQuery, setCurrentQuery] = useState<QueryDto>(startUpQuery);
  const [virtualQuery, setVirtualQuery] = useState<QueryDto>(startUpQuery);

  const fetchData = useCallback(
    async (endpoint: VehicleEndpoint, key: keyof SearchData) => {
      const vehicleData = await fetchVehicleData(endpoint);
      setSearchData((prev) => ({ ...prev, [key]: vehicleData }));
    },
    []
  );

  const setUpAdvertisements = useCallback(async (query: QueryDto) => {
    const advertisements = await fetchAdvertisements(query);
    setAdvertisements(advertisements);
  }, []);

  const fetchNexPageAdvertisements = useCallback(async () => {
    const nextPageQuery = { ...currentQuery, page: currentQuery.page + 1 };
    const newAdvertisements = await fetchAdvertisements(nextPageQuery);
    setAdvertisements((prevAdvertisements) => [
      ...prevAdvertisements,
      ...newAdvertisements,
    ]);
    setCurrentQuery(nextPageQuery);
  }, [currentQuery]);

  const updateModels = useCallback(async () => {
    const models = await fetchModels(virtualQuery.make);
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      models: models,
    }));
  }, [virtualQuery.make]);

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
    setUpAdvertisements(startUpQuery);
    fetchData("makes", "makes");
    fetchData("engineTypes", "engineTypes");
  }, [fetchData, setUpAdvertisements, startUpQuery]);

  useEffect(() => {
    updateModels();
  }, [updateModels]);

  return (
    <SearchContext.Provider
      value={{
        advertisements,
        searchData,
        virtualQuery,
        fetchNexPageAdvertisements,
        updateQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = (): SearchContextState => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("usePlaceContext must be used within a PlaceProvider");
  }
  return context;
};
