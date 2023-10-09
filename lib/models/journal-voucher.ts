import { Schema, models, Model, Document, model } from 'mongoose';

export interface ILocation {
  loading: string;
  drop: string;
}

export interface IParty {
  name: string;
  billing_amount: string;
}

export interface IBroker {
  name: string;
  vehicle_number: number;
  funds_transfer: number;
  withdrawal: number;
}

export interface IExpenses {
  labour: number;
  local: number;
  gate_pass: string;
  go_down: number;
  other_expenses: number;
}

export interface IJournalVoucher {
  _id?: string;
  party: IParty;
  createdAt: Date;
  updatedAt?: Date;
  sender: string;
  broker: IBroker;
  expenses: IExpenses;
  consignments: string[];
  moreEntries?: {
    [x: string]: any;
  }; // Adjust the type as needed for moreEntries
  grossProfit: number;
}

const partySchema: Schema = new Schema<IParty & Document>({
  name: {
    type: String,
    required: true,
  },
  billing_amount: {
    type: String,
    required: true,
  }
});

const brokerSchema: Schema = new Schema<IBroker & Document>({
  name: {
    type: String,
    required: true,
  },
  vehicle_number: {
    type: Number,
    required: true,
  },
  funds_transfer: {
    type: Number,
    required: true,
  },
  withdrawal: {
    type: Number,
    required: true
  }
});

const expensesSchema = new Schema<IExpenses & Document>({
  labour: {
    type: Number,
    required: true
  },
  local: {
    type: Number,
    required: true,
  },
  gate_pass: {
    type: String,
    required: true
  },
  go_down: {
    type: Number,
    required: true
  },
  other_expenses: {
    type: Number,
    required: true
  }
});

type JournalVoucherDocument = IJournalVoucher & Document;

const journalVoucherSchema: Schema = new Schema<JournalVoucherDocument>(
  {
    party: {
      type: partySchema,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
    },
    sender: {
      type: String,
      required: true,
    },
    broker: {
      type: brokerSchema,
      required: true
    },
    expenses: {
      type: expensesSchema,
      required: true
    },
    consignments: {
      type: [String],
      required: true,
    },
    moreEntries: {
      type: Schema.Types.Mixed
    },
    grossProfit: {
      type: Number,
      required: true
    }
  },
);

export default (models as {
  JournalVoucher: Model<JournalVoucherDocument>;
}).JournalVoucher || model<JournalVoucherDocument>('JournalVoucher', journalVoucherSchema)
