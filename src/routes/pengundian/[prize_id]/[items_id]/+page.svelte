<script>
	import { page } from '$app/stores';
	import { getItem, getPrizeById } from '@/lib/prizes';
	import Prevnext from './components/prevnext.svelte';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import Button from '@/lib/components/ui/button/button.svelte';
	import Meteors from '@/lib/components/SpecialEffects/Meteors.svelte';
	import GeneratePrize from './components/generatePrize.svelte';
	import {
		getWinners,
		itemIdStore,
		itemStore,
		prizeIdStore,
		prizeStore,
		stateStore
	} from '@/lib/components/store/generatePrizeStore';

	// onMount(() => {
	page.subscribe((value) => {
		console.log('===pagesubscribe')
		stateStore.set('blank');

		prizeIdStore.set(parseInt(value.params?.prize_id || 0));
		itemIdStore.set(parseInt(value.params?.items_id || 0));

		if ($prizeIdStore === undefined || $itemIdStore === undefined) {
			return;
		}
	});

	itemIdStore.subscribe((value) => {
		// check if there is any winners
		let w = getWinners();
		// stateStore.set('blank');
		console.log('===itemidstoresubscrive', $stateStore, 'prizeIdStore', $prizeIdStore, 'itemIdStore', $itemIdStore);
		if (!!w[$prizeIdStore]?.items[$itemIdStore]?.winner) {
			console.log('>>>>>>>>>>>>>>>>>>',w[$prizeIdStore]?.items[$itemIdStore]?.winner);
			stateStore.set('result');
		}

		prizeStore.set(getPrizeById($prizeIdStore));
		itemStore.set(getItem($prizeIdStore, $itemIdStore));
	});

	onDestroy(() => {
		prizeIdStore.set(null);
		itemIdStore.set(null);
		// stateStore.set('blank');
		// page?.unsubscribe();
	});
</script>

<div class="z-80 flex h-screen flex-col p-24">
	<Prevnext />

	<div class="mb-12 flex flex-col items-center justify-center">
		<h2 class="mb-2 text-2xl font-semibold">
			{$prizeStore?.name}
		</h2>
		<h1 class="font-display text-center text-5xl font-bold text-black dark:text-white">
			{$itemStore?.name}
		</h1>
	</div>
	<GeneratePrize />

	<div class="fixed bottom-0 left-0 w-full bg-black bg-opacity-50 px-24 py-5">
		<div class="flex">
			<a data-sveltekit-reload href="/" >
				<Button variant="outline" class="border-white bg-transparent">
					<i class="fa-solid fa-house me-2 text-white"></i>
					BACK</Button
				>
			</a>
		</div>
	</div>
</div>

<div class="fixed left-0 top-0 h-screen w-screen" id="meteors">
	<Meteors number={30} />
</div>

<style>
	#meteors {
		pointer-events: none;
		z-index: -1;
	}
</style>
