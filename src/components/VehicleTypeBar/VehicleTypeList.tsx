import { vehicleTypeButtonData } from '../../enums/vehicle-types';
import { VehicleTypeButton } from '../buttons/VehicleTypeButton/VehicleTypeButton';

export const VehicleTypeList = () => {
  return (
    <div className="mb-3 d-flex justify-content-between gap-2">
      {vehicleTypeButtonData.map((data, index) => (
        <VehicleTypeButton {...data} key={index} />
      ))}
    </div>
  );
};
