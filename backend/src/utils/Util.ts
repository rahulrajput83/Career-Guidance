import * as jwt from 'jsonwebtoken';

/**
 * @Desc: Generate OTP
 */
export const generateOtp = (digits: number = 4): number => {
	let min: number = digits > 4 ? 100000 : 1000;
	let max: number = digits > 4 ? 900000 : 9000;
	return Math.floor(min + Math.random() * max);
};

/**
 * @Desc: Generate JWT Token
 */
export const generateToken = (payload: object = {}): string => {
	const token: string = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
		noTimestamp: true,
		expiresIn: `${365 * 999}d`,
	});
	return token;
};

/**
 * @Desc: Get First Letter Of Each Word In Capital Of a Sentence
 */
export const toUpperCaseWord = (str: string): string => {
	str = str.toLowerCase();
	const arr: string[] = str
		.split(' ')
		.map(
			(word: string) =>
				word.substring(0, 1).toUpperCase() + word.substring(1, word.length)
		);
	return arr.join(' ');
};

