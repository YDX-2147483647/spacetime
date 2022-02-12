/**
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map/
 */
export default class Cache {
    /** @type {Storage} */
    #storage
    /** @type {String} */
    #key_in_storage
    /** @type {Map<String, *>} */
    #cache

    /**
     * @param {Storage} storage `localStorage`
     * @param {String} key_in_storage namespace
     */
    constructor(storage, key_in_storage) {
        this.#storage = storage
        this.#key_in_storage = key_in_storage

        const raw = storage.getItem(key_in_storage)
        this.#cache = new Map(JSON.parse(raw))
    }

    /**
     * @param {String} key 
     */
    get(key) {
        return this.#cache.get(key)
    }
    /**
     * @param {String} key 
     */
    has(key) {
        return this.#cache.has(key)
    }

    /**
     * 
     * @param {String} key 
     * @param {*} value 
     * @returns {Cache} this
     */
    set(key, value) {
        this.#cache.set(key, value)
        this.#save()

        return this
    }
    /**
     * 
     * @param {String} key 
     * @returns {Boolean} if existed and has been removed
     */
    delete(key) {
        const existed_and_removed = this.#cache.delete(key)
        this.#save()
        return existed_and_removed
    }

    clear() {
        this.#cache.clear()
        this.#save()
    }

    #save() {
        const literal = Array.from(this.#cache.entries())
        this.#storage.setItem(
            this.#key_in_storage,
            JSON.stringify(literal)
        )
    }
}
