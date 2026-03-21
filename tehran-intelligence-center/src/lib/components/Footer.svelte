<script lang="ts">
	const sources = [
		'CIA World Factbook',
		'Freedom House (2024)',
		'UN Population Division',
		'UNESCO World Heritage Centre',
		'OPEC Annual Statistical Bulletin',
		'Reporters Without Borders (RSF)',
		'Scopus / SCImago',
		'Heritage Foundation Economic Freedom Index',
		'IISS Military Balance 2024'
	];
</script>

<footer id="footer" class="relative py-16 px-4 md:px-8 border-t border-border/20">
	<div class="max-w-6xl mx-auto">
		<!-- Terminal-style header -->
		<div class="font-mono text-xs text-text-secondary/50 tracking-wider mb-6">
			// END OF BRIEFING
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<!-- Sources -->
			<div>
				<div class="font-mono text-xs text-accent-cyan/60 tracking-wider mb-3 uppercase">Sources</div>
				<ul class="space-y-1">
					{#each sources as source}
						<li class="font-mono text-[11px] text-text-secondary/60">&gt; {source}</li>
					{/each}
				</ul>
			</div>

			<!-- Disclaimer -->
			<div>
				<div class="font-mono text-xs text-accent-cyan/60 tracking-wider mb-3 uppercase">Disclaimer</div>
				<p class="text-xs text-text-secondary/50 leading-relaxed">
					This is an educational information page. All data sourced from publicly available international references.
					Statistics may vary by source and year. This page does not represent any government position.
				</p>
				<div class="mt-6 font-mono text-xs text-text-secondary/30">
					TEHRAN INTELLIGENCE CENTER v1.0
				</div>
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="mt-12 pt-6 border-t border-border/10 flex items-center justify-between">
			<div class="font-mono text-[10px] text-text-secondary/30 tracking-widest">
				CLASSIFICATION: OPEN SOURCE // UNCLASSIFIED
			</div>
			<div class="font-mono text-[10px] text-text-secondary/30">
				2024
			</div>
		</div>
	</div>
</footer>
