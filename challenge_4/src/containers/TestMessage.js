import { connect } from 'react-redux';
import { actionTester } from '../actions/actions'
import TestComponent from '../components/TestComponent';

const mapStateToProps = state => {
  return {
    testMessage: state.test
  }
};

const mapDispatchToProps = dispatch => {
  return {
    testOnClick: (buttonText) => {
      let newText = buttonText === '' ? 'clicked' : '';
      dispatch(actionTester(newText));
    }
  }
}

const TestMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent);

export default TestMessage;