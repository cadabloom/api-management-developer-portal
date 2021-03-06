import { HyperlinkModel } from "@paperbits/common/permalinks";

export class ListOfApisModel {
    /**
     * List layout.
     */
    public layout?: string;

    /**
     * Indicated that an operations can be selected.
     */
    public allowSelection: boolean;

    /**
     * Link to a page that contains operation details.
     */
    public detailsPageHyperlink: HyperlinkModel;

    constructor(layout?: string) {
        this.layout = layout;
    }
}