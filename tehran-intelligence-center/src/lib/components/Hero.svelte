<script lang="ts">
	import TypingText from './TypingText.svelte';
	import { onMount } from 'svelte';
	import { cities } from '$lib/data/overview';

	let mapContainer: HTMLDivElement;

	onMount(async () => {
		const L = await import('leaflet');

		const map = L.map(mapContainer, {
			center: [32.5, 53.5],
			zoom: 5,
			zoomControl: false,
			scrollWheelZoom: false,
			dragging: false,
			doubleClickZoom: false,
			attributionControl: false,
			keyboard: false
		});

		L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
			maxZoom: 19
		}).addTo(map);

		const markerIcon = L.divIcon({
			className: 'custom-marker',
			html: `<div style="width:8px;height:8px;background:#00d4aa;border-radius:50%;opacity:0.6;"></div>`,
			iconSize: [8, 8],
			iconAnchor: [4, 4]
		});

		cities.forEach((city) => {
			L.marker([city.lat, city.lng], { icon: markerIcon }).addTo(map);
		});

		return () => map.remove();
	});
</script>

<section id="hero" class="relative h-screen w-full overflow-hidden">
	<!-- Map background -->
	<div bind:this={mapContainer} class="absolute inset-0 z-0 opacity-40"></div>

	<!-- Scan-line overlay -->
	<div class="scan-lines absolute inset-0 z-10"></div>

	<!-- Gradient overlay -->
	<div class="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]"></div>

	<!-- Content -->
	<div class="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
		<div class="mb-4 font-mono text-xs tracking-[0.3em] text-text-secondary uppercase">
			// Classified Briefing
		</div>

		<h1 class="font-mono text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-glow-cyan">
			<TypingText text="TEHRAN INTELLIGENCE CENTER" speed={50} />
		</h1>

		<p class="font-mono text-sm md:text-base text-text-secondary tracking-widest mb-2 max-w-2xl">
			ISLAMIC REPUBLIC OF IRAN — COUNTRY PROFILE
		</p>
		<p class="font-mono text-xs text-accent-cyan/60 tracking-wider mb-10">
			POPULATION 88.5M &bull; AREA 1.648M KM&sup2; &bull; EST. 1979
		</p>

		<a
			href="#overview"
			class="group font-mono text-sm tracking-widest border border-accent-cyan/50 text-accent-cyan px-8 py-3 hover:bg-accent-cyan/10 hover:border-accent-cyan transition-all duration-300 glow-cyan"
		>
			ENTER BRIEFING
			<span class="inline-block ml-2 transition-transform group-hover:translate-y-1">↓</span>
		</a>
	</div>

	<!-- Bottom fade -->
	<div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent z-20"></div>
</section>
