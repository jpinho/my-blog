<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Overview from '$lib/components/Overview.svelte';
	import People from '$lib/components/People.svelte';
	import Heritage from '$lib/components/Heritage.svelte';
	import Power from '$lib/components/Power.svelte';
	import Resources from '$lib/components/Resources.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Tehran Intelligence Center — Iran Country Profile</title>
	<meta name="description" content="An interactive intelligence-style briefing on the Islamic Republic of Iran. Population, heritage, power structure, resources, and more." />
</svelte:head>

<Nav />
<main>
	<Hero />

	<!-- Divider -->
	<div class="h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent"></div>

	<Overview />

	<div class="h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent"></div>

	<People />

	<div class="h-px bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent"></div>

	<Heritage />

	<div class="h-px bg-gradient-to-r from-transparent via-accent-red/20 to-transparent"></div>

	<Power />

	<div class="h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent"></div>

	<Resources />
</main>

<Footer />
