
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/auth" | "/auth/login" | "/auth/logout" | "/auth/signup" | "/dashboard" | "/mobile-must-signin" | "/ventures" | "/ventures/new" | "/ventures/new/[slug]";
		RouteParams(): {
			"/ventures/new/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/auth": Record<string, never>;
			"/auth/login": Record<string, never>;
			"/auth/logout": Record<string, never>;
			"/auth/signup": Record<string, never>;
			"/dashboard": Record<string, never>;
			"/mobile-must-signin": Record<string, never>;
			"/ventures": { slug?: string };
			"/ventures/new": { slug?: string };
			"/ventures/new/[slug]": { slug: string }
		};
		Pathname(): "/" | "/auth" | "/auth/" | "/auth/login" | "/auth/login/" | "/auth/logout" | "/auth/logout/" | "/auth/signup" | "/auth/signup/" | "/dashboard" | "/dashboard/" | "/mobile-must-signin" | "/mobile-must-signin/" | "/ventures" | "/ventures/" | "/ventures/new" | "/ventures/new/" | `/ventures/new/${string}` & {} | `/ventures/new/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/images/auth_background.jpg" | "/images/default.png" | "/images/hoooklogo.png" | "/images/phone.png" | "/robots.txt" | string & {};
	}
}