import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import {
	generateToken,
} from '../../utils/Util';
import { collections } from '../services/database.service';
import CandidateDetails from '../models/candidateDetails';
import Validator from 'validatorjs';
import ResponseModel from '../models/responseModel';

export class candidateDetailsController {

	/**
	 * @Desc: Sign in
	 * @Method: POST
	 */
	public validate = async (req: Request, res: Response): Promise<any> => {
		let response: ResponseModel = { check: false };

		try {
			const reqData = req.body;
			const user_name = reqData.username;
			const password = reqData.password;
			const candidate = await collections.candidate_details?.findOne({
				'login.user_name': user_name,
			});

			if (candidate) {
				const isPasswordMatched = await bcrypt.compare(
					password,
					candidate.login.password as string
				);

				if (isPasswordMatched) {
					const payload: object = { id: candidate._id };
					const token = generateToken(payload);

					response.check = true;
					response.message = 'Credentials matched';
					response.data = {
						id: candidate._id,
						name: candidate.name,
						email: candidate.email,
						token: token,
					};
					return res.status(200).json(response);
				} else {
					response.message = 'Credentials not matched';
					return res.status(200).json(response);
				}
			} else {
				response.message = 'Credentials not matched';
				return res.status(200).json(response);
			}
		} catch (error: any) {
			response.message = error.message;
			return res.status(500).json(response);
		}
	};

	/**
	 * @Desc: Sign Up
	 * @Method: POST
	 */

	public signUp = async (req: Request, res: Response): Promise<any> => {
		let response: ResponseModel = { check: false };

		try {
			const reqData = req.body;

			let rules = {
				full_name: 'required|string|min:3',
				email: 'required|string|email',
				mobile: 'required|numeric',
				password: 'required|string|min:4',
				confirm_password: 'required|string|min:4',
			};

			let validator = new Validator(req.body, rules);
			if (validator.passes()) {
				let email: string = reqData.email.trim();
				//let phones: number = reqData.mobile.trim();
				
				const candidate = (await collections.candidate_details?.findOne({
					email: email,
				})) as CandidateDetails;

				if (candidate) {
					response.message = 'Email ID is already exist';
					return res.status(400).json(response);
				} else {
					if(reqData.password !== reqData.confirm_password) {
						response.check = false;
						response.message = 'Password and Re-Enter password not matched';
					} else {
						const salt = await bcrypt.genSalt(
							parseInt(process.env.SALT_ROUNDS!)
						);
						const password = await bcrypt.hash(
							reqData.password as string,
							salt
						);

						const insertData: CandidateDetails = {
							name: reqData.full_name,
							email: reqData.email,
							phones: [{ number: reqData.mobile, primary: true }],
							login: {
								user_name: reqData.email || reqData.phones.number,
								password: password,
								code: reqData.otp || null,
							},
						};

						const result: any = await collections.candidate_details?.insertOne(
							insertData
						);
						if (result) {
							const insertedId: string = result.insertedId;

							response.check = true;
							response.message = 'Congratulations !!! Your account created';
							response.data = {
								id: insertedId,
								name: insertData.name,
								email: insertData.email,
							};
							return res.status(200).json(response);
						} else {
							response.message = 'Failed to create a new Candidate';
							return res.status(500).json(response);
						}
					}
				}
			} else {
				response.message = 'Request parameters failed to validate';
				return res.status(500).json(response);
			}
		} catch (error: any) {
			console.log(error)
			response.message = error.message;
			return res.status(500).json(response);
		}
	};
}
