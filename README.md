# jQuery Redux

jQuery bindings for Redux.

[![image](https://img.shields.io/npm/v/jquery-redux.svg)](https://www.npmjs.com/package/jquery-redux)

## Installation

```sh
npm install --save jquery-redux
```

## API

### `createConnect(store)`

创建用来绑定 `store` 与 `component` 的 **connect** 函数

```
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

```
import $ from 'jquery';
import './style.less';
import Template from './views/template.dot';
import connect from '../../store/connect';
import { submitOrder } from '../../actions';
import getFormData from '../../utils/getFormData';

import importantNoticeValidate from '../important-notice/validate';
import travelScheduleValidate from '../travel-schedule/validate';

module.exports = function(data) {
  function render({ bottomSubmit }) {                           // UI 渲染
    const html = Template(bottomSubmit);
    $('#contentBottom').append(html);
  }

  function actionsInit(actions) {
    $(document.body).on('click', '#submitBtn', function() {     // 事件绑定
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

  function mapStateToProps(state) {                             // 数据映射           
    return state;
  }

  function mapDispatchToProps(dispatch) {                       // 事件映射
    return {
      submitOrder: function(formData) {
        dispatch(submitOrder(formData));
      }
    };
  }

  connect(['bottomSubmit'], mapStateToProps, mapDispatchToProps)(render, actionsInit);
};
```
