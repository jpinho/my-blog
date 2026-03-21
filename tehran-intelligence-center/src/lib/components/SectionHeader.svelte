<script lang="ts">
	interface Props {
		number: string;
		title: string;
		tag?: string;
		tagColor?: string;
		accentColor?: string;
		class?: string;
	}

	let { number, title, tag, tagColor = 'text-accent-cyan', accentColor = 'bg-accent-cyan', class: className = '' }: Props = $props();
</script>

<div class="mb-10 {className}">
	<div class="flex items-center gap-3 mb-2">
		<div class="h-px flex-1 max-w-12 {accentColor} opacity-50"></div>
		<span class="font-mono text-xs tracking-widest text-text-secondary uppercase">
			Section_{number}
		</span>
		{#if tag}
			<span class="font-mono text-[10px] tracking-wider px-2 py-0.5 border rounded {tagColor} border-current opacity-70">
				[{tag}]
			</span>
		{/if}
	</div>
	<h2 class="font-mono text-2xl md:text-3xl font-bold tracking-tight cursor-blink">
		{title}
	</h2>
</div>
