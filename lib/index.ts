const Waterline = require('waterline');
const database = new Waterline();
var db: any;
const modelRegister: any = {};

export declare type IModelConstructor = new () => {
  name: string;
};

export interface IPluginConfig {
  adapters: any;
  connections: any;
}

export function DRegisterModel(requiredParams: any): any {
  return function(OriginalClassConstructor: IModelConstructor) {
    const NewModel: any = class extends OriginalClassConstructor{
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
        if (err) { console.log('<error>', err) }
        db = DB.collections;
        console.log('db initialized');
        routes.forEach(route => {
          route.models = db;
          console.log(db, route);
        });
      });
    },
    server: function (server: any) {
    }
  }
}
