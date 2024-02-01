// import { Routes } from './Routes';
import { DocumentCreate } from './CreateElements';
import type { NavLi } from './types';
// import { hostname } from './variables';

export class GenerateHtml {
	public static logo(logo: string, hostname: string) {
		const logoElement = document.querySelector('#logo');
		if (logoElement) {
			logoElement.innerHTML = `<a href="${hostname}"><img src="${logo}"></a>`;
		}
	}
	public static nav(navLi: NavLi[]) {
		const nav = document.querySelector('nav');
		nav?.classList.add('nav');
		nav?.appendChild(new DocumentCreate().ul());
		const UL = document.querySelector('nav ul');
		console.log(UL);

		if (UL) {
			navLi.forEach((line: NavLi, index) => {
				if (line.name != undefined) {
					const url: string | undefined = line.url ? line.url : 'javascript:void(0)';

					let link = new DocumentCreate().ahref({
						url: url
					});

					if (line.icon) {
						let ico = new DocumentCreate({
							className: `${line.icon}`
						}).i();

						link.appendChild(ico);
					}

					link.innerHTML += line.name;
					let LI = new DocumentCreate({
						idName: line.idName,
						className: line.className
					}).li();
					LI.appendChild(link);
					UL.appendChild(LI);
				}
			});
		}
	}
	public static search(hostname: string) {
		const form: HTMLDivElement | null = document.querySelector('#formSearch');
		const formSearch: HTMLFormElement = new DocumentCreate({
			className: 'form__search'
		}).form({ method: 'GET', action: `${hostname}/get/` });

		formSearch.appendChild(
			new DocumentCreate().input({
				type: 'search',
				placeholder: 'Search...',
				name: 'form__search',
				required: true
				// value: Routes.getValue('search')
			})
		);

		formSearch.appendChild(
			new DocumentCreate().button({
				type: `submit`,
				texte: `<i class="fa fa-search"></i>`
			})
		);
		form?.appendChild(formSearch);
	}
}
