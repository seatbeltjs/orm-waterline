Object.defineProperty(exports, "__esModule", { value: true });
const Waterline = require('waterline');
const database = new Waterline();
var db;
const modelRegister = {};
function DRegisterModel(requiredParams) {
    return function (OriginalClassConstructor) {
        const NewModel = class extends OriginalClassConstructor {
            constructor() {
                super();
                const collection = Waterline.Collection.extend(requiredParams);
                database.loadCollection(collection);
            }
        };
        return NewModel;
    };
}
exports.DRegisterModel = DRegisterModel;
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
                    console.log('<error>', err);
                }
                db = DB.collections;
                console.log('db initialized');
                routes.forEach(route => {
                    route.models = db;
                    console.log(db, route);
                });
            });
        },
        server: function (server) {
        }
    };
}
exports.waterlinePlugin = waterlinePlugin;
