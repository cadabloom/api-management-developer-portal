import { ViewModelBinder } from "@paperbits/common/widgets";
import { Bag } from "@paperbits/common";
import { UserServicesModel } from "../userServicesModel";
import { UserServicesViewModel } from "./userServicesViewModel";

export class UserServicesViewModelBinder implements ViewModelBinder<UserServicesModel, UserServicesViewModel> {
    public async modelToViewModel(model: UserServicesModel, viewModel?: UserServicesViewModel, bindingContext?: Bag<any>): Promise<UserServicesViewModel> {
        if (!viewModel) {
            viewModel = new UserServicesViewModel();
        }

        viewModel["widgetBinding"] = {
            displayName: "User: Profile",
            model: model,
            applyChanges: async (updatedModel: UserServicesModel) => {
                this.modelToViewModel(updatedModel, viewModel, bindingContext);
            }
        };

        return viewModel;
    }

    public canHandleModel(model: UserServicesModel): boolean {
        return model instanceof UserServicesModel;
    }
}