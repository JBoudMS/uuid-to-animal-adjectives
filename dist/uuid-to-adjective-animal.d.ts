declare type AnimalAdjectiveFormat = "ADJECTIVE_ANIMAL" | "ADJECTIVE_ADJECTIVE_ANIMAL" | "ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL";
interface AnimalAdjectiveOptions {
    format?: AnimalAdjectiveFormat;
    includePokemon?: boolean;
}
declare const uuidToAnimalAdjective: (uuid: string, { format, includePokemon, }?: AnimalAdjectiveOptions) => string;
declare const randomAnimalAdjective: (options?: AnimalAdjectiveOptions) => {
    uuid: string;
    animalAdjective: string;
};

export { AnimalAdjectiveFormat, AnimalAdjectiveOptions, randomAnimalAdjective, uuidToAnimalAdjective };
