import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { AdminApplicationsHandlers } from "../adminApplicationsHandlers";

export class AdminApplicaitonsEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindToCollection("widgetHandlers", AdminApplicationsHandlers);
    }
}