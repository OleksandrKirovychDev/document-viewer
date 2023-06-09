
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
* for example, Angular Material CDK provides the functionality to work with various overlays, portals, etc. It could simplify further extension of functionality for this application

## Known solutions
To avoid such problems, we can use already known solutions, such as Angular Material with Angular CDK(Drag&Drop, Portal, Overlay), which are high-level solutions with simple APIs.

To improve the project's extensibility, it would be better to create some abstract/generic classes, particularly for annotations, to reduce code duplication, and to make adding custom annotations easier.

### Screenshots of the task
![1](https://user-images.githubusercontent.com/118730686/230627439-505149e2-285b-47e2-900d-c85d5592dc98.png)
![2](https://user-images.githubusercontent.com/118730686/230627443-b550aea2-1803-4459-8039-c0c52a40b4b4.png)
![3](https://user-images.githubusercontent.com/118730686/230627446-36af7900-0baf-4147-8266-39a23b732db5.png)
![4](https://user-images.githubusercontent.com/118730686/230627448-55a9dee3-1a55-4644-827c-d44a559233f3.png)
