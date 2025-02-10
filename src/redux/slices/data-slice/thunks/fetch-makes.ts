import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";
import { fetchVehicleData } from "../../../../utils/fetch-vehicle-data";
import { Make } from "../../../../interfaces/vehicle-info.interface";

export const fetchMakes = createAsyncThunk(
  `${SlicesNames.DATA}/fetchMakes`,
  async (): Promise<Make[]> => {
    return await fetchVehicleData("makes");
  }
);
