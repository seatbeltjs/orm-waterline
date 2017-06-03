Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@seatbelt/core");
const Waterline = require('waterline');
const database = new Waterline();
const modelRegister = {};
let db;
const log = new core_1.Log('waterline');
function DModel(requiredParams) {
    return function (OriginalClassConstructor) {
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
exports.DModel = DModel;
function DModels() {
    return function (OriginalClass, propertyName) {
        OriginalClass[propertyName] = modelRegister;
    };
}
exports.DModels = DModels;
function waterlinePlugin(config) {
    return {
        routes: (routes) => {
            database.initialize(config, (err, DB) => {
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
exports.waterlinePlugin = waterlinePlugin;
