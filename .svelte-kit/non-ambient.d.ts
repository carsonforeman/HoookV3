
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
		RouteId(): "/" | "/auth" | "/auth/login" | "/auth/logout" | "/auth/signup" | "/dashboard" | "/mobile-must-signin" | "/profile" | "/u" | "/u/[username]" | "/ventures" | "/ventures/new" | "/ventures/[slug]/(public)" | "/ventures/[slug]" | "/ventures/[slug]/owner" | "/ventures/[slug]/owner/artifacts" | "/ventures/[slug]/owner/artifacts/new" | "/ventures/[slug]/owner/team";
		RouteParams(): {
			"/u/[username]": { username: string };
			"/ventures/[slug]/(public)": { slug: string };
			"/ventures/[slug]": { slug: string };
			"/ventures/[slug]/owner": { slug: string };
			"/ventures/[slug]/owner/artifacts": { slug: string };
			"/ventures/[slug]/owner/artifacts/new": { slug: string };
			"/ventures/[slug]/owner/team": { slug: string }
		};
		LayoutParams(): {
			"/": { username?: string; slug?: string };
			"/auth": Record<string, never>;
			"/auth/login": Record<string, never>;
			"/auth/logout": Record<string, never>;
			"/auth/signup": Record<string, never>;
			"/dashboard": Record<string, never>;
			"/mobile-must-signin": Record<string, never>;
			"/profile": Record<string, never>;
			"/u": { username?: string };
			"/u/[username]": { username: string };
			"/ventures": { slug?: string };
			"/ventures/new": Record<string, never>;
			"/ventures/[slug]/(public)": { slug: string };
			"/ventures/[slug]": { slug: string };
			"/ventures/[slug]/owner": { slug: string };
			"/ventures/[slug]/owner/artifacts": { slug: string };
			"/ventures/[slug]/owner/artifacts/new": { slug: string };
			"/ventures/[slug]/owner/team": { slug: string }
		};
		Pathname(): "/" | "/auth" | "/auth/" | "/auth/login" | "/auth/login/" | "/auth/logout" | "/auth/logout/" | "/auth/signup" | "/auth/signup/" | "/dashboard" | "/dashboard/" | "/mobile-must-signin" | "/mobile-must-signin/" | "/profile" | "/profile/" | "/u" | "/u/" | `/u/${string}` & {} | `/u/${string}/` & {} | "/ventures" | "/ventures/" | "/ventures/new" | "/ventures/new/" | `/ventures/${string}` & {} | `/ventures/${string}/` & {} | `/ventures/${string}/owner` & {} | `/ventures/${string}/owner/` & {} | `/ventures/${string}/owner/artifacts` & {} | `/ventures/${string}/owner/artifacts/` & {} | `/ventures/${string}/owner/artifacts/new` & {} | `/ventures/${string}/owner/artifacts/new/` & {} | `/ventures/${string}/owner/team` & {} | `/ventures/${string}/owner/team/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/images/auth_background.jpg" | "/images/default.png" | "/images/hoooklogo.png" | "/images/New_Venture_Hero.png" | "/images/phone.png" | "/images/round_logo.png" | "/robots.txt" | string & {};
	}
}