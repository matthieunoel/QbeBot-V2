interface ISQLTable_Instance {
    // toSQLCreateScript_Instance(): string;
}

export interface ISQLTable {
    new():ISQLTable_Instance
    toSQLCreateScript(): string;
}

export const staticImplements = function staticImplements<T>() {
    return <U extends T>(constructor: U) => {constructor};
}