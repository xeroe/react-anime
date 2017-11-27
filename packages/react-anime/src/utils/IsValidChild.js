/**
 * Check to see if child has an id prop
 */
export default function (child) {
  return (typeof child === 'object' &&
  typeof child.props !== 'undefined' &&
  typeof child.props.id !== 'undefined');
}
