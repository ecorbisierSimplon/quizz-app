import { Cookies } from 'typescript-cookie';

export function session(): boolean {
	return Cookies.get('sessionid') ? true : false;
}
