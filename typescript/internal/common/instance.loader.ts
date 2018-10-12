export class InstanceLoader {
    static getInstance<T>(context: any, name: string, ...args: any[]) : T {
        var instance = Object.create(context[name].prototype);
        instance.constructor.apply(instance, args);
        return <T> instance;
    }
}


export interface ParameterlessConstructor<T> {
    new(): T;
}

export class Creator<T> {
    constructor(private ctor: ParameterlessConstructor<T>) {

    }
    getNew() {
        return new this.ctor();
    }
}
