<script>
	import PulsatingButton from '@/lib/components/PulsatingButton.svelte';
	import {
		getAvailablePeople,
		itemIdStore,
		itemStore,
		prizeIdStore,
		setWinners,
		stateStore,
		winnerNameGet,
		winnerNameSet,
		getWinners
	} from '@/lib/components/store/generatePrizeStore';
	import { Button } from '@/lib/components/ui/button';
	import { onDestroy } from 'svelte';

	let randPeople = [];
	let shuffleTimeout = false;

	const randommulainame = ['GASSSS', 'HAJARRR', 'SIKAAAAAAATTTT', 'LETS GO'];

	itemStore.subscribe((value) => {
		if (!value) return;
		randPeople = getAvailablePeople();
	});

	const shuffleNames = () => {
		stateStore.set('shuffling');
		shuffleTimeout = setTimeout(() => {
			if ($stateStore !== 'shuffling') return;
			randPeople = randPeople.sort(() => Math.random() - 0.5);
			shuffleNames();
		}, 100);
	};

	const stopShuffle = () => {
		clearTimeout(shuffleTimeout);
		stateStore.set('result');
		if (!getWinners()?.[$prizeIdStore]?.items?.[$itemIdStore]?.winner) {
			setWinners($prizeIdStore, $itemIdStore, randPeople.slice(0, $itemStore.quantity));
			winnerNameSet(randPeople.slice(0, $itemStore.quantity));
		}
	};

	stateStore.subscribe((value) => {
		console.log(`state on change`, value);
	});

	onDestroy(() => {
		stopShuffle();
	});
</script>

<div class="flex flex-row items-center justify-center">
	<div class="flex flex-col gap-5">
		{#if $stateStore == 'shuffling'}
			{#if randPeople.length > 0}
				{#each Array.from({ length: $itemStore.quantity }) as _, i}
					<div>
						<p class="text-center text-xl font-bold">{randPeople[i]?.name}</p>
					</div>
				{/each}
			{/if}
		{:else if $stateStore == 'result'}
			{#each getWinners()[$prizeIdStore]?.items[$itemIdStore]?.winner as winner}
				<div>
					<p class="text-center text-xl font-bold">{winner.name}</p>
				</div>
			{/each}
		{/if}
	</div>
</div>

<div class="mt-12 flex flex-row items-center justify-center gap-5">
	{#if $stateStore == 'blank'}
		<Button variant="secondary" on:click={() => shuffleNames()}
			>{randommulainame.sort(() => Math.random() - 0.5)[0]}</Button
		>
	{/if}

	{#if $stateStore == 'shuffling'}
		<Button variant="destructive" on:click={() => stopShuffle()}>HOPPPP</Button>
	{/if}
</div>
