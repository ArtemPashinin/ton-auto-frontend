import { VehicleType } from "./VehicleType.enum";

interface VehicleTypeButtonData {
  title: string;
  type: VehicleType;
}

export const vehicleTypeButtonData: VehicleTypeButtonData[] = [
  { title: "New cars", type: VehicleType.NEW_CARS },
  { title: "Used cars", type: VehicleType.USED_CARS },
  { title: "Commercial", type: VehicleType.COMMERCIAL },
  { title: "Motocycles", type: VehicleType.MOTORCICLE },
];
