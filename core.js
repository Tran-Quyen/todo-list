// Library
export default function html([first, ...strings], ...values) {
  return values
    .reduce((acc, cur) => acc.concat(cur, strings.shift()), [first])
    .filter((x) => (x && x !== true) || x === 0)
    .join("");
}

// Store look like repo and have callback reducer
export function createStore(reducer) {
  //But Data in store we call it is a state
  let state = reducer();
  // Map is special object different normal object in nature loop it
  // Map can use any DataType in Javascript
  const roots = new Map();

  // Render will loop roots to output view
  function render() {
    for (const [root, component] of roots) {
      const output = component();
      root.innerHTML = output;
    }
  }

  return {
    attach(component, root) {
      roots.set(root, component);
      render();
    },
    connect(selector = (state) => state) {
      return (component) => (props, ...args) =>
        // Merge data (with object.assign) to have new object for component
        component(Object.assign({}, props, selector(state), ...args));
    },
    dispatch(action, ...args) {
      state = reducer(state, action, args);
      render();
    },
  };
}
