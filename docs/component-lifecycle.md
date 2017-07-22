#The Component Lifecycle
https://facebook.github.io/react/docs/react-component.html

Each component has several "lifecycle methods" that you can override to run code at particular times in the process. 
Methods prefixed with will are called right before something happens, and methods prefixed with 
did are called right after something happens.

##Mounting
These methods are called when an instance of a component is being created and inserted into the DOM:

- `constructor(props)`
    * The constructor for a React component is called before it is mounted.
    * The constructor is the right place to initialize state. 
    * If you don't initialize state and you don't bind methods, you don't need to implement a constructor for your React component.
- `componentWillMount()`
    * componentWillMount() is invoked immediately before mounting occurs. It is called before render(), therefore setting state synchronously in this method will not trigger a re-rendering. Avoid introducing any side-effects or subscriptions in this method.
    * This is the only lifecycle hook called on server rendering. Generally, we recommend using the constructor() instead.
- `render()`
    * When called, it should examine this.props and this.state and return a single React element. 
    * This element can be either a representation of a native DOM component, such as <div />, or another composite component that you've defined yourself.
    * You can also return null or false to indicate that you don't want anything rendered. When returning null or false, ReactDOM.findDOMNode(this) will return null.
- `componentDidMount()`
    * componentDidMount() is invoked immediately after a component is mounted. 
    * Initialization that requires DOM nodes should go here. 
    * If you need to load data from a remote endpoint, this is a good place to instantiate the network request. 
    * Setting state in this method will trigger a re-rendering.

##Updating
An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:

- `componentWillReceiveProps(nextProps)`
    * componentWillReceiveProps() is invoked before a mounted component receives new props. 
    If you need to update the state in response to prop changes (for example, to reset it), 
    you may compare this.props and nextProps and perform state transitions using this.setState() in this method.
    * Note that React may call this method even if the props have not changed, so make sure to compare the current and 
    next values if you only want to handle changes. This may occur when the parent component causes your component to re-render.
- `shouldComponentUpdate(nextProps, nextState)`
    * Use shouldComponentUpdate() to let React know if a component's output is not affected by the current change in 
    state or props. 
    * The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.
    * is invoked before rendering when new props or state are being received. Defaults to true.
    * This method is not called for the initial render or when forceUpdate() is used.
    * Returning false does not prevent child components from re-rendering when their state changes.
- `componentWillUpdate()`
    * is invoked immediately before rendering when new props or state are being received. 
    * Use this as an opportunity to perform preparation before an update occurs. 
    * This method is not called for the initial render.
    * `componentWillUpdate()` will not be invoked if `shouldComponentUpdate()` returns false.
- `render()`
    * render() will not be invoked if shouldComponentUpdate() returns false.
- `componentDidUpdate(prevProps, prevState)`

##Unmounting
This method is called when a component is being removed from the DOM:

- `componentWillUnmount()`
    * componentWillUnmount() is invoked immediately before a component is unmounted and destroyed. 
    * Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, 
    or cleaning up any DOM elements that were created in componentDidMount