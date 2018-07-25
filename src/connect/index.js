import shallowEqual from '../utils/shallowEqual';
import isArray from '../utils/isArray';
const noop = () => {};
const keysMapToRender = {};

export default function createConnect(store = {
  subscribe: noop,
  getState: noop,
  dispatch: noop,
}) {
  /**
   * 参数说明：
   * keys -- 组件与 `store` 关联的字段（需要手动配置字段，在相关字段的数据变动时，才会调用该组件的重渲染函数）
   */
  return function connect(keys = [], mapStateToProps = noop, mapDispatchToProps = noop) {
    return function(render = noop, actionsInit = noop) {
      keys.map(key => {
        if (keysMapToRender[key] && isArray(keysMapToRender[key])) {
          if (keysMapToRender[key].indexOf(render) == -1) {
            keysMapToRender[key].push(render);
          }
        } else {
          keysMapToRender[key] = [render];
        }
      });

      let props = mapStateToProps(store.getState());
      const actions = mapDispatchToProps(store.dispatch);
      store.subscribe(rerender);

      function rerender() {
        const newProps = mapStateToProps(store.getState());
        if (shallowEqual(props, newProps)) {
          return;
        } else {
          const propKeys = Object.keys(props);
          const keysArr = [];
          const fnArr = [];

          propKeys.map(key => {
            if (!shallowEqual(newProps[key], props[key])) {
              keysArr.push(key);
            }
          });
          keysArr.map(key => {
            fnArr.push(...keysMapToRender[key]);
          });

          if (fnArr.indexOf(render) != -1) {
            render(newProps);
            props = newProps;
          }
        }
      }

      // 初始化需要执行一次渲染以及事件绑定函数
      render(props);
      actionsInit(actions);

      // 返回重渲染函数，在组件关联的数据变动时触发
      return rerender;
    }
  }
}
