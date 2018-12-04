# Commlinks
Easy communication between window instances in JavaScript.
You can also communicate between iframes and browser tabs too.

## Installation
```
npm i --save commlinks
```
*If you do not want to add the package to your `package.json` file, 
do not use the `--save` flag.*

## Usage
#### Creating a Commlink instance
A global `Commlinks` object is available, you can register
your Commlink instances in it.

Create a Commlink instance:
```
Commlinks.myWindow = new Commlink(window);
```
or if you prefer using a local variable:
```
let myCommlink = new Commlink(window);
```
The Commlink function always requires an instance of Window
interface as a parameter.

#### Send message
Send message:
```
Commlinks.myWindow = new Commlink(window);

Commlinks.myWindow.send('someMessage')
```
Send message with data:
```
Commlinks.myWindow = new Commlink(window);

Commlinks.myWindow.send('someMessage', {test: 'Hello.'})
```
Send message with data and target:
```
Commlinks.myWindow = new Commlink(window);

Commlinks.myWindow.send('someMessage', {test: 'Hello.'}, 'https://example.org')
```
*More information about the target origin: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage*

#### Listen for messages
You can of course listen for messages, and run a callback.
```
Commlinks.on('someMessage', function (data, event) {
    // Do something
});
```
You can find examples in the `examples` folder.

If you have an idea or you want to request a feature, feel 
free to open an issue.