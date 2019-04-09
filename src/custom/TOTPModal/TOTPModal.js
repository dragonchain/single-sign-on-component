import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
} from 'reactstrap';
import { hopperApi, cognitoApi } from '../../lib';
import CustomForm from '../CustomForm';

class TOTPModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recoveryCode: '',
      verificationCode: '',
      success: '',
      error: '',
    };
  }

  handleInputChange = (e, stateItem) => {
    const { value } = e.target;
    this.setState({ [stateItem]: value });
  }

  submitTotpCode = async (e) => {
    e.preventDefault();
    const { verificationCode } = this.state;
    const { pendingSession, handleLoginSuccess } = this.props;

    if (verificationCode) {
      try {
        await cognitoApi.sendMFACode(verificationCode, pendingSession)
        const userData = await cognitoApi.checkSession(true)
        await handleLoginSuccess(userData)
      } catch (err) {
        this.setState({ error: err && err.message });
      }
    }
  }

  submitRecoveryCode = async (e) => {
    e.preventDefault();
    const { username, password, handleLoginSuccess } = this.props;
    const { recoveryCode } = this.state;

    if (recoveryCode) {
      try {
        const result = await hopperApi.useTotpRecoveryCode(username, recoveryCode);
        if (result) {
          this.setState({ success: 'Success. Logging in...' })
          const userData = await cognitoApi.login(username, password);
          handleLoginSuccess(userData);
        } else {
          this.setState({ error: 'Invalid recovery code.' })
        }
      } catch (err) {
        this.setState({ error: err })
      }
    }
  }

  renderBaseModal = () => {
    const { error } = this.state;
    const { toggle } = this.props;

    return (
      <Modal isOpen className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Enter 2FA Code</ModalHeader>
        <ModalBody>
          <CustomForm errormessage={error} onSubmit={async (e) => await this.submitTotpCode(e)}>
            <Input placeholder="Verification Code" className="mb-4" onChange={e => this.handleInputChange(e, 'verificationCode')}></Input>
            <ButtonGroup className="float-left">
              <Button color="primary" type="submit">Submit</Button>
              <Button onClick={toggle}>Close</Button>
            </ButtonGroup>
            <ButtonGroup className="float-right">
              <Button onClick={() => this.setState({ recoveryModal: true, error: null, success: null })}>Use Recovery Code</Button>
            </ButtonGroup>
          </CustomForm>
        </ModalBody>
      </Modal>
    );
  }

  renderRecoveryModal = () => {
    const { error, success } = this.state;
    const { toggle } = this.props;
    return (
      <Modal isOpen className={this.props.className}>
        <ModalHeader toggle={this.toggle}>2FA Recovery Code</ModalHeader>
        <ModalBody>
          <CustomForm errormessage={error} successmessage={success} onSubmit={async (e) => await this.submitRecoveryCode(e)}>
            <div className="mb-4 text-dark">Enter your secret 2FA recovery code here. After you login, you will need to disable and reenable your 2FA setting.</div>
            <Input placeholder="Recovery Code" className="mb-4" onChange={e => this.handleInputChange(e, 'recoveryCode')} />
            <ButtonGroup className="float-left">
              <Button color="primary" type="submit">Submit</Button>
              <Button onClick={toggle}>Close</Button>
            </ButtonGroup>
          </CustomForm>
        </ModalBody>
      </Modal>
    );
  }

  render() {
    return this.state.recoveryModal ? this.renderRecoveryModal() : this.renderBaseModal();
  }
}

export default TOTPModal;