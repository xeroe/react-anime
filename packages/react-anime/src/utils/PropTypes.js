/**
 * Ensure that all children have an id property
 */
export function childrenId(props, propName, componentName) {
  if (typeof props[propName] !== 'undefined') { // Has children prop
    let children = props[propName];
    if (!Array.isArray(children)) children = [children]; // Make sure it is an array
    children.forEach((child) => {
      if ((typeof child !== 'object' ||
      typeof child.props === 'undefined' ||
      typeof child.props.id === 'undefined')) { // if it doesn't have an id prop
        return new Error(`All children of '${componentName}' need to have a valid 'id' prop`);
      }
      return null;
    });
  }
}
