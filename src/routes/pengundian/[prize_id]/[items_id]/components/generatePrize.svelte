<script>
	import { getAvailablePeople, itemIdStore, itemStore, prizeIdStore, setWinners, stateStore, winnerNameGet, winnerNameSet, getWinners } from '@/lib/components/store/generatePrizeStore';
	import { Button } from '@/lib/components/ui/button';
	import { onDestroy } from 'svelte';

	let randPeople = [];
    let shuffleTimeout = false;


	itemStore.subscribe((value) => {
		if (!value) return;
		randPeople = getAvailablePeople();
	});

	const shuffleNames = () => {
        stateStore.set('shuffling');
		shuffleTimeout = setTimeout(() => {
            if($stateStore !== 'shuffling') return;
			randPeople = randPeople.sort(() => Math.random() - 0.5);
            console.log(randPeople);
            shuffleNames();
		}, 100);
	};

    const stopShuffle = () => {
        clearTimeout(shuffleTimeout);
        if(!getWinners()?.[$prizeIdStore]?.items?.[$itemIdStore]?.winner) {
            setWinners($prizeIdStore, $itemIdStore, randPeople.slice(0, $itemStore.quantity));
            winnerNameSet(randPeople.slice(0, $itemStore.quantity));
        }
    };

    onDestroy(() => {
        stopShuffle();
    });
</script>

<div class="flex flex-row items-center justify-center">
	{#if $stateStore != 'blank'}
		<div class="flex flex-col gap-5">
			{#if randPeople.length > 0}
                {#each Array.from({ length: $itemStore.quantity }) as _, i}
                    <div>
                        <p class="text-sm text-center font-semibold">{randPeople[i]?.name}</p>
                    </div>
                {/each}
			{/if}
		</div>
	{/if}

	{#if $stateStore == 'blank'}
		<Button variant="secondary" on:click={() => shuffleNames()}>Generate</Button>
	{/if}
	{#if $stateStore == 'shuffling'}
		<Button variant="secondary" on:click={() => stopShuffle()}>Stop</Button>
	{/if}
</div>
