export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20')
];

export const server_loads = [0,4,5,6];

export const dictionary = {
		"/": [7],
		"/auth/login": [~8,[2]],
		"/auth/signup": [~9,[2]],
		"/dashboard": [10],
		"/mobile-must-signin": [11],
		"/profile/[id]": [~12,[3]],
		"/ventures/new": [~13,[4]],
		"/ventures/[slug]/(public)": [~14,[5]],
		"/ventures/[slug]/(public)/ideas": [~15,[5]],
		"/ventures/[slug]/owner": [20,[6]],
		"/ventures/[slug]/(public)/progress": [~16,[5]],
		"/ventures/[slug]/(public)/sessions": [~17,[5]],
		"/ventures/[slug]/(public)/tasks": [~18,[5]],
		"/ventures/[slug]/(public)/team": [~19,[5]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';