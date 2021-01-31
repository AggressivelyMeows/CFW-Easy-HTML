'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// MIT License

// Copyright (c) 2021 Connor Vince

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

class ElementHandler {
    // a wrapper for the rewriter to redirect the per element callback to one
    // we pre set during the transform type.
    constructor (elm_cb, options) {
        this.callback = elm_cb;
        this.options = options;
        this.index = 0;
    }

    async element(elm) {
        // run the on element callback set during the new transformation step.
        // addClass, setContent, etc...
        var cb = this.callback;

        if (typeof cb == 'function') {
            cb(elm);
        } else {
            await cb(elm);
        }

        // sometimes the callback isnt enough
        // so we need to ensure it resolves.
        await Promise.resolve(cb(elm)); 
        
        this.index += 1;
    }
}

class $ {
    constructor (request) {
        if (typeof request == 'string') {
            // turn the string into a request that we can process.
            this._request = new Response(new TextEncoder().encode(request));
        } else {
            this._request = request;
        }

        this.chain = [];

        this.has_finished = false;
    }

    find(selector, options) {
        this.chain.push({
            'type': 'target',
            'selector': selector,
            options: Object.assign({}, options)
        });
        return this
    }

    setClass(cls) {
        // directly set the elements class.
        this.chain.push({'type': 'transform', 'function': (e) => {e.setAttribute('class', cls || '');}});
        return this
    }

    removeClass(cls, options) {
        // scan the class list and remove it from the element
        var callback = (e) => {

            e.setAttribute('class', (element.getAttribute('class')).replace(cls, options.replace || ''));
        };

        this.chain.push({'type': 'transform', 'function': callback});
        return this
    }

    addClass(cls, options) {
        // append
        options = options || {};
        var append = (options.mode || 'append') == 'append'; // if mode is set to something other than append, we prepend.

        const callback = (element) => {
            // here we want to modify the element to add our classes
            var classString = element.getAttribute('class') || '' + cls;

            if (!append) {
                classString = cls + element.getAttribute('class') || '';
            }
            element.setAttribute('class', classString);
        };

        this.chain.push({'type': 'transform', 'function': callback});
        return this
    }

    setContent(content, options) {
        const callback = (element) => {
            element.setInnerContent(content, options);
        };
        this.chain.push({'type': 'transform', 'function': callback});
        return this
    }

    removeContent() {
        const callback = (element) => {
            element.setInnerContent('');
        };
        this.chain.push({'type': 'transform', 'function': callback});
        return this
    }

    _directTransform(op, html, options) {
        // wrapper for direct translation to the ElementHandler.
        const callback = (element) => {
            // simple and dirty way to create a bunch of operations that
            // just talk straight to the API.
            if (typeof html == 'object' && typeof html.execute == 'function') {
                html = html.execute();
            }
            element[op](html, options);
        };
        this.chain.push({'type': 'transform', 'function': callback});
        return this
    }

    append(html, options) {
        const callback = (element) => {
            // we want to append into the element
            element.append(html, options);
        };
        this.chain.push({'type': 'transform', 'function': callback});
        return this
    }

    prepend(html, options) {
        // like append, but prepending the content to the tag.
        const callback = (element) => {
            // we want to append into the element
            element.prepend(html, options);
        };
        this.chain.push({'type': 'transform', 'function': callback});
        return this
    }

    before(html, options) {
        // insert the content before the selector in the DOM tree.
        return this._directTransform('before', html, options)
    }

    after(html, options) {
        // insert the content before the selector in the DOM tree.
        return this._directTransform('after', html, options)
    }

    removeElement() {
        // removes the element(s) from the document tree
        return this._directTransform('remove', '')
    }

    setAttribute(attr, new_value, options) {
        // set an arbitrary attribute
        const callback = (element) => {
            element.setAttribute(attr, new_value);
        };
        this.chain.push({'type': 'transform', 'function': callback});
        return this
    }

    forEach(promise) {
        this.chain.push({'type': 'transform', 'function': promise});
        return this
    }

    commit() {
        // commit the changes made in the previous transformations.
        // will execute but will also return the instance to continue modification.
        var response = this.execute();
        this._request = response;
        this.chain = [];

        this.has_finished = false;

        return this
    }

    execute(options) {

        var index = 0;
        var rewriter = new HTMLRewriter();

        this.chain.forEach(step => {
            if (step.type == 'transform') {
                // check the chain to see if we have a selector
                var selector = '*';
                var selectorOptions = {};

                this.chain.slice(0, index).forEach(step => {
                    if (step.type == 'target') {
                        selector = step.selector;
                        selectorOptions = step.options;
                    }
                });

                rewriter.on(
                    selector,
                    new ElementHandler(
                        step.function,
                        {selectorOptions}
                    )
                );
            }
            index += 1;
        });

        {
            this.has_finished = true;

            return rewriter.transform(this._request)
        }

    }
}

exports.$ = $;
