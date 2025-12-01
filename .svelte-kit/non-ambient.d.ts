
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
		RouteId(): "/" | "/auth" | "/auth/login" | "/auth/logout" | "/auth/signup" | "/dashboard" | "/mobile-must-signin" | "/ventures" | "/ventures/new" | "/ventures/[slug]" | "/ventures/[slug]/ideas" | "/ventures/[slug]/owner" | "/ventures/[slug]/owner/dashboard" | "/ventures/[slug]/owner/ideas" | "/ventures/[slug]/owner/progress" | "/ventures/[slug]/owner/sessions" | "/ventures/[slug]/owner/tasks" | "/ventures/[slug]/owner/team" | "/ventures/[slug]/progress" | "/ventures/[slug]/sessions" | "/ventures/[slug]/tasks" | "/ventures/[slug]/team";
		RouteParams(): {
			"/ventures/[slug]": { slug: string };
			"/ventures/[slug]/ideas": { slug: string };
			"/ventures/[slug]/owner": { slug: string };
			"/ventures/[slug]/owner/dashboard": { slug: string };
			"/ventures/[slug]/owner/ideas": { slug: string };
			"/ventures/[slug]/owner/progress": { slug: string };
			"/ventures/[slug]/owner/sessions": { slug: string };
			"/ventures/[slug]/owner/tasks": { slug: string };
			"/ventures/[slug]/owner/team": { slug: string };
			"/ventures/[slug]/progress": { slug: string };
			"/ventures/[slug]/sessions": { slug: string };
			"/ventures/[slug]/tasks": { slug: string };
			"/ventures/[slug]/team": { slug: string }
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
			"/ventures/new": Record<string, never>;
			"/ventures/[slug]": { slug: string };
			"/ventures/[slug]/ideas": { slug: string };
			"/ventures/[slug]/owner": { slug: string };
			"/ventures/[slug]/owner/dashboard": { slug: string };
			"/ventures/[slug]/owner/ideas": { slug: string };
			"/ventures/[slug]/owner/progress": { slug: string };
			"/ventures/[slug]/owner/sessions": { slug: string };
			"/ventures/[slug]/owner/tasks": { slug: string };
			"/ventures/[slug]/owner/team": { slug: string };
			"/ventures/[slug]/progress": { slug: string };
			"/ventures/[slug]/sessions": { slug: string };
			"/ventures/[slug]/tasks": { slug: string };
			"/ventures/[slug]/team": { slug: string }
		};
		Pathname(): "/" | "/auth" | "/auth/" | "/auth/login" | "/auth/login/" | "/auth/logout" | "/auth/logout/" | "/auth/signup" | "/auth/signup/" | "/dashboard" | "/dashboard/" | "/mobile-must-signin" | "/mobile-must-signin/" | "/ventures" | "/ventures/" | "/ventures/new" | "/ventures/new/" | `/ventures/${string}` & {} | `/ventures/${string}/` & {} | `/ventures/${string}/ideas` & {} | `/ventures/${string}/ideas/` & {} | `/ventures/${string}/owner` & {} | `/ventures/${string}/owner/` & {} | `/ventures/${string}/owner/dashboard` & {} | `/ventures/${string}/owner/dashboard/` & {} | `/ventures/${string}/owner/ideas` & {} | `/ventures/${string}/owner/ideas/` & {} | `/ventures/${string}/owner/progress` & {} | `/ventures/${string}/owner/progress/` & {} | `/ventures/${string}/owner/sessions` & {} | `/ventures/${string}/owner/sessions/` & {} | `/ventures/${string}/owner/tasks` & {} | `/ventures/${string}/owner/tasks/` & {} | `/ventures/${string}/owner/team` & {} | `/ventures/${string}/owner/team/` & {} | `/ventures/${string}/progress` & {} | `/ventures/${string}/progress/` & {} | `/ventures/${string}/sessions` & {} | `/ventures/${string}/sessions/` & {} | `/ventures/${string}/tasks` & {} | `/ventures/${string}/tasks/` & {} | `/ventures/${string}/team` & {} | `/ventures/${string}/team/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/images/auth_background.jpg" | "/images/default.png" | "/images/hoooklogo.png" | "/images/phone.png" | "/images/round_logo.png" | "/robots.txt" | string & {};
	}
}