import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { AdminApplicationsModel } from "./adminApplicationsModel";


export class AdminApplicationsHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "applications",
            category: "Admin",
            displayName: "Client Applications",
            iconClass: "paperbits-cheque-3",
            requires: ["scripts"],
            createModel: async () => new AdminApplicationsModel()
        };

        return widgetOrder;
    }
}