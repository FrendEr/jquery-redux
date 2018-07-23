import shallowEqual from '../utils/shallowEqual';
const noop = () => {};

export default function createConnect(store = {
  subscribe = noop,
  getState = noop,
}) {
  return function connect(mapStateToProps, render) {
    let props = mapStateTopProps(store.getState());
    store.subscribe(rerender);

    function rerender () {
      const newProps = mapStateTopProps(store.getState());
      if (shallowEqual(props, newProps)) {
        return;
      }
      render(newProps);
      props = newProps;
    }

    render(props);
    return rerender;
  }
}
