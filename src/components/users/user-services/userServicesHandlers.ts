import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { UserServicesModel } from "./userServicesModel";

export class UserServicesHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "userServices",
            category: "Custom User",
            displayName: "User: Services",
            iconClass: "paperbits-cheque-3",
            requires: ["scripts"],
            createModel: async () => new UserServicesModel()
        };

        return widgetOrder;
    }
}