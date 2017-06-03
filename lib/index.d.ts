export declare type IModelConstructor = new () => {
    name: string;
};
export interface IPluginConfig {
    adapters: any;
    connections: any;
}
export declare function DModel(requiredParams: any): any;
export declare function DModels(): any;
export declare function waterlinePlugin(config: IPluginConfig): any;
