<script>
	import '../app.css';
	import { isLogin } from '../utils/stores.js';
	import { logOut } from '../utils/auth.js';


	// The way of using lib for importing
	import Logo from '$lib/images/profile-logo.png';
	import User from '$lib/images/user.png';

	
	const logoutDone = async () => {
		isLogin.set(!logOut());
	};
</script>

{#if $isLogin}
	<div class="flex justify-between items-center nav-container fixed top-0 left-0 right-0">
		<a class="flex-none flex btn btn-outline btn-accent btn-lg nav-title" href="/mainPage">
			<img src={Logo} alt="profile-logo" class="profile-logo flex-none" href="/mainPage" />
			<div class="flex-none">Final Project</div>
			<div class="flex-none small-title">Expense Tracker</div>
		</a>

		<div class="flex-none pr-6 right-container">
			<select data-choose-theme class="select select-accent select-sm">
				<option value="winter">Winter</option>
				<option value="cupcake">Cupcake</option>
			</select>
			<div class="flex flex-row items-center">
				<a class="btn btn-outline btn-accent flex-none" href="/signIn" on:click={logoutDone}
					>Log Out</a
				>
			</div>
		</div>
	</div>
{:else}
	<div class="flex justify-between items-center nav-container fixed top-0 left-0 right-0">
		<a class="flex-none flex btn btn-outline btn-accent btn-lg nav-title" href="/">
			<img src={Logo} alt="profile-logo" class="profile-logo flex-none" href="/" />
			<div class="flex-none">Final Project</div>
			<div class="flex-none small-title">Expense Tracker</div>
		</a>

		<div class="flex-none pr-6">
			<select data-choose-theme class="select select-accent select-sm">
				<option value="winter">Winter</option>
				<option value="cupcake">Cupcake</option>
			</select>
			<a class="btn btn-outline btn-accent flex-none" href="/signUp">Sign Up</a>
			<a class="btn btn-outline btn-accent flex-none" href="/signIn">Log In</a>
		</div>
	</div>
{/if}

<style>
	.nav-container {
		height: 60px;
		border-bottom: 1px solid black;
		padding-bottom: 5px;
		background-color: black;
		z-index: 1;
	}

	.profile-logo {
		height: 40px;
		width: auto;
		border-radius: 50%;
		cursor: pointer;
	}

	.nav-title {
		font-size: 25px;
		width: auto;
		height: 6vh;
		text-transform: none;
		border: none;
	}

	.right-container {
		width: 500px;
		display: flex;
		justify-content:end;
		align-items: center;
	}

	.user-logo {
		height: 40px;
	}

	.small-title {
		font-size: 13px;
	}
</style>