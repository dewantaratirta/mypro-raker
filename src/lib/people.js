import people from './people.json';

export const getAllPeople = () => {
    return people;
}

export const getPeopleById = (id) => {
    return people.find(person => person.id === id);
}

export const getRandomPeople = (count) => {
    return people.sort(() => 0.5 - Math.random()).slice(0, count);
}