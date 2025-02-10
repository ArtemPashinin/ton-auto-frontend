import { VehicleConditions } from "./vehicle-conditions";
import { VehicleType } from "./VehicleType.enum";

export interface VehicleTypeButtonData {
  title: string;
  commercial: boolean;
  condition?: VehicleConditions;
  type?: VehicleType;
}

export const vehicleTypeButtonData: VehicleTypeButtonData[] = [
  { title: "New cars", type: VehicleType.CAR, commercial: false, condition: VehicleConditions.NEW },
  { title: "Used cars", type: VehicleType.CAR, commercial: false, condition: VehicleConditions.USED },
  { title: "Commercial", commercial: true  },
  { title: "Motocycles", type: VehicleType.MOTORCYCLE, commercial: false },
];
