export interface DbData {
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

export interface LoginData {
	login: boolean;
	sessionid?: string;
	surName?: string;
	firstName?: string;
	remember?: string;
}
export interface ActionData {
	success: boolean;
	entity: string;
	missing?: boolean;
	incorrect?: boolean;
	message?: string;
	errorEmail?: string;
}

export interface NavLi {
	name?: string;
	url?: string;
	icon?: string;
	idName?: string;
	className?: string;
}

export type Options = {
	idName?: string;
	className?: string;
};
