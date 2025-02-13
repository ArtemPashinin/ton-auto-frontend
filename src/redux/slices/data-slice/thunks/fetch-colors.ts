import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";
import { fetchVehicleData } from "../../../../utils/fetch-vehicle-data";
import { Color } from "../../../../interfaces/vehicle-info.interface";

export const fetchColors = createAsyncThunk(
  `${SlicesNames.DATA}/fetchColors`,
  async (): Promise<Color[]> => {
    return await fetchVehicleData("colors");
  }
);
