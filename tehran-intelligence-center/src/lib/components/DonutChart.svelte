<script lang="ts">
	import { onMount } from 'svelte';

	interface Segment {
		label: string;
		value: number;
		color: string;
	}

	interface Props {
		segments: Segment[];
		size?: number;
		strokeWidth?: number;
		class?: string;
	}

	let { segments, size = 200, strokeWidth = 28, class: className = '' }: Props = $props();

	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const total = segments.reduce((acc, s) => acc + s.value, 0);

	let visible = $state(false);
	let element: HTMLDivElement;

	function getSegments() {
		let offset = 0;
		return segments.map((seg) => {
			const length = (seg.value / total) * circumference;
			const gap = 3;
			const result = {
				...seg,
				dashArray: `${Math.max(length - gap, 0)} ${circumference - Math.max(length - gap, 0)}`,
				dashOffset: -offset,
				percentage: ((seg.value / total) * 100).toFixed(1)
			};
			offset += length;
			return result;
		});
	}

	const computedSegments = getSegments();

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(element);
		return () => observer.disconnect();
	});
</script>

<div bind:this={element} class="flex flex-col items-center gap-4 {className}">
	<svg width={size} height={size} viewBox="0 0 {size} {size}" class="transform -rotate-90">
		{#each computedSegments as seg, i}
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				fill="none"
				stroke={seg.color}
				stroke-width={strokeWidth}
				stroke-dasharray={seg.dashArray}
				stroke-dashoffset={seg.dashOffset}
				stroke-linecap="round"
				class="transition-all duration-1000 ease-out"
				style="opacity: {visible ? 1 : 0}; transition-delay: {i * 200}ms;"
			/>
		{/each}
	</svg>
	<div class="flex flex-wrap justify-center gap-x-4 gap-y-1">
		{#each computedSegments as seg}
			<div class="flex items-center gap-1.5 text-xs font-mono">
				<span class="w-2.5 h-2.5 rounded-full" style="background: {seg.color}"></span>
				<span class="text-text-secondary">{seg.label}</span>
				<span class="text-text-primary">{seg.percentage}%</span>
			</div>
		{/each}
	</div>
</div>
