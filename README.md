To run a project on port 4200, run `npm i` and then `npm start`;

## How it works
When a user opens a page, it fetches documents from the server and displays them on the page. User can select a document, open it, and scroll through the page. On the left click, the user can create an annotation (image or text), drag, rotate, and delete it.

## General Approach
To implement dragging functionality, a custom directive was created. It utilizes RxJs library, keeps track of drag-start, drag, and drag-end, and updates coordinate accordingly. The rotating functionality is also included in this directive. By pressing + and -, the document scales by 10% accordingly.

## Pros and cons
 The pros of this solution are
* reactivity, it utilizes RxJs to the full extent
* uses streams to handle getting/deleting/changing data.
* there are no manual subscriptions in the components, only async pipe
* every component uses onPush change-detection, which improves performance.

But there are also cons of this approach
* by not using popular libraries for those features and creating everything on our own, we sacrifice the simplicity of the code
* Angular CDK also provides more tools to expand your features

## Known solutions
To avoid such problems, we can use already known solutions, such as Angular Material with Angular CDK(Drag&Drop, Portal, Overlay), which are high-level solutions with simple APIs.

To improve the project's extensibility, it would be better to create some abstract/generic classes, particularly for annotations, to reduce code duplication, and to make adding custom annotations easier.
