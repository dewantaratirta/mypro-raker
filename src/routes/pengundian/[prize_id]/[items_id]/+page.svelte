<script>
	import { page } from '$app/stores';
	import { getItem, getPrizeById } from '@/lib/prizes';
	import Prevnext from './components/prevnext.svelte';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import Button from '@/lib/components/ui/button/button.svelte';
	import Meteors from '@/lib/components/SpecialEffects/Meteors.svelte';
	import GradualSpacing from '@/lib/components/SpecialEffects/GradualSpacing.svelte';
	import { getRandomPeople } from '@/lib/people';
	import GeneratePrize from './components/generatePrize.svelte';
	import { itemIdStore, itemStore, prizeIdStore, prizeStore, stateStore } from '@/lib/components/store/generatePrizeStore';

	stateStore.set('blank');

	onMount(() => {
		page.subscribe((value) => {
			stateStore.set('blank');

			prizeIdStore.set(parseInt(value.params?.prize_id || 0));
			itemIdStore.set(parseInt(value.params?.items_id || 0));

			if ($prizeIdStore === undefined || $itemIdStore === undefined) {
				return;
			}

			prizeStore.set(getPrizeById($prizeIdStore));
			itemStore.set(getItem($prizeIdStore, $itemIdStore));
		});
	});

	onDestroy(() => {
		// page?.unsubscribe();
	});
</script>

<div class="z-80 flex h-screen flex-col p-24">
	<Prevnext />

	<div class="flex flex-col items-center justify-center">
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
			<a href="/">
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
