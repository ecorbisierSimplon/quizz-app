import dotenv from 'dotenv';
dotenv.config();

const url: string = process.env.BACK_URL || 'app-backend';

export async function info(): Promise<string> {
	console.log(process.env.BAK_URL);
	const container = await fetch(url);
	if (container.status === 404) {
		return '404';
		console.log('404');
	}
	return 'ok';
	console.log('ok');
}
