https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1

#Organization

Each component, scene or service (a feature) has everything it needs to work on its own, such as its own styles, 
images, translations, set of actions as well as unit or integration tests. You can see a feature like an 
independent piece of code you will use in your app (a bit like node modules).
To work properly, they should follow these rules:
- A component can define nested components or services. It cannot use or define scenes.
- A scene can define nested components, scenes or services.
- A service can define nested services. It cannot use or define components or scenes.
- Nested features can only use from its parent.

## Components
Components defined at the root level of your project, in the components folder, are global and can be used anywhere 
in your application. But if you decide to define a new component inside another component (nesting), 
this new component can only be used its direct parent.

Example:

    /src
      /components
        /Button
          /index.js
        /Notifications 
          /components 
            /ButtonDismiss 
              /index.js
          /actions.js
          /index.js
          /reducer.js
              
- Button can be used anywhere in your application.
- Notifications can also be used anywhere. This component defines a component ButtonDismiss. 
You cannot use ButtonDismiss anywhere else than in the Notifications component.
- ButtonDismiss uses Button internally, this is authorized because Button is defined at the root level of components.

## Scenes
A scene is a page of your application. You can see a scene just like any component, but I like to separate them into 
their own folder. If you use React-Router or React Native Router, you can import all your scenes in your main index.js 
file and setup your routes. With the same principle components can be nested, you can also nest a scene into a scene, 
and also define components or services into a scene. You have to remember that if you decide to define something into 
a scene, you can only use it within the scene folder itself.

Example: 

    /src
      /scenes
        /Home 
          /components
            /ButtonShare
              /index.js
          /index.js
        /Sign
          /components
            /ButtonHelp
              /index.js
          /scenes
            /Login
              /components 
                /Form
                  /index.js
                /ButtonFacebookLogin
                  /index.js
              /index.js
           
            /Register
              /index.js
          /index.js

- Home has a component ButtonShare, it can only be used by the Home scene.
- Sign has a component ButtonHelp. This component can be used by Login or Register scenes, or by any components 
defined in those scenes.
- Form component uses ButtonHelp internally, this is authorized because ButtonHelp is defined by a parent.
- The Register scene cannot use any of the components defined in Login, but it can use the ButtonHelp.

## Services
Not everything can be a component, and you will need to create independent modules that can be used by your components 
or scenes. You can see a service like a self-contained module where you will define the core business logic 
of your application. This can eventually be shared between several scenes or even applications, such as a web 
and native version of you app.

Example:

    /src
      /services
        /api
          /services
            /handleError
              /index.js
          /index.js
        /geolocation 
        /session 
          /actions.js
          /index.js
          /reducer.js

I recommend you to create services to manage all api requests. You can see them as a bridge/an adapter between the 
server API and the view layer (scenes and components) of your application. It can take care of network calls 
your app will make, get and post content, and transform payloads as needed before being sent or saved in the 
store of your app (such as Redux). The scenes and components will only dispatch actions, read the store and 
update themselves based on the new changes.


## File Structure Example
    /src
      /components 
        /Button 
        /Notifications
          /components
            /ButtonDismiss  
              /images
              /locales
              /specs 
              /index.js
              /styles.scss
          /index.js
          /styles.scss
      /scenes
        /Home 
          /components 
            /ButtonLike
          /services
            /processData
          /index.js
          /styles.scss
        /Sign 
          /components 
            /FormField
          /scenes
            /Login
            /Register 
              /locales
              /specs
              /index.js
              /styles.scss
      /services
        /api
        /geolocation
        /session
          /actions.js
          /index.js
          /reducer.js
        /users
          /actions.js
          /api.js
          /reducer.js
      index.js 
      store.js