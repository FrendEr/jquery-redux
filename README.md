# jQuery Redux

jQuery bindings for Redux.

[![image](https://img.shields.io/npm/v/jquery-redux.svg)](https://www.npmjs.com/package/jquery-redux)

## Installation

```shell
npm install --save jquery-redux
```

## API

### `createConnect(store)`

创建用来绑定 `store` 与 `component` 的 **connect** 函数

```javascript
import { createConnect } from 'jquery-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import createStore from './createStore';

const sagaMiddleware = createSagaMiddleware();
const store = createStore([sagaMiddleware]);
const connect = createConnect(store);
sagaMiddleware.run(rootSaga);

export default connect;
```

#### `connect(connectKeys, mapStateToProps, mapDispatchToProps)(render, actionsInit)`

传入需要与 `store` 关联的数据字段 *connectKeys*、数据映射方法 *mapStateToProps* 以及事件映射方法 *mapDispatchToProps*，返回一个用于组件初始化的函数，并接收两个函数作为参数：*render* (组件渲染)、*actionsInit* (事件绑定)

```javascript
import $ from 'jquery';
import './style.less';
import Template from './views/template.dot';
import connect from '../../store/connect';
import { submitOrder } from '../../actions';
import getFormData from '../../utils/getFormData';

import importantNoticeValidate from '../important-notice/validate';
import travelScheduleValidate from '../travel-schedule/validate';

module.exports = function(data) {
  function render({ bottomSubmit }) {                           // UI 渲染，参数为 `mapStateToProps` 的返回值
    const html = Template(bottomSubmit);
    $('#contentBottom').append(html);
  }

  function actionsInit(actions) {
    $(document.body).on('click', '#submitBtn', function() {     // 事件绑定，参数为 `mapDispatchToProps` 的返回值
      let allPass = true;
      const validateList = [
        importantNoticeValidate,
        travelScheduleValidate
      ];
      validateList.map(component => {
        const isValid = component();

        if (!isValid) {
          allPass = false;
        }
      });

      if (allPass) {
        const formData = getFormData();
        actions.submitOrder(formData);
      }
    });
  }

  function mapStateToProps(state) {                             // 数据映射，用法同 `react-redux`           
    return state;
  }

  function mapDispatchToProps(dispatch) {                       // 事件映射，用法同 `react-redux`
    return {
      submitOrder: function(formData) {
        dispatch(submitOrder(formData));
      }
    };
  }

  connect(['bottomSubmit'], mapStateToProps, mapDispatchToProps)(render, actionsInit);
};
```

* **connectKeys**

组件与 `store` 关联的字段，当配置的字段数据发生变化，则会引起该组件的重渲染

> 与 `react` 具备虚拟 DOM，通过底层运算实现组件或者局部模块的自动化更新不同，基于 `jQuery` 的开发框架都是比较陈旧而且与 DOM 强关联的，而且 `jQuery` 基础库本身只提供了一些脚本操作的语法糖等，并没有配套的自动更新或者局部更新组件的工具。所以，我们希望以最小的成本来达到 `页面级别的局部更新` —— 就是自定义配置组件与数据的关联字段

* **mapStateToProps**

与 `react-redux` 中的 API 一致，接收全局的 `store`，根据业务需要返回相关的数据字段

* **mapDispatchToProps**

与 `react-redux` 中的 API 一致，接收 `store.dispatch` 方法，通过传入该方法，我们可以调用到已定义的 `action creators`，并返回供组件调用的方法

* **render**

页面渲染函数，接收 `mapStateToProps` 的返回值作为参数。该函数只应该做 UI 渲染相关的操作，因为组件关联的数据发生变化会引起组件的重渲染，即该函数会被重新执行。所以，为了避免未知的 bug，如果组件与 `store` 的数据有关联，请不要在该函数中做任何与 `事件绑定` 的操作

* **actionsInit**

事件绑定初始化函数，接收 `mapDispatchToProps` 的返回值作为参数。该函数用来进行事件绑定相关操作，因为接收的参数可以让我们触发 `action`，所以 DOM 相关事件以及请求相关的操作都在该函数中执行。同时，该函数只会在组件渲染执行一次，后续将不会再次执行

## Example

该组件已在生产环境使用，以下是从项目中简化出来的示例代码

* 获取代码仓库

```shell
$ git clone https://github.com/FrendEr/jquery-redux.git
$ cd jquery-redux/example
```

* 安装依赖

```shell
$ yarn install
```

* 本地运行

```shell
$ npm start
$ open http://localhost:8080/src/
```
