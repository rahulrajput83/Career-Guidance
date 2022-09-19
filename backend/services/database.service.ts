import * as mongoDB from 'mongodb';
import { CandidateDetailsSchema } from '../models/candidateDetails';

/**
 * @Desc: Prepare collection names
 */
export const collections: {
	candidate_details?: mongoDB.Collection;
} = {};

/**
 * @Desc: Initialize connection
 */
export async function connectToDatabase() {
	const client: mongoDB.MongoClient = new mongoDB.MongoClient(
		process.env.DB_CONNECTION_STRING!
	);

	await client.connect();

	const db: mongoDB.Db = client.db(process.env.DB_NAME);
	await db.command({
		collMod: process.env.CANDIDATEDETAILS_COLLECTION_NAME,
		validator: CandidateDetailsSchema,
	});

	const cabdidateDetailsCollection: mongoDB.Collection = db.collection(
		process.env.CANDIDATEDETAILS_COLLECTION_NAME!
	);
	collections.candidate_details = cabdidateDetailsCollection;

	console.log(`Successfully connected to database: ${db.databaseName}`);
}
