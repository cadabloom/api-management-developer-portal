import { ViewModelBinder } from "@paperbits/common/widgets";
import { Bag } from "@paperbits/common";
import { UserClientAppModel } from "../userClientAppModel";
import { UserClientAppViewModel } from "./userClientAppViewModel";

export class UserClientAppViewModelBinder implements ViewModelBinder<UserClientAppModel, UserClientAppViewModel> {
    public async modelToViewModel(model: UserClientAppModel, viewModel?: UserClientAppViewModel, bindingContext?: Bag<any>): Promise<UserClientAppViewModel> {
        if (!viewModel) {
            viewModel = new UserClientAppViewModel();
        }

        viewModel["widgetBinding"] = {
            displayName: "User: Client App",
            model: model,
            applyChanges: async (updatedModel: UserClientAppModel) => {
                this.modelToViewModel(updatedModel, viewModel, bindingContext);
            }
        };

        return viewModel;
    }

    public canHandleModel(model: UserClientAppModel): boolean {
        return model instanceof UserClientAppModel;
    }
}