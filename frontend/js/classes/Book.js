export default class Book {

    #id;
    #title;
    #authorName;
    #publishingCompanyName;

    constructor(id, title, authorName, publishingCompanyName) {
        this.#id = id;
        this.#title = title;
        this.#authorName = authorName;
        this.#publishingCompanyName = publishingCompanyName;
    }

    // get and set id
    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    // get and set title
    get title() {
        return this.#title;
    }

    set title(title) {
        this.#title = title;
    }

    // get and set authorName
    get authorName() {
        return this.#authorName;
    }

    set authorName(authorName) {
        this.#authorName = authorName;
    }

    // get and set publishingCompanyName
    get publishingCompanyName() {
        return this.#publishingCompanyName;
    }

    set publishingCompanyName(publishingCompanyName) {
        this.#publishingCompanyName = publishingCompanyName;
    }

}