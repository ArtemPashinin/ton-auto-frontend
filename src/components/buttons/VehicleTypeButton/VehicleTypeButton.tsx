import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { VehicleTypeButtonData } from '../../../enums/vehicle-types';
import { searchFiltersSelector, setFilter } from '../../../redux/slices/search-filters-slice/search-filters-slice';
import { AppDispatch } from '../../../redux/store';

import style from './VehicleTypebutton.module.css';

export const VehicleTypeButton = ({ title, type, commercial, condition }: VehicleTypeButtonData) => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector(searchFiltersSelector);

  const handleTypeOrConditionUpdate = useCallback(() => {
    dispatch(setFilter({ key: 'commercial', value: commercial }));
    dispatch(setFilter({ key: 'type', value: type }));
    dispatch(setFilter({ key: 'condition', value: condition }));
  }, [commercial, condition, dispatch, type]);

  const isEnabled = type === filters.type && commercial === filters.commercial && condition === filters.condition;

  const buttonClass = `${style.vehicleTypeButton} p-0 fs-087 ${
    isEnabled ? style.enabled : style.disabled
  } border rounded-pill user-select-none py-1 text-center d-flex flex-grow-1 justify-content-center`;

  return (
    <button onClick={handleTypeOrConditionUpdate} className={buttonClass}>
      {title}
    </button>
  );
};
