import { parse, v4 } from "uuid";

import { animals } from "./animals";
import { adjectives } from "./adjectives";
import { pokemon } from "./pokemon";

const animalsAndPokemon = [...animals, ...pokemon];

const uuidToIntegerArray = (uuid: string): [number, number, number, number] => {
	const uuidBytes = parse(uuid) as Uint8Array;
	const view = new DataView(uuidBytes.buffer);
	return [
		view.getUint32(0),
		view.getUint32(4),
		view.getUint32(8),
		view.getUint32(12),
	];
};

const indexToAdjective = (adjectiveIndex: number) =>
	adjectives[adjectiveIndex % adjectives.length];
const indexToAnimal = (animalIndex: number, includePokemon: boolean) =>
	includePokemon
		? animalsAndPokemon[animalIndex % animalsAndPokemon.length]
		: animals[animalIndex % animals.length];

export type AnimalAdjectiveFormat =
	| "ADJECTIVE_ANIMAL"
	| "ADJECTIVE_ADJECTIVE_ANIMAL"
	| "ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL";

export interface AnimalAdjectiveOptions {
	format?: AnimalAdjectiveFormat;
	includePokemon?: boolean;
}

const uuidToAnimalAdjective = (
	uuid: string,
	{
		format = "ADJECTIVE_ANIMAL",
		includePokemon = false,
	}: AnimalAdjectiveOptions = {}
) => {
	const [partOne, partTwo, partThree, partFour] = uuidToIntegerArray(uuid);
	switch (format) {
		case "ADJECTIVE_ANIMAL": {
			return `${indexToAdjective(partOne + partTwo)} ${indexToAnimal(
				partThree + partFour,
				includePokemon
			)}`;
		}
		case "ADJECTIVE_ADJECTIVE_ANIMAL": {
			return `${indexToAdjective(partOne + partTwo)} ${indexToAdjective(
				partTwo + partThree
			)} ${indexToAnimal(partFour, includePokemon)}`;
		}
		case "ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL": {
			return `${indexToAdjective(partOne)} ${indexToAdjective(
				partTwo
			)} ${indexToAdjective(partThree)} ${indexToAnimal(
				partFour,
				includePokemon
			)}`;
		}
		default: {
			return `${indexToAdjective(partOne + partTwo)} ${indexToAnimal(
				partThree + partFour,
				includePokemon
			)}`;
		}
	}
};

const randomAnimalAdjective = (options?: AnimalAdjectiveOptions) => {
	const uuid = v4();
	return { uuid, animalAdjective: uuidToAnimalAdjective(uuid, options) };
};

export { uuidToAnimalAdjective, randomAnimalAdjective };
