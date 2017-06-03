import { Log } from '@seatbelt/core';

const Waterline = require('waterline');
const database = new Waterline();
const modelRegister: any = {};
let db: any;

export declare type IModelConstructor = new () => {
  name: string;
};

export interface IPluginConfig {
  adapters: any;
  connections: any;
}

const log = new Log('waterline');

export function DRegisterModel(requiredParams: any): any {
  return function(OriginalClassConstructor: IModelConstructor) {
    class NewModel extends OriginalClassConstructor {
      constructor() {
        super();
        const collection = Waterline.Collection.extend(requiredParams);
        database.loadCollection(collection);
      }
    }
    return NewModel;
  };
}

export function DModels(): any {
  return function(OriginalClass: any, propertyName: string) {
    OriginalClass[propertyName] = modelRegister;
  };
}

export function waterlinePlugin(config: IPluginConfig): any {
  return {
    routes: (routes: any[]) => {
      database.initialize(config, (err: Error, DB: any) => {
        if (err) {
          log.error('<error>', err);
        }
        db = DB.collections;
        log.system('db initialized');
        routes.forEach(route => {
          route.models = db;
        });
      });
    }
  };
}
