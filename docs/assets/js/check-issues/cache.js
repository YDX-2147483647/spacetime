/**
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map/
 */
export default class Cache {

    /**
     * @param {Storage} storage `localStorage`
     * @param {String} key_in_storage namespace
     */
    constructor(storage, key_in_storage) {
        /** @type {Storage} */
        this._storage = storage
        /** @type {String} */
        this._key_in_storage = key_in_storage

        const raw = storage.getItem(key_in_storage)
        /** @type {Map<String, *>} */
        this._cache = new Map(JSON.parse(raw))
    }

    /**
     * @param {String} key 
     */
    get(key) {
        return this._cache.get(key)
    }
    /**
     * @param {String} key 
     */
    has(key) {
        return this._cache.has(key)
    }

    /**
     * 
     * @param {String} key 
     * @param {*} value 
     * @returns {Cache} this
     */
    set(key, value) {
        this._cache.set(key, value)
        this._save()

        return this
    }
    /**
     * 
     * @param {String} key 
     * @returns {Boolean} if existed and has been removed
     */
    delete(key) {
        const existed_and_removed = this._cache.delete(key)
        this._save()
        return existed_and_removed
    }

    clear() {
        this._cache.clear()
        this._save()
    }

    _save() {
        const literal = Array.from(this._cache.entries())
        this._storage.setItem(
            this._key_in_storage,
            JSON.stringify(literal)
        )
    }
}
