import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";
import { fetchVehicleData } from "../../../../utils/fetch-vehicle-data";
import { Country } from "../../../../interfaces/user-info.interface";

export const fetchCountries = createAsyncThunk(
  `${SlicesNames.DATA}/fetchCountries`,
  async (): Promise<Country[]> => {
    return await fetchVehicleData("countries");
  }
);
