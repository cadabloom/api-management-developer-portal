import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { UserClientAppModelBinder } from "../userClientAppModelBinder";
import { UserClientAppViewModelBinder } from "./userClientAppViewModelBinder";


export class UserClientAppModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindToCollection("modelBinders", UserClientAppModelBinder);
        injector.bindToCollection("viewModelBinders", UserClientAppViewModelBinder);
    }
}