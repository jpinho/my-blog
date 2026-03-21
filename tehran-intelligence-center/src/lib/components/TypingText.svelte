<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		text: string;
		speed?: number;
		delay?: number;
		class?: string;
	}

	let { text, speed = 60, delay = 0, class: className = '' }: Props = $props();

	let displayed = $state('');
	let done = $state(false);

	onMount(() => {
		const timeout = setTimeout(() => {
			let i = 0;
			const interval = setInterval(() => {
				if (i < text.length) {
					displayed += text[i];
					i++;
				} else {
					done = true;
					clearInterval(interval);
				}
			}, speed);
			return () => clearInterval(interval);
		}, delay);
		return () => clearTimeout(timeout);
	});
</script>

<span class={className}>
	{displayed}{#if !done}<span class="inline-block animate-pulse text-accent-cyan">_</span>{/if}
</span>
