export async function api<T>(url: string): Promise<T> {
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json() as Promise<{ data: T }>;
		})
		.then((data) => {
			return data.data;
		});
}
export async function load() {
	return await api('http://app-backend/user/login');
}
