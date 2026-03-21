<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ScrollReveal from './ScrollReveal.svelte';
	import CountUp from './CountUp.svelte';
	import LeafletMap from './LeafletMap.svelte';
	import { overview, cities } from '$lib/data/overview';
</script>

<section id="overview" class="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
	<SectionHeader number="01" title="OVERVIEW" />

	<!-- Stat cards -->
	<ScrollReveal>
		{#snippet children()}
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
			<div class="bg-bg-card border border-border/30 rounded-lg p-6 text-center">
				<div class="font-mono text-3xl md:text-4xl font-bold text-accent-cyan mb-1">
					<CountUp target={88.5} decimals={1} suffix="M" duration={2000} />
				</div>
				<div class="font-mono text-xs text-text-secondary tracking-wider uppercase">Population</div>
			</div>
			<div class="bg-bg-card border border-border/30 rounded-lg p-6 text-center">
				<div class="font-mono text-3xl md:text-4xl font-bold text-accent-cyan mb-1">
					<CountUp target={1.648} decimals={3} suffix="M km²" duration={2000} />
				</div>
				<div class="font-mono text-xs text-text-secondary tracking-wider uppercase">Total Area</div>
			</div>
			<div class="bg-bg-card border border-border/30 rounded-lg p-6 text-center">
				<div class="font-mono text-3xl md:text-4xl font-bold text-accent-cyan mb-1">
					<CountUp target={9.5} decimals={1} suffix="M" duration={2000} />
				</div>
				<div class="font-mono text-xs text-text-secondary tracking-wider uppercase">Tehran Pop.</div>
			</div>
		</div>
		{/snippet}
	</ScrollReveal>

	<!-- Info grid -->
	<ScrollReveal delay={200}>
		{#snippet children()}
		<div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
			{#each [
				{ label: 'Official Name', value: overview.officialName },
				{ label: 'Government', value: overview.government },
				{ label: 'Currency', value: overview.currency },
				{ label: 'Founded', value: overview.founded },
				{ label: 'Region', value: overview.continent },
				{ label: 'GDP (Nominal)', value: overview.gdp },
				{ label: 'HDI', value: String(overview.hdi) },
				{ label: 'Capital', value: overview.capital }
			] as stat}
				<div class="bg-bg-secondary/50 border border-border/20 rounded p-3">
					<div class="font-mono text-[10px] text-text-secondary tracking-wider uppercase mb-1">{stat.label}</div>
					<div class="font-mono text-sm text-text-primary">{stat.value}</div>
				</div>
			{/each}
		</div>
		{/snippet}
	</ScrollReveal>

	<!-- Map -->
	<ScrollReveal delay={300}>
		{#snippet children()}
		<div>
			<div class="font-mono text-xs text-text-secondary tracking-wider mb-3 uppercase">// Interactive Map — Major Cities</div>
			<LeafletMap {cities} zoom={5} height="450px" />
		</div>
		{/snippet}
	</ScrollReveal>
</section>
