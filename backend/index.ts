import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import fileupload from 'express-fileupload';

import { connectToDatabase } from './src/services/database.service';
import { CandidateDetailsRoutes } from './src/Router/candidateDetails.router';

class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
		this.mongo();
	}

	public config(): void {
		dotenv.config({ path: resolve(__dirname, 'config.env') });

		// Add a list of allowed origins.
		// If you have more origins you would like to add, you can add them to the array below.
		const allowedOrigins = ['http://localhost:4200'];

		const options: cors.CorsOptions = {
			origin: allowedOrigins,
		};

		this.app.set('port', process.env.PORT || 8888);
		this.app.use(helmet());
		this.app.use(fileupload());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(compression());
		this.app.use(cors(options));
		this.app.use(express.static('uploads'));
	}

	public routes(): void {
		this.app.use('/api/candidateDetails', new CandidateDetailsRoutes().router);
	}

	private mongo(): void {
		connectToDatabase()
			.then(() => {})
			.catch((error: Error) => {
				console.error('Database connection failed', error);
				process.exit();
			});
	}

	public start(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log(
				'API is running at http://localhost:%d',
				this.app.get('port')
			);
		});
	}
}

const server = new Server();
server.start();
