# uuid-to-animal-adjective
This package generates a consistent adjective + animal combination for a given UUID.

# Consistency
This will always return the same output for the same input. It works by parsing the 128 bit UUID into 4 x 32 bit integers, then using that to select the adjective and animal combination for the given format.

# Uniqueness/collision resistance

This library supports four levels of collision resistance, based on how many adjectives you choose to add before the animal.

This has 1,814 unique adjectives and 574 animals. If you choose to enable Pokémon (disabled by default), that adds an additional 905 "animals" to the collection.

Without the Pokémon there are:
- 1,041,236 unique ADJECTIVE_ANIMALS
- 1,888,802,104 unique ADJECTIVE_ADJECTIVE_ANIMALS
- 3,426,287,016,656 unique ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMALS

With the Pokémon there are:
- 2,682,906 unique ADJECTIVE_ANIMALS
- 4,866,791,484 unique ADJECTIVE_ADJECTIVE_ANIMALS
- 8,828,359,751,976 unique ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMALS

## Collision rates

We have tests testing the Actual collision avoidance rate vs the expected collision rate. The following is the result of one of the test runs. Total duplicates is the total amount of UUIDs that collided, unique duplicates tracks how many different names collided. e.g., if `Abandoned Emu` is used by three different UUIDs, that would be three total duplicates and 1 unique duplicate.

**Note:** This is one run, it is not statistically significant. 

### ADJECTIVE_ANIMAL
#### No Pokémon

| Number of names generated | Total duplicates | Unique duplicates | Targeted collision avoidance rate | Actual collision avoidance rate |
| :---: 					| :---: | :---:|:---:|---:|
|  100   					|         0          |        0         |    1     |    1    |
|  1000  |         6          |        3         |   0.99   |  0.994  |
| 10,000  |        420         |       209        |   0.95   |  0.958  |
| 100,000 |       31,669        |      14,808       |   0.65   | 0.68331 |

#### Pokémon

| Number of names generated | Total duplicates | Unique duplicates | Targeted collision avoidance rate | Actual collision avoidance rate |
| :---: 					| :---: | :---:|:---:|---:|
|  100   |         0          |        0         |    1     |    1    |
|  1000  |         0          |        0         |    1   |    1    |
| 10,000  |         92         |        46        |   0.99   | 0.9908  |
| 100,000 |        8,795        |       4,327       |   .9   | 0.91205 |

### ADJECTIVE_ADJECTIVE_ANIMAL
#### No Pokémon
| Number of names generated | Total duplicates | Unique duplicates | Targeted collision avoidance rate | Actual collision avoidance rate |
| :---: 					| :---: | :---:|:---:|---:|
|   100   |         0          |        0         |    1     |    1     |
|  1000   |         0          |        0         |    1     |    1     |
|  10,000  |         0          |        0         |    1     |    1     |
| 100,000  |         42         |        21        |  0.999   | 0.99958  |
| 1,000,000 |        4,059        |       2,029       |   0.99   | 0.995941 |

#### Pokémon
| Number of names generated | Total duplicates | Unique duplicates | Targeted collision avoidance rate | Actual collision avoidance rate |
| :---: 					| :---: | :---:|:---:|---:|
|   100   |         0          |        0         |    1     |    1     |
|  1000   |         0          |        0         |    1     |    1     |
|  10,000  |         0          |        0         |    1     |    1     |
| 100,000  |         10         |        5         |  0.999   |  0.9999  |
| 1,000,000 |        1,022        |       511        |   0.99   | 0.998978 |

### ADJECTIVE_ADJECTIVE_ADJECTIVE_ANIMAL
#### No Pokémon
| Number of names generated | Total duplicates | Unique duplicates | Targeted collision avoidance rate | Actual collision avoidance rate |
| :---: 					| :---: | :---:|:---:|---:|
|   100   |         0          |        0         |    1     |   1    |
|  1000   |         0          |        0         |    1     |   1    |
|  10,000  |         0          |        0         |    1     |   1    |
| 100,000  |         0          |        0         |    1     |   1    |
| 1,000,000 |         0          |        0         |  0.9999  |   1    |

#### Pokemon
| Number of names generated | Total duplicates | Unique duplicates | Targeted collision avoidance rate | Actual collision avoidance rate |
| :---: 					| :---: | :---:|:---:|---:|
|   100   |         0          |        0         |    1     |    1     |
|  1000   |         0          |        0         |    1     |    1     |
| 10,000  |         0          |        0         |    1     |    1     |
| 100,000  |         0          |        0         |    1     |    1     |
| 1,000,000 |         2          |        1         |  0.9999  | 0.999998 |
