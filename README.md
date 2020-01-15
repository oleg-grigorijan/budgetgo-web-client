# BudgetGO Web Client
**BudgetGO** is an application for personal and shared budget control. It stores information about users incomes and outcomes.

## Backend Server
See **[BudgetGO REST Server](https://github.com/oleg-grigorijan/budgetgo)**.

## Updating i18n files:
Run the command in the project root directory:
```shell
npm run extract-i18n
```

## Building
Run the command in the project root directory
```shell
npm run build
```
The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running development server
Run the service with English language configuration and navigate to `http://localhost:4200/`:
```shell
npm run start-en
```
Or run the service with Russian language configuration and navigate to `http://localhost:4201/`:
```shell
npm run start-ru
```
The app will automatically reload if you change any of the source files.

