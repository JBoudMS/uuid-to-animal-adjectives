import { v4 } from "uuid";
import {
	uuidToAnimalAdjective,
	AnimalAdjectiveFormat,
	randomAnimalAdjective,
} from "../uuid-to-adjective-animal";

const generateUuidToAnimalAdjectiveUniqueRateAndDuplicates = (
	length: number,
	format: AnimalAdjectiveFormat,
	includePokemon: boolean
) => {
	const duplicates = Object.values(
		Array.from({ length })
			.map(() => randomAnimalAdjective({ format, includePokemon }))
			.reduce(
				(
					aggregated: {
						[key: string]: {
							uuid: string;
							animalAdjective: string;
						}[];
					},
					{ uuid, animalAdjective }
				) => {
					const existing = aggregated[animalAdjective] ?? [];
					aggregated[animalAdjective] = [
						...existing,
						{ uuid, animalAdjective },
					];
					return aggregated;
				},
				{}
			)
	).filter((val) => val.length > 1);
	const amountOfDuplicates = duplicates.reduce(
		(total, duplicate) => (total += duplicate.length),
		0
	);
	const uniqueRate = (length - amountOfDuplicates) / length;
	// console.log(`${length.toLocaleString()} animal names generated ${amountOfDuplicates.toLocaleString()} duplicates across ${duplicates.length.toLocaleString()} adjective animals using ${format}. Unique rate: ${uniqueRate * 100}%`);
	return { uniqueRate, duplicates, amountOfDuplicates };
};

interface ExpectedRandomness {
	length: number;
	greaterThanOrEqual: number;
	logDuplicates?: boolean;
}
const testFormat = (
	expectedRandomness: ExpectedRandomness[],
	format: AnimalAdjectiveFormat,
	includePokemon: boolean
) => {
	const results = expectedRandomness.reduce(
		(
			total: {
				[key: string]: {
					length: number;
					expected: number;
					actual: number;
					amountOfDuplicates: number;
					uniqueDuplicates: number;
				};
			},
			{ length, greaterThanOrEqual, logDuplicates }
		) => {
			const { uniqueRate, duplicates, amountOfDuplicates } =
				generateUuidToAnimalAdjectiveUniqueRateAndDuplicates(
					length,
					format,
					includePokemon
				);
			if (logDuplicates) {
				console.table(
					duplicates.reduce(
						(
							animalToUUIDs: { [key: string]: string[] },
							duplicates
						) => {
							return {
								...animalToUUIDs,
								...duplicates.reduce(
									(agg, { uuid, animalAdjective }) => {
										agg[animalAdjective] = [
											...(agg[animalAdjective] ?? []),
											uuid,
										];
										return agg;
									},
									{}
								),
							};
						},
						{}
					)
				);
			}
			total[`${format} ${includePokemon ? "Pokémon " : ""}${length}`] = {
				length,
				amountOfDuplicates,
				uniqueDuplicates: duplicates.length,
				expected: greaterThanOrEqual,
				actual: uniqueRate,
			};
			return total;
		},
		{}
	);
	console.table(results);
	Object.values(results).map(({ expected, actual, length }) => {
		it(`should be at least ${
			expected * 100
		}% for ${length.toLocaleString()}`, () => {
			expect(actual).toBeGreaterThanOrEqual(expected);
		});
	});
};

describe("When transforming uuids into adjectives", () => {
	describe("it should be consistent", () => {
		it('should always convert "be6c5f77-411b-4a1f-8564-afe1e1cef66c" into the same result', () => {
			expect(
				uuidToAnimalAdjective("be6c5f77-411b-4a1f-8564-afe1e1cef66c", {
					format: "ADJECTIVE_ANIMAL",
					includePokemon: false,
				})
			).toEqual("Economic Hoopoe");
			expect(
				uuidToAnimalAdjective("be6c5f77-411b-4a1f-8564-afe1e1cef66c", {
					format: "ADJECTIVE_ANIMAL",
					includePokemon: true,
				})
			).toEqual("Economic Jigglypuff");
			expect(
				uuidToAnimalAdjective("be6c5f77-411b-4a1f-8564-afe1e1cef66c", {
					format: "ADJECTIVE_ADJECTIVE_ANIMAL",
					includePokemon: false,
				})
			).toEqual("Economic Ill-fated Falcon");
			expect(
				uuidToAnimalAdjective("be6c5f77-411b-4a1f-8564-afe1e1cef66c", {
					format: "ADJECTIVE_ADJECTIVE_ANIMAL",
					includePokemon: true,
				})
			).toEqual("Economic Ill-fated Crocodile");
			expect(
				uuidToAnimalAdjective("be6c5f77-411b-4a1f-8564-afe1e1cef66c", {
					format: "ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL",
					includePokemon: false,
				})
			).toEqual("Cagey Clever Fair Falcon");
			expect(
				uuidToAnimalAdjective("be6c5f77-411b-4a1f-8564-afe1e1cef66c", {
					format: "ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL",
					includePokemon: true,
				})
			).toEqual("Cagey Clever Fair Crocodile");
		});
		it('should always convert "34bb8aac-5826-4d12-a634-5146d6207b4a" into the same result', () => {
			expect(
				uuidToAnimalAdjective("34bb8aac-5826-4d12-a634-5146d6207b4a", {
					format: "ADJECTIVE_ANIMAL",
					includePokemon: false,
				})
			).toEqual("Unsuitable Dinosaur");
			expect(
				uuidToAnimalAdjective("34bb8aac-5826-4d12-a634-5146d6207b4a", {
					format: "ADJECTIVE_ANIMAL",
					includePokemon: true,
				})
			).toEqual("Unsuitable Shieldon");
			expect(
				uuidToAnimalAdjective("34bb8aac-5826-4d12-a634-5146d6207b4a", {
					format: "ADJECTIVE_ADJECTIVE_ANIMAL",
					includePokemon: false,
				})
			).toEqual("Unsuitable Boring Nightingale");
			expect(
				uuidToAnimalAdjective("34bb8aac-5826-4d12-a634-5146d6207b4a", {
					format: "ADJECTIVE_ADJECTIVE_ANIMAL",
					includePokemon: true,
				})
			).toEqual("Unsuitable Boring Pyroar");
			expect(
				uuidToAnimalAdjective("34bb8aac-5826-4d12-a634-5146d6207b4a", {
					format: "ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL",
					includePokemon: false,
				})
			).toEqual("Acceptable Ubiquitous Defective Nightingale");
			expect(
				uuidToAnimalAdjective("34bb8aac-5826-4d12-a634-5146d6207b4a", {
					format: "ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL",
					includePokemon: true,
				})
			).toEqual("Acceptable Ubiquitous Defective Pyroar");
		});
		it('should always convert "fb827c75-5c16-4e9f-9d5f-57a4330dcafc" into the same result', () => {
			expect(
				uuidToAnimalAdjective("fb827c75-5c16-4e9f-9d5f-57a4330dcafc", {
					format: "ADJECTIVE_ANIMAL",
					includePokemon: false,
				})
			).toEqual("Impressionable Crane");
			expect(
				uuidToAnimalAdjective("fb827c75-5c16-4e9f-9d5f-57a4330dcafc", {
					format: "ADJECTIVE_ANIMAL",
					includePokemon: true,
				})
			).toEqual("Impressionable Magpie");
			expect(
				uuidToAnimalAdjective("fb827c75-5c16-4e9f-9d5f-57a4330dcafc", {
					format: "ADJECTIVE_ADJECTIVE_ANIMAL",
					includePokemon: false,
				})
			).toEqual("Impressionable Strange Porcupine");
			expect(
				uuidToAnimalAdjective("fb827c75-5c16-4e9f-9d5f-57a4330dcafc", {
					format: "ADJECTIVE_ADJECTIVE_ANIMAL",
					includePokemon: true,
				})
			).toEqual("Impressionable Strange Mightyena");
			expect(
				uuidToAnimalAdjective("fb827c75-5c16-4e9f-9d5f-57a4330dcafc", {
					format: "ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL",
					includePokemon: false,
				})
			).toEqual("Fast Clever Omniscient Porcupine");
			expect(
				uuidToAnimalAdjective("fb827c75-5c16-4e9f-9d5f-57a4330dcafc", {
					format: "ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL",
					includePokemon: true,
				})
			).toEqual("Fast Clever Omniscient Mightyena");
		});
	});
	describe("it should support a certain amount of randomness in ADJECTIVE_ANIMAL without Pokémon", () => {
		testFormat(
			[
				{ length: 100, greaterThanOrEqual: 1 },
				{ length: 1000, greaterThanOrEqual: 0.99 },
				{ length: 10000, greaterThanOrEqual: 0.95 },
				{ length: 100000, greaterThanOrEqual: 0.65 },
			],
			"ADJECTIVE_ANIMAL",
			false
		);
	});
	describe("it should support a certain amount of randomness in ADJECTIVE_ADJECTIVE_ANIMAL without Pokémon", () => {
		testFormat(
			[
				{ length: 100, greaterThanOrEqual: 1 },
				{ length: 1000, greaterThanOrEqual: 1 },
				{ length: 10000, greaterThanOrEqual: 1 },
				{ length: 100000, greaterThanOrEqual: 0.999 },
				{ length: 1000000, greaterThanOrEqual: 0.99 },
			],
			"ADJECTIVE_ADJECTIVE_ANIMAL",
			false
		);
	});
	describe("it should support a certain amount of randomness in ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL without Pokémon", () => {
		testFormat(
			[
				{ length: 100, greaterThanOrEqual: 1 },
				{ length: 1000, greaterThanOrEqual: 1 },
				{ length: 10000, greaterThanOrEqual: 1 },
				{ length: 100000, greaterThanOrEqual: 1 },
				{
					length: 1000000,
					greaterThanOrEqual: 0.9999,
					logDuplicates: true,
				},
			],
			"ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL",
			false
		);
	});
	describe("it should support a certain amount of randomness in ADJECTIVE_ANIMAL with Pokémon", () => {
		testFormat(
			[
				{ length: 100, greaterThanOrEqual: 1 },
				{ length: 1000, greaterThanOrEqual: 0.99 },
				{ length: 10000, greaterThanOrEqual: 0.95 },
				{ length: 100000, greaterThanOrEqual: 0.65 },
			],
			"ADJECTIVE_ANIMAL",
			true
		);
	});
	describe("it should support a certain amount of randomness in ADJECTIVE_ADJECTIVE_ANIMAL with Pokémon", () => {
		testFormat(
			[
				{ length: 100, greaterThanOrEqual: 1 },
				{ length: 1000, greaterThanOrEqual: 1 },
				{ length: 10000, greaterThanOrEqual: 1 },
				{ length: 100000, greaterThanOrEqual: 0.999 },
				{ length: 1000000, greaterThanOrEqual: 0.99 },
			],
			"ADJECTIVE_ADJECTIVE_ANIMAL",
			true
		);
	});
	describe("it should support a certain amount of randomness in ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL with Pokémon", () => {
		testFormat(
			[
				{ length: 100, greaterThanOrEqual: 1 },
				{ length: 1000, greaterThanOrEqual: 1 },
				{ length: 10000, greaterThanOrEqual: 1 },
				{ length: 100000, greaterThanOrEqual: 1 },
				{
					length: 1000000,
					greaterThanOrEqual: 0.9999,
					logDuplicates: true,
				},
			],
			"ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL",
			true
		);
	});
});
