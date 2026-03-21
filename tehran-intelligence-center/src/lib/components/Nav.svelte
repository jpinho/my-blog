<script lang="ts">
	import { onMount } from 'svelte';

	const sections = [
		{ id: 'overview', label: '01_OVERVIEW' },
		{ id: 'people', label: '02_PEOPLE' },
		{ id: 'heritage', label: '03_HERITAGE' },
		{ id: 'power', label: '04_POWER' },
		{ id: 'resources', label: '05_RESOURCES' }
	];

	let activeSection = $state('');
	let scrolled = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				});
			},
			{ threshold: 0.3 }
		);

		sections.forEach((s) => {
			const el = document.getElementById(s.id);
			if (el) observer.observe(el);
		});

		const handleScroll = () => {
			scrolled = window.scrollY > 100;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled ? 'bg-bg-primary/90 backdrop-blur-md border-b border-border/20' : 'bg-transparent'}"
>
	<div class="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-12">
		<a href="#hero" class="font-mono text-xs text-accent-cyan tracking-wider font-bold hover:text-glow-cyan transition-all">
			TIC_
		</a>
		<div class="hidden md:flex items-center gap-1">
			{#each sections as section}
				<a
					href="#{section.id}"
					class="font-mono text-[10px] tracking-wider px-3 py-1.5 rounded transition-all
						{activeSection === section.id
							? 'text-accent-cyan bg-accent-cyan/10'
							: 'text-text-secondary hover:text-text-primary'}"
				>
					{section.label}
				</a>
			{/each}
		</div>
		<!-- Mobile: compact indicator -->
		<div class="md:hidden font-mono text-[10px] text-accent-cyan/60 tracking-wider">
			{#if activeSection}
				{sections.find(s => s.id === activeSection)?.label ?? ''}
			{/if}
		</div>
	</div>
</nav>
