import { Schema, models, Model, Document, model } from 'mongoose';

export interface IClient {
  _id?: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
  amount: number;
  location: {
    loading: string;
    drop: string;
  };
  consignments: string[];
}

const locationSchema: Schema = new Schema({
  loading: {
    type: String,
    required: true,
  },
  drop: {
    type: String,
    required: true,
  },
});

type ClientDocument = IClient & Document;

const clientSchema: Schema = new Schema<ClientDocument>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
    },
    amount: {
      type: Number,
      required: true,
    },
    location: {
      type: locationSchema,
      required: true,
    },
    consignments: {
      type: [String],
      required: true,
    }
  },
);

export default (models as {
  Client: Model<ClientDocument>;
}).Client || model<ClientDocument>('Client', clientSchema)
