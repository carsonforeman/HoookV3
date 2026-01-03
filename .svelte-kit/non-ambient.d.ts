
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
		RouteId(): "/" | "/auth" | "/auth/login" | "/auth/logout" | "/auth/signup" | "/dashboard" | "/mobile-must-signin" | "/profile" | "/u" | "/u/[username]" | "/ventures" | "/ventures/new" | "/ventures/[slug]/(public)" | "/ventures/[slug]" | "/ventures/[slug]/(public)/ideas" | "/ventures/[slug]/owner" | "/ventures/[slug]/(public)/progress" | "/ventures/[slug]/(public)/sessions" | "/ventures/[slug]/(public)/tasks" | "/ventures/[slug]/(public)/team";
		RouteParams(): {
			"/u/[username]": { username: string };
			"/ventures/[slug]/(public)": { slug: string };
			"/ventures/[slug]": { slug: string };
			"/ventures/[slug]/(public)/ideas": { slug: string };
			"/ventures/[slug]/owner": { slug: string };
			"/ventures/[slug]/(public)/progress": { slug: string };
			"/ventures/[slug]/(public)/sessions": { slug: string };
			"/ventures/[slug]/(public)/tasks": { slug: string };
			"/ventures/[slug]/(public)/team": { slug: string }
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
			"/ventures/[slug]/(public)/ideas": { slug: string };
			"/ventures/[slug]/owner": { slug: string };
			"/ventures/[slug]/(public)/progress": { slug: string };
			"/ventures/[slug]/(public)/sessions": { slug: string };
			"/ventures/[slug]/(public)/tasks": { slug: string };
			"/ventures/[slug]/(public)/team": { slug: string }
		};
		Pathname(): "/" | "/auth" | "/auth/" | "/auth/login" | "/auth/login/" | "/auth/logout" | "/auth/logout/" | "/auth/signup" | "/auth/signup/" | "/dashboard" | "/dashboard/" | "/mobile-must-signin" | "/mobile-must-signin/" | "/profile" | "/profile/" | "/u" | "/u/" | `/u/${string}` & {} | `/u/${string}/` & {} | "/ventures" | "/ventures/" | "/ventures/new" | "/ventures/new/" | `/ventures/${string}` & {} | `/ventures/${string}/` & {} | `/ventures/${string}/ideas` & {} | `/ventures/${string}/ideas/` & {} | `/ventures/${string}/owner` & {} | `/ventures/${string}/owner/` & {} | `/ventures/${string}/progress` & {} | `/ventures/${string}/progress/` & {} | `/ventures/${string}/sessions` & {} | `/ventures/${string}/sessions/` & {} | `/ventures/${string}/tasks` & {} | `/ventures/${string}/tasks/` & {} | `/ventures/${string}/team` & {} | `/ventures/${string}/team/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/images/auth_background.jpg" | "/images/default.png" | "/images/hoooklogo.png" | "/images/phone.png" | "/images/round_logo.png" | "/robots.txt" | string & {};
	}
}