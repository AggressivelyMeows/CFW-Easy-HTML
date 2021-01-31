import { $ } from './index.js'

export class Image {
    constructor (options) {
        this.options = options || {
            src: ''
        }
    }

    execute() {
        var image = $(`<img/>`)
        .commit()
        .setAttribute('src', this.src)
        
        Object.keys(this.options).forEach(key => {
            image.setAttribute(key, this.options[key])
        })

        return image.execute()
    }
}