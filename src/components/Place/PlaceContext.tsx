import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  SetStateAction,
} from "react";
import { AdvertisementDto } from "../../interfaces/dto/advertisement.dto";
import { MediaDto } from "../../interfaces/dto/media.dto";
import { User } from "../../interfaces/vehicle-info.interface";
import { fetchUser } from "../../utils/fetch-user";

// eslint-disable-next-line react-refresh/only-export-components
export enum Step {
  FORM = "form",
  MEDIA = "media",
  SUCCESS = "success",
}

interface PlaceContextState {
  advertisementData: AdvertisementDto;
  images: File[];
  user: User | null;
  step: Step;
  imagesOrder: MediaDto[];
  setImagesOrder: (value: SetStateAction<MediaDto[]>) => void;
  setImages: (value: SetStateAction<File[]>) => void;
  setStep: (step: Step) => void;
  updateField: <K extends keyof AdvertisementDto>(
    key: K,
    value: AdvertisementDto[K]
  ) => void;
  isAdvertisementDataValid: boolean;
}

const PlaceContext = createContext<PlaceContextState | undefined>(undefined);

interface AdvertisementAction<K extends keyof AdvertisementDto> {
  type: "updateField";
  key: K;
  value: AdvertisementDto[K];
}

const advertisementReducer = (
  state: AdvertisementDto,
  action: AdvertisementAction<keyof AdvertisementDto>
): AdvertisementDto => {
  switch (action.type) {
    case "updateField":
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
};

export const PlaceProvider = ({ children }: { children: ReactNode }) => {
  const [advertisementData, dispatch] = useReducer(advertisementReducer, {
    commercial: false,
  } as AdvertisementDto);
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState<Step>(Step.FORM);
  const [images, setImages] = useState<File[]>([]);
  const [imagesOrder, setImagesOrder] = useState<MediaDto[]>([] as MediaDto[]);

  const updateField = useCallback(
    <K extends keyof AdvertisementDto>(key: K, value: AdvertisementDto[K]) => {
      dispatch({ type: "updateField", key, value });
    },
    []
  );

  const setUpUser = useCallback(async () => {
    const user = await fetchUser();
    console.log("API User:", user);
    updateField("user_id", user.id);
    setUser(user);
  }, [updateField]);

  const isAdvertisementDataValid = useMemo(() => {
    const requiredFields: (keyof AdvertisementDto)[] = [
      "model_id",
      "engine_id",
      "color_id",
      "year",
      "hp",
      "price",
      "mileage",
      "condition_id",
      "description",
    ];

    return requiredFields.every((field) => !!advertisementData[field]);
  }, [advertisementData]);

  useEffect(() => {
    setUpUser();
  }, [setUpUser]);

  return (
    <PlaceContext.Provider
      value={{
        imagesOrder,
        setImagesOrder,
        images,
        setImages,
        advertisementData,
        user,
        step,
        setStep,
        updateField,
        isAdvertisementDataValid,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};

export const usePlaceContext = (): PlaceContextState => {
  const context = useContext(PlaceContext);
  if (!context) {
    throw new Error("usePlaceContext must be used within a PlaceProvider");
  }
  return context;
};
