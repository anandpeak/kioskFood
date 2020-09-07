import React from 'react';
import nomchLogo from '../../imgs/nomch-logo.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      password: '',
    };
  }

  _handleInputChange = (el) => {
    this.setState({ [el.target.name]: el.target.value });
  };

  submitLogin = () => {
    const data = { _phone: 98100122, _password: 1111 };

    fetch('http://dev.nomch.mn/mobile/api/v2/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data ,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  render() {
    console.log('this.state = ', this.state);
    return (
      <div className='container-fluid loginContainer'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mt100 text-center'>
              <img src={nomchLogo} height='70px' />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mt100'>
              <div className='nomch-login-form'>
                <div className='nomch-login-blk'>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <h3
                      style={{
                        textTransform: 'uppercase',
                        color: 'white',
                        marginBottom: '20px',
                      }}
                    >
                      Login
                    </h3>
                  </div>
                  <div>
                    <label>Mobile number</label>
                    <input
                      onChange={this._handleInputChange}
                      name='phoneNumber'
                      type='text'
                    ></input>
                  </div>
                  <div>
                    <label>Password</label>
                    <input
                      onChange={this._handleInputChange}
                      name='password'
                      type='text'
                    ></input>
                  </div>
                  <button onClick={this.submitLogin} type='submit'>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
