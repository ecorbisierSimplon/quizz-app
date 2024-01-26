export interface PageData {
	user: {
		id?: number;
		surname?: string;
		firstname?: string;
		email?: string;
		email_valid?: boolean;
		key?: string;
		role?: number;
		date_create?: Date;
	};
}

export interface ActionData {
	success: boolean;
	entity: string;
	missing?: boolean;
	incorrect?: boolean;
	message?: string;
}
