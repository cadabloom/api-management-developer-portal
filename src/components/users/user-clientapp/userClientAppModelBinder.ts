import { Contract } from "@paperbits/common";
import { IModelBinder } from "@paperbits/common/editing";
import { UserClientAppModel } from "./userClientAppModel";
import { UserClientAppContract } from "./userClientAppContract";


export class UserClientAppModelBinder implements IModelBinder<UserClientAppModel> {
    public canHandleModel(model: Object): boolean {
        return model instanceof UserClientAppModel;
    }

    public canHandleContract(contract: Contract): boolean {
        return contract.type === "userClientApp";
    }

    public async contractToModel(contract: UserClientAppContract): Promise<UserClientAppModel> {
        return new UserClientAppModel();
    }

    public modelToContract(model: UserClientAppModel): Contract {
        const contract: UserClientAppContract = {
            type: "userClientApp"
        };

        return contract;
    }
}
