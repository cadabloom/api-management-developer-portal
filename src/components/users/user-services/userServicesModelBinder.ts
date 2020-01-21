import { Contract } from "@paperbits/common";
import { IModelBinder } from "@paperbits/common/editing";
import { UserServicesModel } from "./userServicesModel";
import { UserServicesContract } from "./userServicesContract";


export class UserServicesModelBinder implements IModelBinder<UserServicesModel> {
    public canHandleModel(model: Object): boolean {
        return model instanceof UserServicesModel;
    }

    public canHandleContract(contract: Contract): boolean {
        return contract.type === "userServices";
    }

    public async contractToModel(contract: UserServicesContract): Promise<UserServicesModel> {
        return new UserServicesModel();
    }

    public modelToContract(model: UserServicesModel): Contract {
        const contract: UserServicesContract = {
            type: "userServices"
        };

        return contract;
    }
}
