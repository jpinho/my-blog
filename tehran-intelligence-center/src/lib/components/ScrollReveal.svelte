<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		delay?: number;
		class?: string;
	}

	let { children, delay = 0, class: className = '' }: Props = $props();

	let element: HTMLDivElement;
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setTimeout(() => {
						visible = true;
					}, delay);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(element);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={element}
	class="{className} transition-all duration-700 ease-out {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
>
	{@render children()}
</div>
