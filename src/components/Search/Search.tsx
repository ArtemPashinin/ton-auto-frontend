import { useState } from "react";
import { VehicleType } from "../../enums/VehicleType.enum";
import { VehicleTypeList } from "../VehicleType/VehicleTypeList";
import { CarCardList } from "../CarCard/CarCardList";
import { SearchBar } from "./SearchBar";
import { Button } from "react-bootstrap";
import { useSearchContext } from "./SearchContext";

export const Search = () => {
  const { fetchNexPageAdvertisements } = useSearchContext();
  const [vehicleType, setVehicleType] = useState<VehicleType>(
    VehicleType.NEW_CARS
  );

  return (
    <div className="search p-2">
      <VehicleTypeList
        onVehicleTypeChange={setVehicleType}
        activeVehicleType={vehicleType}
      />
      <SearchBar />
      <CarCardList />
      <Button
        className="w-100"
        onClick={() => {
          fetchNexPageAdvertisements();
        }}
      >
        Load mode
      </Button>
    </div>
  );
};
