# ManagementSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Install Angular/cli

To install `angular/cli` we are using version `~15.2.2`, run
```shell
  npm install -g @angular/cli@~15.2.2
```

## Build the environment

```shell
  npm install
  ng build
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test --code-coverage` to execute the unit tests via [Karma](https://karma-runner.github.io), you can also check [Angular Testing](https://angular.io/guide/testing)

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Structure

The project has been split into 2 major parts: shared and modules and a core

## Core
the core of the application is the app component with its accessories, from store, module, routingModule.
    -component: the actual component that holds the routeroutlet 
    -store:holds all the intial getter such as reducers, states,tokens, and initializes the reducerToken that needs to be provided in the app module
    -module file: loads all the modules and files that will be used in this application,and loads indexedDB and NGRX stores and effects
    -routingModule: implements lazy loading on modules, and stand alone components
    -style.scss: holds the theme of the application and any global styling needed to be implemented or any repetitive styling that can be extended by other scss files
    
## Shared
  the shared directory includes all the folders ***Components,Enums, Models, Services*** that are deemed to be used by multiple components and the general of the application, it is worth noting that it contains interfaces even basically anything that is considered immutable, or static and would not be changed by any component that might use it, it also holds the interface of the ActionTypeCreator to help facilitate the code for the stores later when strongly typing the data structure.
  
  ## Modules

The Modules usually contain all the major players of the application. the structure of the modules directory is built upon *lazy loading* and thus each stand alone part of the application will work seperatly and will load as such, the shared directory can be used by all these parts.

As for our application we only have 4 part called *LandingPage*,*Orders*,*Organizations*,*PRoducts* uses the following structure:

    -store:holds all the files for the ngrx state management, such as actions,effects,facade,reducers,selectors,state each having its own functionality
    -shared:these are the files such as enums and models shared by all other files and in other cases sub-components(though since this is a small project i never needed to implement atom pure components to handle small specific functionality  ) .
    -module file: loads all the modules and files that will be used in this container
    -routing module file: implements the lazy loading and adds the routes for the containers.


# Features

the project has *required requirements* and added *Extra Features* that have been implemented.

## Required Features:

### Build A Management System.

    -Product Management:A Product is an item that can be sold, with 3 fields Category, vairety,Packaging.
    -Order Management
      There are two types of orders:
        A buy order is an order where FarmLend is the buyer, and the user is the seller,
        A sell order is an order where FarmLend is the seller, and the user is the buyer.
     An order has the following characteristics:Type,References,Products,Organization
    -Organization Management: An organization has the following characteristics:Name,Type,Products,Orders
    
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
