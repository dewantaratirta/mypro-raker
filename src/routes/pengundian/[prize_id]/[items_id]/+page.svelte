<script>
    import { page } from '$app/stores';
	import { getItem, getPrizeById } from '@/lib/prizes';

    const prize_id = $page.params.prize_id;
    const items_id = $page.params.items_id;

    const prize = getPrizeById(prize_id);
    const item = getItem(prize_id, items_id);

    console.log(item);
</script>

<h4>
    {prize.name}
</h4>

<h4>
    {item.name}
</h4>
