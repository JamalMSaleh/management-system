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
### Application Specifications:    
```shell
    -User can Perform all CRUD operations on all the above management systems, and the system will manage the data using NGRX
    -while the user is creating a new sell order you can reference an old buy order to replace all the data before it is saved.  
    -All requests are saved on IndexedDB, and all the CRUD operations are sent to the localDB.
```
### General Specification:
```shell
   -Used Linters for both style files and javascript files
```
    
### Application Level:
- Deployed the application on GitHub. [https://github.com/Bloodlesss/management-system](https://github.com/Bloodlesss/management-system).
- Used [primeNg](https://www.primefaces.org/primeng) library that is built on angular material to be able to provide a wider variaty of choices in design.
- Added a loader to compensate the  gap in time between sending and recieving the HttpRequests.

### Technical Level:
- Although the application is only a couple of small module I have worked considering that the app is gonna be recieving new and advanced features thus used **Lazy Loading** and some of the components use the new **Stand Alone** methodology. 
- UNit Tests using Karma covering products Management.

## Limitations and Workarounds
### IndexedDB
IndexedDB is a powerful browser-based storage mechanism that allows you to store structured data, including JavaScript objects. However, it has some limitations that may affect your application's performance or functionality. One of these limitations is that IndexedDB doesn't support partial updates, bulk updates, or cascading updates.

To work around these issues, I implemented some restrictions in our Angular application. For example, I blocked the delete function for products that are associated with an organization or order. Similarly, I blocked the delete function for organizations that are associated with an order. This helps to ensure that no data is lost or corrupted during the deletion process.

### Future Improvements
My Angular application has some areas that could be improved in the future. For example, I am currently using a workaround to handle the connections between orders and organizations, due to the limitations of IndexedDB. However, a possible solution is to delete the IndexedDB table on each add or update of either table, and handle the state purely from ngrx stores.
While I believe that this approach would be a suitable solution I would not advice of it in a real application as this relationship should be handled by the back-end API, this would be more robust and scalable in the long run.
### Improving the Project Structure
While I managed the folder structure of our Angular application quite well,I  recognize that there's room for improvement. In particular, I plan to turn the reused table and forms into pure components in the future.

By doing this, I'll make it easier and cleaner to use these components throughout our application. This will also help to reduce the size and complexity of our codebase, making it easier to maintain and update in the long run.

However, due to time constraints, I had to merge these components into the parent module for now. I plan to revisit this issue in a future release and refactor my code accordingly.



## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
