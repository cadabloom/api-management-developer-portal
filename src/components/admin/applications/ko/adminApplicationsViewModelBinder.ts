import { ViewModelBinder } from "@paperbits/common/widgets";
import { Bag } from "@paperbits/common";
import { AdminApplicationsModel } from "../adminApplicationsModel";
import { AdminApplicationsViewModel } from "./adminApplicationsViewModel";

export class AdminApplicationsViewModelBinder implements ViewModelBinder<AdminApplicationsModel, AdminApplicationsViewModel> {
    public async modelToViewModel(model: AdminApplicationsModel, viewModel?: AdminApplicationsViewModel, bindingContext?: Bag<any>): Promise<AdminApplicationsViewModel> {
        if (!viewModel) {
            viewModel = new AdminApplicationsViewModel();
        }

        viewModel["widgetBinding"] = {
            displayName: "Admin: Applications",
            model: model,
            applyChanges: async (updatedModel: AdminApplicationsModel) => {
                this.modelToViewModel(updatedModel, viewModel, bindingContext);
            }
        };

        return viewModel;
    }

    public canHandleModel(model: AdminApplicationsModel): boolean {
        return model instanceof AdminApplicationsModel;
    }
}