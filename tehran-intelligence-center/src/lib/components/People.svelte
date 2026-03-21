<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ScrollReveal from './ScrollReveal.svelte';
	import BarChart from './BarChart.svelte';
	import DonutChart from './DonutChart.svelte';
	import { ethnicGroups, religions, languages } from '$lib/data/people';
</script>

<section id="people" class="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
	<SectionHeader number="02" title="PEOPLE & BELIEFS" />

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
		<!-- Ethnic composition -->
		<ScrollReveal>
			{#snippet children()}
			<div>
				<div class="font-mono text-xs text-text-secondary tracking-wider mb-4 uppercase">// Ethnic Composition</div>
				<div class="bg-bg-card border border-border/30 rounded-lg p-6">
					<BarChart items={ethnicGroups} maxValue={61} />
				</div>
			</div>
			{/snippet}
		</ScrollReveal>

		<!-- Religion -->
		<ScrollReveal delay={200}>
			{#snippet children()}
			<div>
				<div class="font-mono text-xs text-text-secondary tracking-wider mb-4 uppercase">// Religious Demographics</div>
				<div class="bg-bg-card border border-border/30 rounded-lg p-6 flex justify-center">
					<DonutChart segments={religions} size={220} />
				</div>
			</div>
			{/snippet}
		</ScrollReveal>
	</div>

	<!-- Languages -->
	<ScrollReveal delay={100}>
		{#snippet children()}
		<div>
			<div class="font-mono text-xs text-text-secondary tracking-wider mb-4 uppercase">// Languages</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
				{#each languages as lang}
					<div class="bg-bg-card border border-border/30 rounded-lg p-4">
						<div class="flex items-center gap-2 mb-2">
							<span class="font-mono text-sm font-bold text-accent-cyan">{lang.name}</span>
							<span class="font-mono text-[10px] px-1.5 py-0.5 border border-accent-cyan/30 rounded text-accent-cyan/70">
								{lang.type}
							</span>
						</div>
						<div class="font-mono text-xs text-text-secondary mb-1">{lang.speakers} of population</div>
						<div class="text-xs text-text-secondary/70 leading-relaxed">{lang.description}</div>
					</div>
				{/each}
			</div>
		</div>
		{/snippet}
	</ScrollReveal>
</section>
