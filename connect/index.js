import shallowEqual from '../utils/shallowEqual';
const noop = () => {};

export default function createConnect(store = {
  subscribe = noop,
  getState = noop,
}) {
  return function connect(mapStateToProps, mapDispatchToProps, render) {
    let props = mapStateTopProps(store.getState());
    const events = mapDispatchToProps(dispatch);
    store.subscribe(rerender);

    function rerender() {
      const newProps = mapStateTopProps(store.getState());
      if (shallowEqual(props, newProps)) {
        return;
      }
      render(newProps, events);
      props = newProps;
    }

    render(props, events);
    return rerender;
  }
}
