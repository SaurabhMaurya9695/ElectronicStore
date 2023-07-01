# LoginWithGoogle

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

to configure google authentication you have to create a project in angular 
then add the dependency of "npm i @abacritt/angularx-social-login --legacy-peer-deps" in your project
and follow this link and read doc "https://github.com/abacritt/angularx-social-login"
and add the imports in app.module file.. same as it is in document..
but for client id you have to take it from backend .. app.properties.

to create a button "<asl-google-signin-button type='icon' size='medium'></asl-google-signin-button>"
and you also have to add the dependency for this button in app.module