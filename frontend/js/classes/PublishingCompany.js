export default class PublishingCompany {
    
    #id;
    #name;

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    }

    // get and set id
    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    // get and set name
    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }
    
}