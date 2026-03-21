export const regimeHierarchy = [
	{
		role: 'Supreme Leader',
		name: 'Ali Khamenei (since 1989)',
		description: 'Commander-in-chief, final authority on all state matters, appoints judiciary head and half of Guardian Council',
		level: 0,
		color: '#c41e3a'
	},
	{
		role: 'Guardian Council',
		name: '12 members (6 appointed by Leader)',
		description: 'Vets all candidates and legislation for "Islamic compatibility." Can disqualify any candidate.',
		level: 1,
		color: '#c41e3a'
	},
	{
		role: 'Judiciary',
		name: 'Head appointed by Supreme Leader',
		description: 'No judicial independence. Political cases tried in Revolutionary Courts with no due process.',
		level: 1,
		color: '#c41e3a'
	},
	{
		role: 'IRGC (Revolutionary Guards)',
		name: 'Est. 1979 — ~190,000',
		description: 'Parallel military answering directly to Supreme Leader. Controls ~30% of economy, cyber warfare, proxy networks.',
		level: 1,
		color: '#c41e3a'
	},
	{
		role: 'President',
		name: 'Elected (pre-vetted candidates)',
		description: 'Head of government but subordinate to Supreme Leader. Limited executive power.',
		level: 2,
		color: '#d4a017'
	},
	{
		role: 'Parliament (Majlis)',
		name: '290 seats — elections controlled',
		description: 'Can propose legislation but all bills require Guardian Council approval.',
		level: 2,
		color: '#d4a017'
	}
];

export const humanRights = [
	{
		issue: 'Press Freedom',
		detail: 'Ranked 176/180 by RSF. Dozens of journalists imprisoned.',
		severity: 'critical'
	},
	{
		issue: "Women's Rights",
		detail: 'Mandatory hijab law. "Woman, Life, Freedom" movement (2022) met with lethal force. 500+ killed, 22,000+ arrested.',
		severity: 'critical'
	},
	{
		issue: 'Internet Censorship',
		detail: 'Regular shutdowns. VPN usage criminalized. Social media blocked.',
		severity: 'critical'
	},
	{
		issue: 'Political Prisoners',
		detail: 'Thousands held. Activists, lawyers, minority rights defenders. Reports of torture.',
		severity: 'critical'
	},
	{
		issue: 'Executions',
		detail: 'Highest per capita execution rate globally. 853+ in 2023. Drug offenses, "moharebeh" (enmity against God).',
		severity: 'critical'
	},
	{
		issue: 'Minority Rights',
		detail: "Baháʼís systematically persecuted. Kurdish, Baloch, Arab minorities face discrimination.",
		severity: 'high'
	}
];

export const military = {
	active: 610_000,
	irgc: 190_000,
	basij: 600_000,
	budget: '$6.8B (official, est. $25B+ real)',
	missiles: 'Largest ballistic missile arsenal in the Middle East',
	nuclear: 'Enriching uranium to 60%. Breakout capacity estimated at weeks.',
	drones: 'Major drone manufacturer. Shahed-136 used in Ukraine conflict.',
	proxies: 'Hezbollah, Hamas, Houthis, Iraqi PMF — "Axis of Resistance"'
};

export const freedomIndex = {
	score: 14,
	maxScore: 100,
	rating: 'Not Free',
	source: 'Freedom House 2024'
};
