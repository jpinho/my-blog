<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		target: number;
		duration?: number;
		suffix?: string;
		prefix?: string;
		decimals?: number;
		class?: string;
	}

	let { target, duration = 2000, suffix = '', prefix = '', decimals = 0, class: className = '' }: Props = $props();

	let current = $state(0);
	let element: HTMLSpanElement;
	let started = $state(false);

	function formatNumber(n: number): string {
		return n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !started) {
					started = true;
					const startTime = performance.now();
					function animate(now: number) {
						const elapsed = now - startTime;
						const progress = Math.min(elapsed / duration, 1);
						const eased = 1 - Math.pow(1 - progress, 3);
						current = eased * target;
						if (progress < 1) {
							requestAnimationFrame(animate);
						} else {
							current = target;
						}
					}
					requestAnimationFrame(animate);
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(element);
		return () => observer.disconnect();
	});
</script>

<span bind:this={element} class={className}>
	{prefix}{formatNumber(current)}{suffix}
</span>
