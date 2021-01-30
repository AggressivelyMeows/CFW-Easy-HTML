# CloudFlare Workers: Easy HTML
A wrapper around HTMLRewriter that makes it easy to use and ultra fast!

## How to use

```js
import { $ } from 'cfw-easy-html'

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})
  
async function handleRequest(request) {
    // This API was designed to combine as many operations.
    // That is why this looks different to how you might see it in JQuery.

    // The way the code is written here is for ease of reading.
    const changedHTML = new $(
        await fetch('https://example.com')
    )
    .find('p')
    .addClass('text-grey-700')
    .setContent('This is the new content for all P tags.')

    .find('p:nth-of-type(1)')
    .setContent('This is the first paragraph found in the document')

    var users = ['Bob', 'Jane']

    users.forEach(u => {
        // we can add changes without being in the main chain.
        // note: the document wont change until you commit or execute.
        // if you look for elements that are added during the chain, make
        // sure to commit the existing changes before looking otherwise it
        // will be silently discarded.

        changedHTML.find('p:nth-of-type(1)').after(`<b>${u}</b>`)
    })
    
    // EasyHTML returns a response object so you can
    // just return it right away.
    return changedHTML.execute()

}
```

## Reference

## Transformation operations
All of these functions are run one after another to form one big "chain". Behind the scenes, these transformation operations are not executed on until the user calls the `execute` or `commit` functions. If you insert HTML, you wont be able to find it using EasyHTML until you commit.

#### $.find(CSSSelector: String)
Finds an element with the selector. Supports CSS queries.

#### $.addClass(classList: String, options: { append: true })
Adds the classList to the start/end of the element. If append is true it will add the class list to the end of the elements existing classes. If set to false, it will prepend the new class list.

#### $.removeClass(class: String)
Finds and removes a class from the element. Must match the exact string or it wont be removed. You can match multiple classes but it must match what the element shows.

#### $.setClass(classList: String)
Will remove all classes on the element and set the class list to the new value.