import { Schema, Types, model } from "mongoose";

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPerson: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    hotel: {
      type: Types.ObjectId,
      ref: "Hotel",
    },
    roomNumbers: {
      type: [
        {
          number: Number,
          unavailableDates: {
            type: [Date],
          },
        },
      ],
      id: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Room", RoomSchema);
