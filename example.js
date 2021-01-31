import { $ } from './src/index.js'
import { Image } from './src/elements.js'

//const { render } = require('micromustache')

const profileTemplate = `
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4">
  <div class="md:flex">
    <div class="md:flex-shrink-0">
      <img class="h-48 w-full object-cover md:w-48" src="{{person.picture.large}}" alt="Man looking at item at a store">
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Person</div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{{person.login.username}}</a>
      <p class="mt-2 text-gray-500">
        {{person.login.sha256}}
      </p>
    </div>
  </div>
</div>
`

const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor id ipsum sed tincidunt. Duis iaculis volutpat blandit. Proin dignissim est vitae ipsum iaculis, a tincidunt purus dignissim. Pellentesque consectetur libero imperdiet sem dictum venenatis quis ut arcu. Fusce ultricies dui ante, eget bibendum lorem vulputate non. Nunc posuere augue lacus, vel ultricies sapien vulputate at. In tempus dui lacus, eget rutrum eros sagittis id. Suspendisse quis malesuada dui, eget pretium elit. Nullam quis lacinia sem. Integer feugiat malesuada cursus. Quisque id elit imperdiet, tristique nulla nec, condimentum orci. Integer cursus nulla vel nisl tincidunt varius. Curabitur quis malesuada mi. Morbi cursus, tortor non eleifend ultrices, risus sapien molestie augue, tincidunt condimentum eros lectus non tortor. Aliquam ultricies pharetra metus, sed vestibulum augue posuere in.<br/>Quisque nec auctor turpis, non molestie purus. Aliquam luctus auctor dictum. Duis nec dictum tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam pharetra sem augue, sit amet aliquet est tincidunt vel. Quisque scelerisque massa varius odio tempor fermentum. Proin feugiat nisi sapien, at euismod felis molestie sit amet. Proin erat risus, placerat non augue at, gravida lacinia arcu. Aliquam mollis nibh turpis, nec fringilla massa iaculis non. Aliquam eleifend, diam sit amet aliquet ultrices, urna dui tempor est, in fringilla dui purus in erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget sapien nec erat luctus tempus ut ullamcorper ex. '

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})
  
async function handleRequest(request) {
    // HTMLRewriters strength comes in its ability to work fast.
    // This API was designed to combine as many operations to save on CPU cycles.
    const changedHTML = new $(
        // accepts either a fetch request, or string denoting a HTML body.
        await fetch('https://example.com')
    )
    .find('head')
    .append('<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">', {html: true})
    .append('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">', {html: true})
    .append("<style>* {font-family: 'Inter', sans-serif;!important}</style>", {html: true}) // because example.com forces its font choice on us.

    .find('style')
    .removeElement()

    .find('h1')
    .after(new Image({ src: 'https://google.com' }))

    // every time .find is called, a new target for the next transformations is set.
    // so everything down to .execute will target the .find until there is a newer one.
    .find('h1')
    .addClass('text-4xl mb-6 font-bold text-center block mt-6 mb-12')
    .setContent('CFW: Easy HTML')

    .find('p')
    .forEach(async (element) => {
        var resp = await fetch('https://randomuser.me/api/')
        var person = await resp.json()

        person = person.results[0]

        element.setInnerContent(render(profileTemplate, {person}), { html: true })
    })

    .find('p:nth-of-type(1)')
    .setContent('This lib makes using Cloudflares high speed HTMLRewriter a breeze. Easily change attributes, remove elements, or add new ones without having to write hundreds of lines. ')

    .find('p:nth-of-type(2)')
    .setContent('This page is actually example.com, but its been modified with 12 lines of EasyHTML code to insert and change the content!', {html: true})
    .addClass('mt-4 block')

    .after('<div id="example"><h1>hi</h1></div>', {html: true})
    
    // Commit all of the chances we just made. Is a heavy operation and
    // will take time so please do this sparingly!

    // commit allows you to take the changes you just did and actually update the "DOM".
    // Anything after the .commit will be using the newly changed document.
    .commit()

    .find('div[id=example]')
    .addClass('bg-indigo-400')
    .setAttribute('style', 'white-space: pre-line; width:unset;')
    .setContent(content)

    // execute ends the chain and runs the chain up to itself.
    // returns a Response object that can be returned to the worker OR can be passed to a new EasyHTML instance.
    .execute()

    // you can chain EasyHTML instances as they return a valid response object.
    // in this example, we modify the DIV we just added after the second P tag.
    // note: modifications made during the chain wont take effect until "execute".
    return changedHTML

}