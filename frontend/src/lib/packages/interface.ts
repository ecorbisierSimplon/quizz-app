export interface NavLi {
	name: string;
	url?: string;
	icon?: string;
	idName?: string;
	className?: string;
}

export type Options = {
	idName?: string;
	className?: string;
};

export type ElemOptions = {
	url?: string;
	h?: string;
	texte?: string;
	addElem?: HTMLElement;
	method?: string;
};

// Represents a segment with a type and value.
export interface Segment {
	type: string;
	value: string;
}
