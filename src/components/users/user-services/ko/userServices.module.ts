import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { UserServicesModelBinder } from "../userServicesModelBinder";
import { UserServicesViewModelBinder } from "./userServicesViewModelBinder";


export class UserServicesModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindToCollection("modelBinders", UserServicesModelBinder);
        injector.bindToCollection("viewModelBinders", UserServicesViewModelBinder);
    }
}