import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { UserClientAppHandlers } from "../userClientAppHandler";

export class UserClientAppEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindToCollection("widgetHandlers", UserClientAppHandlers);
    }
}