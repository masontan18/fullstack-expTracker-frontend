<script>
	import '../../app.css';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { isLogin } from '../../utils/stores.js';
	import { isLoggedIn } from '../../utils/auth.js';
	import Footer from '../../components/Footer.svelte';
	import owlLogo from '$lib/images/owl.png';
	import { getUserId } from '../../utils/auth.js';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { getAccessTokenFromLocalStorage } from '../../utils/auth.js';

	export let data;

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(async () => {
		themeChange(false);
		// 👆 false parameter is required for svelte

		// check local storage to see if login-ed, refer function named "isLoggedIn" in auth.js
		isLogin.set(await isLoggedIn());
	});

	async function subtmitHandler(evt) {
		evt.preventDefault();

		const userData = {
			userId: getUserId(),
			title: evt.target['title'].value,
			amount: evt.target['amount'].value,
			date: evt.target['date'].value
		};
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/expenses', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		});

		if (resp.ok) {
			alert('new expense added successfully');
			location.reload();
		} else {
			throw 'new expenses added failed';
		}
	}

	const deleteHandler = async (expenseId) => {
		const value = confirm('Confirm to delete this listing?');
		if (value) {
			const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/expenses', {
				method: 'DELETE',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: getAccessTokenFromLocalStorage()
				},
				body: JSON.stringify({ id: Number(expenseId) })
			});
			if (resp.ok) {
				alert('Delete Successfully');
				location.reload();
			} else {
				alert('Failed');
			}
		}
	};

	let filteredYear = '2023';

	$: filteredExpenses = data.expenses.filter((expense) => {
		return new Date(expense.date).getFullYear().toString() === filteredYear;
	});

	const dropdownChangeHandler = (evt) => {
		filteredYear = evt.target.value;
	};
</script>

<div class="new-expense">
	<form on:submit={subtmitHandler}>
		<div class="new-expense__controls">
			<div class="new-expense__control">
				<label class="label" for="title">Title</label>
				<input name="title" type="text" />
			</div>
			<div class="new-expense__control">
				<label class="label" for="amount">Amount</label>
				<input name="amount" type="number" min="0.01" step="0.01" />
			</div>
			<div class="new-expense__control">
				<label class="label" for="date">Date</label>
				<input name="date" type="date" min="2021-01-01" max="2025-12-31" />
			</div>
		</div>
		<div class="new-expense__actions">
			<button type="submit">Add Expense</button>
		</div>
	</form>
</div>

<div class="expenses">
	<div class="expenses-filter">
		<div class="expenses-filter__control">
			<label class="label year-label-box" for="year-box">Filter by year</label>
			<select name="year-box" on:change={dropdownChangeHandler} value={filteredYear}>
				<option value="2025">2025</option>
				<option value="2024">2024</option>
				<option value="2023">2023</option>
				<option value="2022">2022</option>
				<option value="2021">2021</option>
			</select>
		</div>
	</div>
	{#if filteredExpenses.length === 0}
		<div class="owl-container">
			<img alt="owl-logo" src={owlLogo} class="owl-logo" />
			<p class="text-center text-xl text-red-500 phase-text">Oops ... No Expense Record Found</p>
		</div>
	{:else}
		<ul class="expenses-list">
			{#each filteredExpenses as expense}
				<li class="relative">
					<div class="expense-item card">
						<div class="expense-date">
							<div class="expense-date__month">
								{new Date(expense.date).toLocaleString('en-US', { month: 'long' })}
							</div>
							<div class="expense-date__year">
								{new Date(expense.date).toLocaleString('en-US', { year: 'numeric' })}
							</div>
							<div class="expense-date__day">
								{new Date(expense.date).toLocaleString('en-US', { day: '2-digit' })}
							</div>
						</div>
						<h2>{expense.title}</h2>
						<div class="expense-item__description">
							<div class="expense-item__price">{expense.amount}</div>
						</div>
					</div>
					<button
						class="absolute bottom-0 right-0 btn btn-xs btn-outline btn-error"
						on:click={() => {
							deleteHandler(expense.id);
						}}>Delete</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<Footer />

<style>
	.new-expense {
		background-color: #a892ee;
		padding: 1rem;
		margin: 2rem auto;
		margin-top: 100px;
		width: 50rem;
		max-width: 95%;
		border-radius: 12px;
		text-align: center;
		box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
	}

	.new-expense button {
		font: inherit;
		cursor: pointer;
		padding: 1rem 2rem;
		border: 1px solid #40005d;
		background-color: #40005d;
		color: white;
		border-radius: 12px;
		margin-right: 1rem;
	}

	.new-expense button:hover,
	.new-expense button:active {
		background-color: #510674;
		border-color: #510674;
	}
	.new-expense__controls {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 1rem;
		text-align: left;
	}

	.new-expense__control label {
		font-weight: bold;
		margin-bottom: 0.5rem;
		display: block;
	}

	.new-expense__control input {
		font: inherit;
		padding: 0.5rem;
		border-radius: 6px;
		border: 1px solid #ccc;
		width: 20rem;
		max-width: 100%;
	}

	.new-expense__actions {
		text-align: right;
	}
	.owl-container {
		margin-top: 200px;
		margin-bottom: 250px;
	}
	.owl-logo {
		margin: 80px 45% 0;
	}
	.expenses {
		padding: 1rem;
		background-color: rgb(31, 31, 31);
		margin: 2rem auto;
		width: 50rem;
		max-width: 95%;
	}
	.expenses-list {
		list-style: none;
		padding: 0;
	}
	.card {
		border-radius: 12px;
		box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
	}
	.expense-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
		margin: 1rem 0;
		background-color: #4b4b4b;
	}
	.expense-date {
		display: flex;
		flex-direction: column;
		width: 5.5rem;
		height: 5.5rem;
		border: 1px solid #ececec;
		background-color: #2a2a2a;
		color: white;
		border-radius: 12px;
		align-items: center;
		justify-content: center;
	}

	.expense-date__month {
		font-size: 0.8rem;
		font-weight: bold;
	}

	.expense-date__year {
		font-size: 0.8rem;
	}

	.expense-date__day {
		font-size: 1.5rem;
		font-weight: bold;
	}
	.expense-item__description {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-end;
		flex-flow: column-reverse;
		justify-content: flex-start;
		flex: 1;
	}

	h2 {
		color: #3a3a3a;
		font-size: 2rem;
		flex: 1;
		margin: 0 1rem;
		color: white;
	}

	.expense-item__price {
		font-size: 1.4rem;
		font-weight: bold;
		color: white;
		background-color: #40005d;
		border: 1px solid white;
		padding: 0.5rem;
		border-radius: 12px;
	}
	/* @media (min-width: 580px) {
		.expense-item__description {
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			flex: 1;
		}

		.expense-item__description h2 {
			font-size: 1.25rem;
		}

		.expense-item__price {
			font-size: 1.25rem;
			padding: 0.5rem 1.5rem;
		}
	} */

	.expenses-filter {
		padding: 0 1rem;
	}

	.expenses-filter__control {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		margin: 1rem 0;
	}

	.expenses-filter label {
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.expenses-filter select {
		font: inherit;
		padding: 0.5rem 3rem;
		font-weight: bold;
		border-radius: 6px;
	}

    .year-label-box {
        color: white;
    }
</style>
