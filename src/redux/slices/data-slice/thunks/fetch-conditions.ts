import { createAsyncThunk } from "@reduxjs/toolkit";
import { SlicesNames } from "../../../../enums/slices";
import { fetchVehicleData } from "../../../../utils/fetch-vehicle-data";
import {  Condition } from "../../../../interfaces/vehicle-info.interface";

export const fetchConditions = createAsyncThunk(
  `${SlicesNames.DATA}/fetchConditions`,
  async (): Promise<Condition[]> => {
    return await fetchVehicleData("conditions");
  }
);
