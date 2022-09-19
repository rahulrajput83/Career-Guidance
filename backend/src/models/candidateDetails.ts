
export default class CandidateDetails {
	constructor(
		public name: string,
		public email: string,
		public phones: [
			{
				number: number;
				primary: boolean;
			}
		],
		public login: {
			user_name: string;
			password: string;
			code: number|null;
		}
	) {}
}

export const CandidateDetailsSchema = {
	$jsonSchema: {
		bsonType: 'object',
		required: ['name'],
		additionalProperties: false,
		properties: {
			_id: {},
			name: {
				bsonType: 'string',
				description: 'fullname is required and is a string',
			},
			email: {
				bsonType: 'string',
				description: 'email is required and is a string',
			},
			phones: {
				bsonType: 'array',
				additionalProperties: false,
				items: {
					bsonType: 'object',
					required: ['number','primary'],
					properties: {
						number: {
							bsonType: 'number',
							description: 'number is required',
						},
						primary: {
							bsonType: 'bool',
							description: 'primary is required',
						},
					},
				},
			},
			login: {
				bsonType: 'object',
				required: ['user_name', 'password'],
				properties: {
					user_name: {
						bsonType: 'string',
						description: 'username is required',
					},
					password: {
						bsonType: 'string',
						description: 'password is required',
					},
					code: {
						bsonType: ['null', 'number'],
					},
				},
			},
		},
	},
};
