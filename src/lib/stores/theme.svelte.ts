import { browser } from '$app/environment';

class ThemeStore {
	isDark = $state( false );

	constructor() {
		if ( browser ) {
			const savedTheme = localStorage.getItem( 'theme' );
			const systemDark = window.matchMedia( '(prefers-color-scheme: dark)' ).matches;

			this.isDark = savedTheme === 'dark' || ( !savedTheme && systemDark );
			this.applyTheme();
		}
	}

	toggle() {
		this.isDark = !this.isDark;
		this.applyTheme();
		if ( browser ) {
			localStorage.setItem( 'theme', this.isDark ? 'dark' : 'light' );
		}
	}

	private applyTheme() {
		if ( !browser ) return;
		if ( this.isDark ) {
			document.documentElement.classList.add( 'dark' );
		} else {
			document.documentElement.classList.remove( 'dark' );
		}
	}
}

export const themeStore = new ThemeStore();
