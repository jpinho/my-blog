<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ScrollReveal from './ScrollReveal.svelte';
	import { unescoSites, contributions, culturalStats } from '$lib/data/heritage';
</script>

<section id="heritage" class="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
	<!-- Gold accent border -->
	<div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-accent-gold/50"></div>

	<SectionHeader number="03" title="HERITAGE & MARVELS" tag="BRIGHT SIDE" tagColor="text-accent-gold" accentColor="bg-accent-gold" />

	<!-- UNESCO Sites -->
	<ScrollReveal>
		{#snippet children()}
		<div class="mb-16">
			<div class="font-mono text-xs text-accent-gold/60 tracking-wider mb-4 uppercase">// UNESCO World Heritage Sites</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each unescoSites as site}
					<div class="bg-bg-card border border-accent-gold/20 rounded-lg p-5 hover:border-accent-gold/40 transition-colors group">
						<div class="flex items-start justify-between mb-2">
							<h3 class="font-mono text-sm font-bold text-accent-gold group-hover:text-glow-gold transition-all">{site.name}</h3>
							{#if site.badge}
								<span class="font-mono text-[9px] px-1.5 py-0.5 border border-accent-gold/30 rounded text-accent-gold/60 shrink-0 ml-2">
									{site.badge}
								</span>
							{/if}
						</div>
						<div class="font-mono text-[10px] text-text-secondary tracking-wider mb-2">
							{site.location} &bull; {site.yearLabel}
						</div>
						<p class="text-xs text-text-secondary/80 leading-relaxed">{site.description}</p>
					</div>
				{/each}
			</div>
		</div>
		{/snippet}
	</ScrollReveal>

	<!-- Contributions Timeline -->
	<ScrollReveal delay={200}>
		{#snippet children()}
		<div class="mb-16">
			<div class="font-mono text-xs text-accent-gold/60 tracking-wider mb-6 uppercase">// Civilizational Contributions</div>
			<div class="relative">
				<!-- Vertical line -->
				<div class="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-accent-gold/20"></div>

				<div class="space-y-8">
					{#each contributions as item, i}
						<div class="relative pl-12 md:pl-20">
							<!-- Dot -->
							<div class="absolute left-2.5 md:left-6.5 top-1 w-3 h-3 rounded-full bg-accent-gold/40 border-2 border-accent-gold"></div>
							<!-- Year -->
							<div class="font-mono text-xs text-accent-gold/70 tracking-wider mb-1">{item.year}</div>
							<h4 class="font-mono text-sm font-bold text-text-primary mb-0.5">
								{item.title}
								<span class="text-accent-gold/60 font-normal"> — {item.person}</span>
							</h4>
							<p class="text-xs text-text-secondary/80 leading-relaxed max-w-xl">{item.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
		{/snippet}
	</ScrollReveal>

	<!-- Cultural stats -->
	<ScrollReveal delay={100}>
		{#snippet children()}
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
			{#each culturalStats as stat}
				<div class="bg-bg-secondary/50 border border-accent-gold/15 rounded p-3 text-center">
					<div class="text-2xl mb-1">{stat.icon}</div>
					<div class="font-mono text-[10px] text-text-secondary leading-tight">{stat.label}</div>
				</div>
			{/each}
		</div>
		{/snippet}
	</ScrollReveal>
</section>
