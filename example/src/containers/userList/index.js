import $ from 'jquery';
import './style.less';
import Template from './views/template.dot';
import connect from '../../store/connect';
import { fetchData } from '../../actions';

module.exports = function() {
  function render({ userList }) {
    const html = Template({ userList });
    $('#content').html(html);
  }

  function actionsInit(actions) {
    $('#fetchBtn').on('click', function() {
      actions.fetchData();
    });
  }

  function mapStateToProps(state) {
    return {
      ...state
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      fetchData: function() {
        dispatch(fetchData());
      }
    };
  }

  connect(['userList'], mapStateToProps, mapDispatchToProps)(render, actionsInit);
};
