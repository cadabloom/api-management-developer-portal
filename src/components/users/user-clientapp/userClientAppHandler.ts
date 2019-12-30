import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { UserClientAppModel } from "./userClientAppModel";

export class UserClientAppHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "userClientApp",
            category: "Custom User",
            displayName: "User: Client App",
            iconClass: "paperbits-cheque-3",
            requires: ["scripts"],
            createModel: async () => new UserClientAppModel()
        };

        return widgetOrder;
    }
}