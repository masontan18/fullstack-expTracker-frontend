<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { isLogin } from '../utils/stores.js';
	import { isLoggedIn } from '../utils/auth.js';
	import Footer from '../components/Footer.svelte';
	import { goto } from '$app/navigation';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(async () => {
		themeChange(false);
		// 👆 false parameter is required for svelte

		// check local storage to see if login-ed, refer function named "isLoggedIn" in auth.js
		isLogin.set(await isLoggedIn());
	});

	const clickHandler = () => {
		goto("/signIn")
	}
</script>

<div class="hero min-h-screen main-message" style="background-image: url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);">
	<div class="hero-overlay bg-opacity-60"></div>
	<div class="hero-content text-center text-neutral-content">
	  <div class="max-w-md">
		<h1 class="mb-5 text-5xl font-bold">Your Expense Tracker</h1>
		<p class="mb-5">Beware of small expenses; a small leak will sink a great ship.</p>
		<p class="mb-5">It takes just as much energy to wish as it does to plan.</p>
		<button class="btn btn-primary" on:click={clickHandler} >Get Started</button>
	  </div>
	</div>
  </div>

<Footer />

<style>
	.main-message {
		margin-top: 20px;
	}
</style>
