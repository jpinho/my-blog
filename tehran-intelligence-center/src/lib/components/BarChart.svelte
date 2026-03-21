<script lang="ts">
	import { onMount } from 'svelte';

	interface BarItem {
		label: string;
		value: number;
		suffix?: string;
		color?: string;
	}

	interface Props {
		items: BarItem[];
		maxValue?: number;
		class?: string;
	}

	let { items, maxValue, class: className = '' }: Props = $props();

	const max = maxValue ?? Math.max(...items.map((i) => i.value));
	let visible = $state(false);
	let element: HTMLDivElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);
		observer.observe(element);
		return () => observer.disconnect();
	});
</script>

<div bind:this={element} class="space-y-3 {className}">
	{#each items as item, i}
		<div class="group">
			<div class="flex justify-between mb-1 text-sm">
				<span class="text-text-secondary font-mono">{item.label}</span>
				<span class="text-text-primary font-mono">{item.value}{item.suffix ?? '%'}</span>
			</div>
			<div class="h-2.5 bg-bg-secondary rounded-full overflow-hidden border border-border/30">
				<div
					class="h-full rounded-full transition-all duration-1000 ease-out"
					style="width: {visible ? (item.value / max) * 100 : 0}%; background: {item.color ?? 'var(--color-accent-cyan)'}; transition-delay: {i * 100}ms;"
				></div>
			</div>
		</div>
	{/each}
</div>
