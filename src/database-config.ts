import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'product',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'category', keypath: 'category', options: { unique: false } },
        { name: 'variety', keypath: 'variety', options: { unique: false } },
        { name: 'packaging', keypath: 'packaging', options: { unique: false } },
      ],
    },
    {
      store: 'organization',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'products', keypath: 'products', options: { unique: false } },
        { name: 'orders', keypath: 'orders', options: { unique: false } },
      ],
    },
    {
      store: 'order',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'products', keypath: 'products', options: { unique: false } },
        { name: 'organization', keypath: 'organization', options: { unique: false } },
      ],
    },
  ],
};
export enum DbTableNames{
  Product='product',
  Order='order',
  Organization='organization'
}
