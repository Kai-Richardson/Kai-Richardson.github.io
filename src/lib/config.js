/**
 * All of these values are used throughout the site – for example,
 * in the <meta> tags, in the footer, and in the RSS feed.
 **/

export const siteTitle = "Kai's Zone";
export const siteDescription = 'FOOBAR';
export const siteURL = 'kairichardson.com';
export const siteLink = 'https://github.com/Kai-Richardson/Kai-Richardson.github.io';
export const siteAuthor = 'Kai Richardson';

// Controls how many posts are shown per page on the main blog index pages
export const postsPerPage = 10;

// Edit this to alter the main nav menu. (Also used by the footer and mobile nav.)
export const navItems = [
	{
		title: 'Resume',
		route: '/resume'
	},
	{
		title: 'Blog',
		route: '/blog'
	},
	{
		title: 'Contact',
		route: '/contact'
	}
];
