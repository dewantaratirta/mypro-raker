<script>
	import { getAllPrizes, getPrizeById } from '$lib/prizes.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { goto } from '$app/navigation';

	let prizeData = getAllPrizes();
	$: selectedIdPengundian = null;
	$: selectedItems = null;
	$: openDialog = false;
	$: prizeItems = {};

	const handleClickPengundian = (id) => {
		selectedIdPengundian = id;
		prizeItems = getPrizeById(id)?.items;
		console.log('Selected prize:', prizeItems);
		openDialog = true;
	};
</script>

<div class="flex h-screen flex-col items-center justify-center gap-5">
	{#each prizeData as prize, prizeid}
		<Button
			on:click={() => {
				handleClickPengundian(prizeid);
			}}>{prize.name}</Button
		>
	{/each}
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
