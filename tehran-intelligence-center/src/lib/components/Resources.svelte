<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ScrollReveal from './ScrollReveal.svelte';
	import BarChart from './BarChart.svelte';
	import { resourceRankings, economy, research } from '$lib/data/resources';
</script>

<section id="resources" class="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
	<!-- Back to cyan accent -->
	<div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-accent-cyan/50"></div>

	<SectionHeader number="05" title="RESOURCES & GLOBAL STANDING" />

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
		<!-- Resource rankings -->
		<ScrollReveal>
			{#snippet children()}
			<div>
				<div class="font-mono text-xs text-text-secondary tracking-wider mb-4 uppercase">// World Rankings</div>
				<div class="bg-bg-card border border-border/30 rounded-lg p-6">
					<BarChart items={resourceRankings} maxValue={100} />
				</div>
			</div>
			{/snippet}
		</ScrollReveal>

		<!-- Economy -->
		<ScrollReveal delay={200}>
			{#snippet children()}
			<div>
				<div class="font-mono text-xs text-text-secondary tracking-wider mb-4 uppercase">// Economy</div>
				<div class="bg-bg-card border border-border/30 rounded-lg p-6 space-y-3">
					{#each [
						{ label: 'GDP (Nominal)', value: economy.gdpNominal },
						{ label: 'GDP (PPP)', value: economy.gdpPPP },
						{ label: 'Per Capita (PPP)', value: economy.gdpPerCapita },
						{ label: 'Inflation', value: economy.inflation },
						{ label: 'Unemployment', value: economy.unemployment },
						{ label: 'Oil Exports', value: economy.oilExports },
						{ label: 'Economic Freedom', value: economy.economicFreedom }
					] as stat}
						<div class="flex justify-between items-center py-1.5 border-b border-border/20 last:border-0">
							<span class="font-mono text-xs text-text-secondary">{stat.label}</span>
							<span class="font-mono text-xs text-text-primary">{stat.value}</span>
						</div>
					{/each}
				</div>
				<div class="mt-3 bg-bg-card border border-accent-red/20 rounded-lg p-4">
					<div class="font-mono text-xs text-accent-red/70 font-bold mb-1">Sanctions</div>
					<p class="text-xs text-text-secondary/80 leading-relaxed">{economy.sanctions}</p>
				</div>
			</div>
			{/snippet}
		</ScrollReveal>
	</div>

	<!-- Research & Science -->
	<ScrollReveal delay={100}>
		{#snippet children()}
		<div>
			<div class="font-mono text-xs text-text-secondary tracking-wider mb-4 uppercase">// Science & Research</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
				{#each [
					{ label: 'Scientific Output', value: research.scientificPapers, color: 'accent-cyan' },
					{ label: 'STEM Graduates', value: research.stemGraduates + '/year', color: 'accent-cyan' },
					{ label: 'Nanotechnology', value: research.nanotech, color: 'accent-gold' },
					{ label: 'Space Program', value: research.spaceProgram, color: 'accent-cyan' },
					{ label: 'Universities', value: research.universities, color: 'accent-cyan' },
					{ label: 'Brain Drain', value: research.brainDrain, color: 'accent-red' }
				] as item}
					<div class="bg-bg-card border border-border/30 rounded-lg p-4">
						<div class="font-mono text-xs text-{item.color}/80 font-bold mb-1">{item.label}</div>
						<p class="text-xs text-text-secondary/80 leading-relaxed">{item.value}</p>
					</div>
				{/each}
			</div>
		</div>
		{/snippet}
	</ScrollReveal>
</section>
