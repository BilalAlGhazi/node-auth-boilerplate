import mongoose from "mongoose";
import * as constants from "../config/constants";

export const configDatabase = () => {
  mongoose.connect(constants.DB_CONNECTION_STRING);
};
