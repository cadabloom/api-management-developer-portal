import { GroupContract, GroupPropertiesContract } from "../custom-contracts/group";

export class Group {
    public id: string;
    public type: string;
    public name: string;
    public properties: GroupProperties;
    constructor(contract?: GroupContract) {
        this.id = contract.id;
        this.type = contract.type;
        this.name = contract.name;
        this.properties = new GroupProperties(contract.properties);
    }
}

export class GroupProperties {
    public displayName: string;
    public description: string;
    public builtIn: string;
    public type: string;
    public externalId: string;
    constructor(contract?: GroupPropertiesContract) {
        this.displayName = contract.displayName;
        this.description = contract.description;
        this.builtIn = contract.builtIn;
        this.type = contract.type;
        this.externalId = contract.externalId;
    }
}