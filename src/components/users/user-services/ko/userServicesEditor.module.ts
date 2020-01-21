import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { UserServicesHandlers } from "../userServicesHandlers";

export class UserServicesEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindToCollection("widgetHandlers", UserServicesHandlers);
    }
}