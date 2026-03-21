<script lang="ts">
	import { onMount } from 'svelte';

	interface CityMarker {
		name: string;
		lat: number;
		lng: number;
		population?: string;
		description?: string;
	}

	interface Props {
		cities?: CityMarker[];
		zoom?: number;
		center?: [number, number];
		height?: string;
		interactive?: boolean;
		class?: string;
	}

	let {
		cities = [],
		zoom = 5,
		center = [32.5, 53.5],
		height = '500px',
		interactive = true,
		class: className = ''
	}: Props = $props();

	let mapContainer: HTMLDivElement;

	onMount(async () => {
		const L = await import('leaflet');

		const map = L.map(mapContainer, {
			center: center as L.LatLngExpression,
			zoom,
			zoomControl: interactive,
			scrollWheelZoom: interactive,
			dragging: interactive,
			doubleClickZoom: interactive,
			attributionControl: false
		});

		L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
			maxZoom: 19
		}).addTo(map);

		// Custom cyan marker icon
		const markerIcon = L.divIcon({
			className: 'custom-marker',
			html: `
				<div style="position:relative;width:16px;height:16px;">
					<div style="position:absolute;inset:0;background:#00d4aa;border-radius:50%;opacity:0.3;animation:pulse-ring 2s cubic-bezier(0.215,0.61,0.355,1) infinite;"></div>
					<div style="position:absolute;inset:3px;background:#00d4aa;border-radius:50%;border:2px solid #0a0a0f;"></div>
				</div>
			`,
			iconSize: [16, 16],
			iconAnchor: [8, 8],
			popupAnchor: [0, -12]
		});

		cities.forEach((city) => {
			const marker = L.marker([city.lat, city.lng], { icon: markerIcon }).addTo(map);
			marker.bindPopup(`
				<div style="font-family:'JetBrains Mono',monospace;font-size:12px;padding:4px;">
					<div style="color:#00d4aa;font-weight:700;margin-bottom:4px;">${city.name}</div>
					${city.population ? `<div style="color:#8b949e;">Pop: ${city.population}</div>` : ''}
					${city.description ? `<div style="color:#e6edf3;margin-top:4px;">${city.description}</div>` : ''}
				</div>
			`);
		});

		return () => map.remove();
	});
</script>

<div bind:this={mapContainer} class="rounded-lg border border-border/30 {className}" style="height: {height};"></div>
