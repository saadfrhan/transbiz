import mongoose from "mongoose";
import { MONGODB_URI } from "../envs";

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	);
}

interface Cached {
	conn: null;
	promise: null | Promise<any>;
}
let cached: Cached = { conn: null, promise: null };

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		(cached as any).promise = mongoose.connect(MONGODB_URI, opts);
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}

export default dbConnect;