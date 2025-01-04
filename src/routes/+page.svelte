<script>
	import { getAllPrizes, getPrizeById } from '$lib/prizes.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { goto } from '$app/navigation';
	import Logo from '$lib/images/logo.png';
	import Meteors from '@/lib/components/SpecialEffects/Meteors.svelte';
	import { onDestroy } from 'svelte';

	let prizeData = getAllPrizes();
	$: selectedIdPengundian = null;
	$: selectedItems = null;
	$: openDialog = false;
	$: prizeItems = {};

	const handleClickPengundian = (id) => {
		console.log(id, openDialog)
		selectedIdPengundian = id;
		prizeItems = getPrizeById(id)?.items;
		console.log('Selected prize:', prizeItems);
		openDialog = true;
	};

	onDestroy(() => {
		openDialog = false;
	});
</script>

<div class="flex h-screen flex-row justify-end p-24 z-80">
	<div class="mb-8 mt-12 flex w-[35vw] flex-col justify-between">
		<img src={Logo} alt="logo" />
		<div class="grid grid-cols-2 gap-5">
			{#each prizeData as prize, prizeid}
				<Button
					on:click={() => {
						handleClickPengundian(prizeid);
					}}>{prize.name}</Button
				>
			{/each}
			<Button variant="destructive">RESET</Button>
		</div>
	</div>
</div>

<AlertDialog.Root bind:open={openDialog}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title class="text-center">Pilih Hadiah</AlertDialog.Title>
		</AlertDialog.Header>
		<div class="flex flex-col items-center justify-center gap-5">
			{#if prizeItems && prizeItems.length > 0}
				{#each prizeItems as item, itemid}
					<a href={`/pengundian/${selectedIdPengundian}/${itemid}`} class="text-center">
						<Button>
							{item.name}
						</Button>
					</a>
				{/each}
			{:else}
				<p>No items available</p>
			{/if}
		</div>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Close</AlertDialog.Cancel>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<div class="w-screen h-screen fixed top-0 left-0" id="meteors">
	<Meteors number={30} />
</div>


<style>
	#meteors {
		pointer-events: none;
		z-index: -1;
	}
</style>
