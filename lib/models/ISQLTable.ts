interface ISQLTable_Instance {
    // toSQLCreateScript_Instance(): string;
}

export interface ISQLTable {
    new():ISQLTable_Instance
    toSQLCreateScript(): string;
}




interface MyType {
    instanceMethod();
}

export interface MyTypeStatic {
    new():MyType;
    staticMethod();
}

/* class decorator */
function staticImplements<T>() {
    return <U extends T>(constructor: U) => {constructor};
}

@staticImplements<MyTypeStatic>()   /* this statement implements both normal interface & static interface */
// @ts-ignore
class MyTypeClass  { /* implements MyType { */ /* so this become optional not required */
    public static staticMethod() {}
    instanceMethod() {}
}

MyTypeClass.staticMethod();