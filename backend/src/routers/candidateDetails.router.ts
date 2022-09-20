import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { candidateDetailsController } from '../controllers/CandidateDetails.controller';

export class CandidateDetailsRoutes {
	public router: Router;
	public candidateController: candidateDetailsController = new candidateDetailsController();
	public authController: AuthController = new AuthController();

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post('/validate', this.candidateController.validate);
		this.router.post('/signup', this.candidateController.signUp);
		//this.router.get('/',this.authController.verifyToken, this.candidateController.getAll);
	}
}
