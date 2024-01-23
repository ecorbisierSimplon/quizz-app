import { hostname } from './variables';
import { Routes } from './Routes';
import { DocumentCreate } from './CreateElements';
import type { NavLi } from './interface';

export class GenerateHtml {
	public logo(logo: string) {
		const logoElement = document.querySelector('#logo');
		if (logoElement) {
			logoElement.innerHTML = `<a href="${hostname}"><img src="${logo}"></a>`;
		}
	}
	public nav(navLi: NavLi[]) {
		const nav = document.querySelector('nav');
		nav?.classList.add('nav');
		nav?.appendChild(new DocumentCreate().ul());
		const UL = document.querySelector('nav ul');

		if (UL) {
			navLi.forEach((line: NavLi, index) => {
				const url: string | undefined = line.url ? 'javascript(void:0)' : line.url;

				let link = new DocumentCreate().ahref({
					url: url
				});

				if (line.icon) {
					let ico = new DocumentCreate({
						className: `icon ${line.icon}`
					}).span();

					link.appendChild(ico);
				}

				link.innerHTML += line.name;
				let LI = new DocumentCreate({
					idName: line.idName,
					className: line.className
				}).li();
				LI.appendChild(link);
				UL.appendChild(LI);
			});
		}
	}
	public search() {
		const form: HTMLDivElement | null = document.querySelector('#formSearch');
		const formSearch: HTMLFormElement = new DocumentCreate({
			className: 'pokemon__form__search'
		}).form({ method: 'GET', action: `${hostname}/get/` });
	}
}
