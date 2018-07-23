import shallowEqual from '../utils/shallowEqual';
const noop = () => {};

export default function createConnect(store = {
  subscribe: noop,
  getState: noop,
  dispatch: noop,
}) {
  return function connect(mapStateToProps, mapDispatchToProps, render) {
    let props = mapStateToProps(store.getState());
    const events = mapDispatchToProps(store.dispatch);
    store.subscribe(rerender);

    function rerender() {
      const newProps = mapStateToProps(store.getState());
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
