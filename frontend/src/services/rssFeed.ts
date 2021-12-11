export type FeedItem = {
			title: string;
			description: string;
			source: string;
			date: Date;
			link: string;
			image: string;
		}

async function getExpansionRss(): Promise<Array<FeedItem>> {
	const res = await fetch(`https://e00-expansion.uecdn.es/rss/economia.xml`);
	const str = await res.text();
	const feed = new window.DOMParser().parseFromString(str, 'text/xml');
	const nodelist = feed.querySelectorAll('item');
	const feedItems = Array.from(nodelist).map((el: any) => ({
		source: 'expansion.com',
		link: el.querySelector('link').innerHTML,
		title: el
			.querySelector('title')
			.innerHTML.substring(
				9,
				el.querySelector('title').innerHTML.indexOf(']')
			),
		description: el
			.querySelector('description')
			.innerHTML.substring(
				9,
				el.querySelector('description').innerHTML.indexOf('.') + 1
			),
		date: el.querySelector('pubDate').innerHTML,
		image: el.querySelector('content')?.getAttribute('url'),
	}));
	return feedItems.filter((item) =>
		/[c|C]arburante|[G|g]asolina|[D|d]i[e|é]sel/.test(item.description)
	);
}

async function getEuropaPressRss(): Promise<Array<FeedItem>> {
	return fetch(`https://www.europapress.es/rss/rss.aspx?buscar=diesel`)
		.then(res => res.text().then(
		str => {	
			const feed = new window.DOMParser().parseFromString(str, 'text/xml');
			const nodelist = feed.querySelectorAll('item');
			return Array.from(nodelist).map((el: any) => ({
				source: 'europapress.es',
				link: el.querySelector('link').innerHTML,
				title: el
					.querySelector('title').innerHTML,
				description: el
					.querySelector('description').innerHTML,
				date: el.querySelector('pubDate').innerHTML,
				image: el.querySelector('content')?.getAttribute('url'),
			}))
		}))
}

export default class RssScapperService{

	private items = [];
  public static instance: RssScapperService = new RssScapperService();

	private RSSScapperService(){
		//Singleton. Use the public attribute instance
	}

	async getRssItems(): Promise<Array<FeedItem>>{
		if (this.items.length)
			return Promise.resolve(this.items);
		else{
			const results = await Promise.all([getEuropaPressRss(), getExpansionRss()]).then((values) => {
				const a  = values.reduce((acc, val) => acc.concat(val), []);
				return a
			});
			return Promise.resolve(results);
		}	
	}
}