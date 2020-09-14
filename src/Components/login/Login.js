import React from 'react';
import nomchLogo from '../../imgs/nomch-logo.png';
import { Dimmer, Segment, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import qs from 'querystring';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      password: '',
      loader: false,
    };
  }

  _handleInputChange = (el) => {
    this.setState({ [el.target.name]: el.target.value });
  };

  submitLogin = async () => {
    const data = { _phone: '99030864', _password: '1111' };
    let token = null;

    await fetch('http://dev.nomch.mn/mobile/api/v2/auth/login', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: qs.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success === true) {
          if (data.data && data.data.token) {
            this.setState({ loader: true });
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('success', true);
            token = data.data.token;
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    if (token !== null) {
      await fetch('http://dev.nomch.mn/mobile/api/v2/kiosk/init', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
          'Access-Control-Allow-Headers': 'Content-Type',
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data) {
            if (data.data && data.data.schools.length > 0) {
              localStorage.setItem('schoolId', data.data.schools[0].schoolId);
              localStorage.setItem(
                'items',
                JSON.stringify(data.data.schools[0].items)
              );
              window.location = '/dashboard';
              this.setState({ loader: false });
            } else {
              this.setState({ loader: false });
            }
          }
        });
    }
  };

  render() {
    console.log('this.state = ', this.state);
    return (
      <div className='container-fluid loginContainer'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mt100 text-center'>
              <img
                src={nomchLogo}
                style={{ marginBottom: '15px' }}
                height='70px'
              />
              <h3 className='welcomeTxt'>Please welcome </h3>
              <h3 className='welcomeTxt'>to Nomch!</h3>
              <div className="welcomeDtlTxt">
                <p>The main platform for school, teachers and parents</p>
                <p>sharing data about their children</p>
              </div>
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
                        fontFamily: 'GothamProCryllic',
                        fontWeight: 'bold',
                      }}
                    >
                      Login
                    </h3>
                  </div>
                  <div className='loginTxtContainer'>
                    <label className='loginTxt'>Mobile number</label>
                    <input
                      onChange={this._handleInputChange}
                      name='phoneNumber'
                      className='form-control'
                      placeholder='Mobile number'
                      type='text'
                    ></input>
                  </div>
                  <div className='loginTxtContainer'>
                    <label className='loginTxt'>Password</label>
                    <input
                      onChange={this._handleInputChange}
                      name='password'
                      type='password'
                      className='form-control'
                      placeholder='Password'
                    ></input>
                  </div>
                  <button
                    onClick={this.submitLogin}
                    className='btn btn-primary'
                    type='submit'
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.loader ? (
          <Dimmer active>
            <Loader size='medium'>Loading</Loader>
          </Dimmer>
        ) : null}
      </div>
    );
  }
}

export default Login;
