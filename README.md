# Pokedex

## Description

This repository is a Pokedex application inspired by the design found on Dribbble. The project showcases the use of APIs to fetch and display information about Pokémon.

## Features

- Display a list of Pokémon.
- Show details of individual Pokémon.
- Search for Pokémon.

## Technologies Used

- JavaScript
- Fetch API for HTTP requests
- HTML and CSS for the application's structure and styling

## API Used

The application utilizes [PokeAPI](https://pokeapi.co/api/v2/pokemon) to fetch data about Pokémon. The API supports read operations with the `GET` method.

### Example Request

To fetch information about a specific Pokémon, you can make a request to:

```
https://pokeapi.co/api/v2/pokemon/{id}
```

Replace `{id}` with the Pokémon's identifier.

## Setup and Usage

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:
    ```bash
    cd pokedex
    ```

3. Open the `index.html` file in a web browser to view the application.
