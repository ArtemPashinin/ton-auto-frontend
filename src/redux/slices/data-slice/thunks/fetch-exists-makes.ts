import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";
import { fetchVehicleData } from "../../../../utils/fetch-vehicle-data";
import { Make } from "../../../../interfaces/vehicle-info.interface";

export const fetchExistsMakes = createAsyncThunk(
  `${SlicesNames.DATA}/fetchExistsMakes`,
  async (): Promise<Make[]> => {
    return await fetchVehicleData("existsMakes");
  }
);
