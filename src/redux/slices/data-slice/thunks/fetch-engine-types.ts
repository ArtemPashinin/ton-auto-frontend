import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";
import { fetchVehicleData } from "../../../../utils/fetch-vehicle-data";
import { EngineType } from "../../../../interfaces/vehicle-info.interface";

export const fetchEngineTypes = createAsyncThunk(
  `${SlicesNames.DATA}/fetchEngineTypes`,
  async (): Promise<EngineType[]> => {
    return await fetchVehicleData("engineTypes");
  }
);
