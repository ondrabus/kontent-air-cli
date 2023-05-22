# KontentAir CLI project

## Installation

```sh
npm i
```

## Setup

Before you run your migrations, you need to store some information about the environment locally. 

The environment is defined as a named pair of values. For example, "DEV" environment can be defined as a pair of a specific project ID and Management API key. This named pair of values is stored within your local repository in a configuration file named `.environments.json`.

```sh
# Adds a 'DEV' environment reference.
kontent environment add --name DEV --project-id "<YOUR_PROJECT_GUID>" --api-key "<YOUR_MANAGAMENT_API_KEY>"
```

## Usage

If you've set up an environment using the method above, you can use the prepared scripts to run all migrations in the `Migrations` directory.

```sh
# Executes all migration scripts in the 'Migrations' folder to the 'DEV' environment reference within your Kontent project. 
npm run migrate:all
```

If you want to run a specific migration you can use also script defined in ```packages.json```

```sh
# Executes a migration script named 'my_migration'.
npm run migrate "my_migration"
```

**Tip**: For more information about Kontent migrations, see the [Kontent.ai CLI documentation](https://github.com/kontent-ai/cli/blob/master/README.md).

## Feedback & Contribution

Feedback & Contributions are welcomed. Feel free to take/start an issue & submit PR.
