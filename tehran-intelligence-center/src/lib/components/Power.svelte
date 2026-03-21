<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ScrollReveal from './ScrollReveal.svelte';
	import CountUp from './CountUp.svelte';
	import { regimeHierarchy, humanRights, military, freedomIndex } from '$lib/data/power';
</script>

<section id="power" class="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
	<!-- Red accent border -->
	<div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-accent-red/50"></div>

	<!-- Red tinted background -->
	<div class="absolute inset-0 bg-gradient-to-b from-accent-red/[0.03] via-transparent to-transparent pointer-events-none"></div>

	<div class="relative">
		<SectionHeader number="04" title="POWER STRUCTURE" tag="DARK SIDE" tagColor="text-accent-red" accentColor="bg-accent-red" />

		<!-- Regime hierarchy -->
		<ScrollReveal>
			{#snippet children()}
			<div class="mb-16">
				<div class="font-mono text-xs text-accent-red/60 tracking-wider mb-4 uppercase">// Regime Architecture</div>
				<div class="space-y-3">
					{#each regimeHierarchy as node}
						<div
							class="bg-bg-card border rounded-lg p-4 transition-colors"
							style="border-color: {node.color}33; margin-left: {node.level * 24}px;"
						>
							<div class="flex items-center gap-3 mb-1">
								{#if node.level === 0}
									<div class="w-2 h-2 rounded-full bg-accent-red animate-pulse"></div>
								{:else}
									<div class="w-1.5 h-1.5 rounded-full" style="background: {node.color}88;"></div>
								{/if}
								<span class="font-mono text-sm font-bold" style="color: {node.color};">{node.role}</span>
								<span class="font-mono text-xs text-text-secondary">{node.name}</span>
							</div>
							<p class="text-xs text-text-secondary/70 leading-relaxed ml-5">{node.description}</p>
						</div>
					{/each}
				</div>
			</div>
			{/snippet}
		</ScrollReveal>

		<!-- Human rights -->
		<ScrollReveal delay={200}>
			{#snippet children()}
			<div class="mb-16">
				<div class="font-mono text-xs text-accent-red/60 tracking-wider mb-4 uppercase">// Human Rights Concerns</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					{#each humanRights as item}
						<div class="bg-bg-card border border-accent-red/20 rounded-lg p-4">
							<div class="flex items-center gap-2 mb-2">
								<div class="w-2 h-2 rounded-full {item.severity === 'critical' ? 'bg-accent-red animate-pulse' : 'bg-accent-red/60'}"></div>
								<span class="font-mono text-sm font-bold text-accent-red">{item.issue}</span>
								<span class="font-mono text-[9px] px-1 py-0.5 rounded bg-accent-red/10 text-accent-red/70 uppercase">{item.severity}</span>
							</div>
							<p class="text-xs text-text-secondary/80 leading-relaxed">{item.detail}</p>
						</div>
					{/each}
				</div>
			</div>
			{/snippet}
		</ScrollReveal>

		<!-- Military -->
		<ScrollReveal delay={100}>
			{#snippet children()}
			<div class="mb-16">
				<div class="font-mono text-xs text-accent-red/60 tracking-wider mb-4 uppercase">// Military Capabilities</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<!-- Personnel stats -->
					<div class="bg-bg-card border border-border/30 rounded-lg p-5">
						<div class="font-mono text-xs text-text-secondary mb-4">Armed Forces Personnel</div>
						<div class="space-y-3">
							<div>
								<div class="flex justify-between mb-1">
									<span class="font-mono text-xs text-text-secondary">Regular Military</span>
									<span class="font-mono text-sm text-text-primary">
										<CountUp target={610000} suffix="" />
									</span>
								</div>
								<div class="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
									<div class="h-full bg-accent-red/70 rounded-full" style="width: 43%"></div>
								</div>
							</div>
							<div>
								<div class="flex justify-between mb-1">
									<span class="font-mono text-xs text-text-secondary">IRGC</span>
									<span class="font-mono text-sm text-text-primary">
										<CountUp target={190000} suffix="" />
									</span>
								</div>
								<div class="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
									<div class="h-full bg-accent-red/50 rounded-full" style="width: 14%"></div>
								</div>
							</div>
							<div>
								<div class="flex justify-between mb-1">
									<span class="font-mono text-xs text-text-secondary">Basij (Paramilitary)</span>
									<span class="font-mono text-sm text-text-primary">
										<CountUp target={600000} suffix="" />
									</span>
								</div>
								<div class="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
									<div class="h-full bg-accent-red/40 rounded-full" style="width: 43%"></div>
								</div>
							</div>
						</div>
						<div class="font-mono text-[10px] text-text-secondary/50 mt-3">Budget: {military.budget}</div>
					</div>

					<!-- Capabilities -->
					<div class="space-y-3">
						{#each [
							{ label: 'Missiles', detail: military.missiles },
							{ label: 'Nuclear', detail: military.nuclear },
							{ label: 'Drones', detail: military.drones },
							{ label: 'Proxy Networks', detail: military.proxies }
						] as cap}
							<div class="bg-bg-card border border-border/30 rounded-lg p-4">
								<div class="font-mono text-xs text-accent-red/80 font-bold mb-1">{cap.label}</div>
								<p class="text-xs text-text-secondary/80 leading-relaxed">{cap.detail}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
			{/snippet}
		</ScrollReveal>

		<!-- Freedom Index -->
		<ScrollReveal delay={100}>
			{#snippet children()}
			<div class="bg-bg-card border border-accent-red/30 rounded-lg p-6 glow-red">
				<div class="flex items-center justify-between mb-3">
					<div class="font-mono text-sm font-bold text-accent-red">Freedom Index</div>
					<div class="font-mono text-[10px] text-text-secondary">{freedomIndex.source}</div>
				</div>
				<div class="flex items-center gap-4">
					<div class="font-mono text-4xl font-bold text-accent-red">
						<CountUp target={freedomIndex.score} suffix="" />
					</div>
					<div class="flex-1">
						<div class="h-3 bg-bg-secondary rounded-full overflow-hidden">
							<div class="h-full bg-accent-red rounded-full transition-all duration-2000" style="width: {freedomIndex.score}%"></div>
						</div>
						<div class="flex justify-between mt-1">
							<span class="font-mono text-[10px] text-accent-red">0 — NOT FREE</span>
							<span class="font-mono text-[10px] text-text-secondary">{freedomIndex.maxScore}</span>
						</div>
					</div>
					<div class="font-mono text-sm px-3 py-1 bg-accent-red/10 border border-accent-red/30 rounded text-accent-red">
						{freedomIndex.rating}
					</div>
				</div>
			</div>
			{/snippet}
		</ScrollReveal>
	</div>
</section>
