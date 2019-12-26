export interface GroupValueContract {
    value: Array<GroupContract>;
    count: number;
}

export interface GroupContract {
    id: string;
    type: string;
    name: string;
    properties: GroupPropertiesContract
}

export interface GroupPropertiesContract {
    displayName: string;
    description: string;
    builtIn: string;
    type: string;
    externalId: string;
}