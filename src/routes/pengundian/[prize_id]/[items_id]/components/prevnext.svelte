<script>
	import { goto } from '$app/navigation';
	import { getItem, getPrizeById } from '@/lib/prizes';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { itemIdStore, itemStore, prizeStore, prizeIdStore } from '@/lib/components/store/generatePrizeStore';

	let allItems = [];
	let prevItem = null;
	let nextItem = null;

	onMount(() => {
		// page.subscribe((value) => {
		// 	prize_id = parseInt(value.params.prize_id);
		// 	items_id = parseInt(value.params.items_id);

		// 	let prize = getPrizeById(prize_id);
		// 	prevItem = prize?.items[items_id - 1] ?? null;
		// 	nextItem = prize?.items[items_id + 1] ?? null;
		// });
		// prizeIdStore.subscribe((value) => {
		// 	allItems = getPrizeById(value).items;
		// 	console.log(allItems);
		// 	console.log(`item id store`, $itemIdStore);
		// });
		// console.log($prizeIdStore, $itemIdStore);

		itemStore.subscribe((value) => {
			allItems = $prizeStore?.items;

			if($itemIdStore - 1 >= 0) {
				prevItem = allItems[$itemIdStore - 1];
			} else {
				prevItem = null;
			}

			if(allItems && ($itemIdStore + 1 < allItems.length)) {
				nextItem = allItems[$itemIdStore + 1];
			} else {
				nextItem = null;
			}
		});
	});

	onDestroy(() => {
		// page.unsubscribe();
	});

	const handleLink = (items_id) => {
		goto(`/pengundian/${$prizeIdStore}/${items_id}`, { replaceState: true });
	};
</script>

<div class="flex flex-row justify-between gap-5">
	{#if prevItem}
		<button
			on:click={() => {
				handleLink($itemIdStore - 1);
			}}
		>
			<i class="fa-solid fa-chevron-left text-white"></i>
			<span>
				{prevItem.name}
			</span>
		</button>
	{:else}
		<div></div>
	{/if}

	{#if nextItem}
		<button
			on:click={() => {
				handleLink($itemIdStore + 1);
			}}
		>
			<span>
				{nextItem.name}
			</span>
			<i class="fa-solid fa-chevron-right text-white"></i>
		</button>
	{/if}
</div>

<style>
</style>
