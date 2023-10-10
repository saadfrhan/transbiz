import { Schema, Document, model, models, Model } from 'mongoose';

// Define an interface for RecentActivity
export interface IRecentActivity {
  action: 'Created' | 'Updated' | 'Deleted'; // Describes the action, e.g., "Created", "Updated", "Deleted"
  objectName: string; // Name of the object being acted upon, e.g., "Journal Voucher"
  objectId: string; // ID of the object being acted upon
  timestamp: Date; // Time when the activity occurred
  user: {
    name: string;
    email: string;
    image: string;
  }; // User who performed the action
}

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
}

const userSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Create a Mongoose schema for RecentActivity
const recentActivitySchema = new Schema<IRecentActivity & Document>({
  action: {
    type: String,
    required: true,
  },
  objectName: {
    type: String,
    required: true,
  },
  objectId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  user: {
    type: userSchema,
    required: true,
  },
});

export default (
  models as {
    RecentActivity: Model<IRecentActivity & Document>;
  }
).RecentActivity ||
  model<IRecentActivity & Document>('RecentActivity', recentActivitySchema);
