import { getAllPeople, getRandomPeople } from '@/lib/people';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { getAllPrizes } from '@/lib/prizes';

export const itemIdStore = writable(0);
export const itemStore = writable([]);
export const prizeStore = writable([]);
export const prizeIdStore = writable(0);
export const stateStore = writable('blank');


export const winnerStore = writable([]);

export const winnerNameGet = () => {
    if(!browser) return [];
    let x = localStorage?.getItem('winnerName');
    if(!x){
        localStorage?.setItem('winnerName', JSON.stringify([]));
        return [];
    }
    return JSON.parse(x);
};

export const winnerNameSet = (names) => {
    if(!browser) return;
    let x = winnerNameGet();
    let arr = [...x, ...names];
    localStorage?.setItem('winnerName', JSON.stringify(arr));
};

export const getAvailablePeople = () => {
    let winnername = winnerNameGet();
    if(winnername.length == 0){
        return getAllPeople();
    }
    let all = getAllPeople();
    //filter all people that are not in winnername
    let winnerid = winnername.map(x => x.id);
    let available = all.filter(item => !winnerid.includes(item.id));
    return available;
}

export const getWinners = () => {
    if(!browser) return [];
    let x = localStorage?.getItem('winners');
    if(!x){
        let prize = getAllPrizes();
        localStorage?.setItem('winners', JSON.stringify(prize));
        return prize;
    }
    return JSON.parse(x);
}

export const setWinners = (prizeid, itemsid, winners) => {
    if(!browser) return;
    let x = getWinners();
    x[prizeid].items[itemsid].winner = winners;
    localStorage?.setItem('winners', JSON.stringify(x));
};


export const resetWinners = () => {
    if(!browser) return;
    let x = getAllPrizes();
    localStorage?.setItem('winners', JSON.stringify(x));
    localStorage?.setItem('winnerName', JSON.stringify([]));
};