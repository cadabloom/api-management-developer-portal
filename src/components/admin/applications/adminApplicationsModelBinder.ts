import { Contract } from "@paperbits/common";
import { IModelBinder } from "@paperbits/common/editing";
import { AdminApplicationsContract } from "./adminApplicationsContract";
import { AdminApplicationsModel } from "./adminApplicationsModel";


export class AdminApplicationsModelBinder implements IModelBinder<AdminApplicationsModel> {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "applications";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof AdminApplicationsModel;
    }

    public async contractToModel(contract: AdminApplicationsContract): Promise<AdminApplicationsModel> {
        return new AdminApplicationsModel();
    }

    public modelToContract(model: AdminApplicationsModel): Contract {
        const contract: AdminApplicationsContract = {
            type: "applications"
        };

        return contract;
    }
}
