import prize from './prize.json';

export const getAllPrizes = () => {
    return prize;
}

export const getPrizeById = (id) => {
    return prize[id];
}

export const getItem = (id_prize, id_item) => {
    return prize[id_prize].items[id_item];
};