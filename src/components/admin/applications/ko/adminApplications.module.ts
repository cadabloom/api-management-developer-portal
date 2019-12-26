import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { AdminApplicationsModelBinder } from "../adminApplicationsModelBinder";
import { AdminApplicationsViewModelBinder } from "./adminApplicationsViewModelBinder";


export class AdminApplicaitonsModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindToCollection("modelBinders", AdminApplicationsModelBinder);
        injector.bindToCollection("viewModelBinders", AdminApplicationsViewModelBinder);
    }
}