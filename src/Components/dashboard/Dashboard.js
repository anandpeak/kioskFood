import React from 'react';

import {
  Tab,
  Header,
  Button,
  Icon,
  Dropdown,
  Checkbox,
  Modal,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';
import qs from 'querystring';
import DataTable from '../widgets/datatable/DataTable';
// import { NDropdown as Dropdown } from '../widgets/Dropdown';
import happyIcon from './happyIcon.png';
import cryIcon from './cryIcon.png';
//SM1801005 M01 M17 TS1906017 TS1906019
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      isExpand: false,
      token: '',
      success: false,
      items: [],
      schoolId: null,
      panes: [],
      isToggled: false,
      studentBarCode: '3984008027',
      eatStatus: '',
      studentAvatar: '',
      studentFirstName: '',
      studentLastName: '',
      studentCode: '',
      confirmModal: false,
      recordsToShow: [],
    };

    this.config = {
      show_all: false,
      show_info: false,
      show_pagination: false,
      dynamic: true,
      excelFileName: 'Excel',
    };

    this.columns = [
      {
        key: 'time',
        text: 'Цаг',
        align: 'center',
        width: 100,
        sortable: false,
        staticFirstRow: false
      },
      {
        key: 'grade',
        text: 'Бүлэг',
        width: 100,
        align: 'center',
        sortable: false,
      },
      {
        key: 'student',
        text: 'Сурагч',
        width: 250,
        align: 'left',
        sortable: false,
        colType: 'html',
      },
    ];
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const success = JSON.parse(localStorage.getItem('success'));
    const items = JSON.parse(localStorage.getItem('items'));
    const schoolId = localStorage.getItem('schoolId');

    if (token && success && schoolId && items) {
      // fetch(`http://dev.nomch.mn/mobile/api/sale/items?school_id=1&code=BUS`, {
      //   method: 'GET',
      //   headers: {
      //     'Access-Control-Allow-Origin': 'http://localhost:3006/dashboard',
      //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
      //     'Access-Control-Allow-Headers': 'Content-Type',
      //     Authorization: 'Bearer ' + token,
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (data.data) {
      //       console.log('Data = ', data.data);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });

      let panes = [];

      if (items.length > 0) {
        items.forEach((item) => {
          panes.push({ menuItem: item.name, render: this.renderFoodList });
        });

        this.setState({ panes });
      }

      this.setState({ token, success, items, schoolId });
    } else {
      window.location = '/';
    }
  }

  renderFoodList = () => {
    return (
      <div>
        <DataTable
          className='table table-bordered dataTableHeaderColor width-auto'
          columns={this.columns}
          config={this.config}
          records={this.state.recordsToShow}
        />
      </div>
    );
  };

  _tabChange = (e, { activeIndex }) => {
    this.setState({ activeIndex });
  };

  _expandBtn = () => {
    this.setState({ isExpand: !this.state.isExpand });
  };

  toggleCheckbox = () => {
    this.setState({ isToggled: !this.state.isToggled });
  };

  signOut = () => {
    this.setState({ token: '', success: false });
    localStorage.setItem('token', '');
    localStorage.setItem('success', false);

    window.location = '/dashboard';
  };

  studentBarCodeChange = (event) => {
    if (event) {
      this.setState({ studentBarCode: event.target.value });
    }
  };

  userHandleSubmit = async (event) => {
    if (this.state.studentBarCode !== '') {
      fetch(
        `http://dev.nomch.mn/mobile/api/sale/food/usage?school_id=${this.state.schoolId}&nfcCode=${this.state.studentBarCode}`,
        {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
            'Access-Control-Allow-Headers': 'Content-Type',
            Authorization: 'Bearer ' + this.state.token,
          },
        }
      )
        .then((data) => data.json())
        .then((res) => {
          console.log('Res', res);
          if (res.data) {
            if (
              res.data.sale &&
              res.data.sale.remain &&
              res.data.sale.used_today_count
            ) {
              if (res.data.sale.remain > 0) {
                // unuudur hool idsen eseh
                if (res.data.sale.used_today_count > 0) {
                  this.setState({
                    studentAvatar:
                      res.data.student && res.data.student.avatar
                        ? res.data.student.avatar
                        : '',
                    studentCode:
                      res.data.student && res.data.student.code
                        ? res.data.student.code
                        : '',
                    studentFirstName:
                      res.data.student && res.data.student.first_name
                        ? res.data.student.first_name
                        : '',

                    studentLastName:
                      res.data.student && res.data.student.last_name
                        ? res.data.student.last_name
                        : '',
                    confirmModal: true,
                  });
                } else {
                  this.setState({
                    eatStatus: 'canEat',
                    studentAvatar:
                      res.data.student && res.data.student.avatar
                        ? res.data.student.avatar
                        : '',
                    studentCode:
                      res.data.student && res.data.student.code
                        ? res.data.student.code
                        : '',
                    studentFirstName:
                      res.data.student && res.data.student.first_name
                        ? res.data.student.first_name
                        : '',

                    studentLastName:
                      res.data.student && res.data.student.last_name
                        ? res.data.student.last_name
                        : '',
                  });

                  const data = {
                    school: this.state.schoolId,
                    nfcCode: this.state.studentBarCode,
                  };

                  fetch(
                    'http://dev.nomch.mn/mobile/api/sale/food/usage_submit',
                    {
                      method: 'POST',
                      headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type':
                          'application/x-www-form-urlencoded;charset=UTF-8;',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        Authorization: 'Bearer ' + this.state.token,
                      },
                      body: qs.stringify(data),
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log('BARD = ', data);
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });

                  setTimeout(() => {
                    this.setState({
                      eatStatus: '',
                    });
                  }, 3000);
                }
              } else {
                this.setState({
                  eatStatus: 'noPrivilege',
                  studentAvatar:
                    res.data.student && res.data.student.avatar
                      ? res.data.student.avatar
                      : '',
                  studentCode:
                    res.data.student && res.data.student.code
                      ? res.data.student.code
                      : '',
                  studentFirstName:
                    res.data.student && res.data.student.first_name
                      ? res.data.student.first_name
                      : '',

                  studentLastName:
                    res.data.student && res.data.student.last_name
                      ? res.data.student.last_name
                      : '',
                });
                setTimeout(() => {
                  this.setState({
                    eatStatus: '',
                  });
                }, 3000);
              }
            }
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  removeRepeat = () => {
    this.setState({ confirmModal: false });
  };

  confirmRepeat = async () => {
    this.setState({ confirmModal: false, eatStatus: 'canEat' });

    const data = {
      school: this.state.schoolId,
      nfcCode: this.state.studentBarCode,
    };

    let isSuccess = false;

    await fetch('http://dev.nomch.mn/mobile/api/sale/food/usage_submit', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
        'Access-Control-Allow-Headers': 'Content-Type',
        Authorization: 'Bearer ' + this.state.token,
      },
      body: qs.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('BARD = ', data);
        isSuccess = data.success;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    console.log('isSuccess = ', isSuccess);

    if (isSuccess) {
      await fetch(
        `http://dev.nomch.mn/mobile/api/v2/kiosk/report?school=${this.state.schoolId}`,
        {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
            'Access-Control-Allow-Headers': 'Content-Type',
            Authorization: 'Bearer ' + this.state.token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.data && data.data.sales) {
            console.log('Data = ', data.data);
            let tmpRecords = [];
            data.data.sales.forEach((sale) => {
              let saleObj = {};

              if (sale.usedDate && sale.usedDate.date) {
                saleObj.time = sale.usedDate.date.substring(11, 19);
              }
              if (sale.className) {
                saleObj.grade = sale.className;
              }
              if (sale.studentCode && sale.firstName) {
                saleObj.student = `<b>${sale.studentCode}</b> ${sale.firstName}`;
              }
              tmpRecords.push(saleObj);
            });

            this.setState({ recordsToShow: tmpRecords });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      setTimeout(() => {
        this.setState({
          eatStatus: '',
        });
      }, 3000);
    }
  };

  render() {
    console.log('state = ', this.state);
    return (
      <div className='container-fluid containerDashboard'>
        <div className='row headerRectangle'>
          <div className='col-12 headerIcon'>
            {this.state.isToggled ? (
              <Icon
                name='print'
                size='big'
                className='icon'
                style={{ color: 'white', marginRight: '15px' }}
              />
            ) : null}
            <Dropdown
              icon='user big'
              floating
              labeled
              button
              direction='left'
              style={{ color: 'white' }}
              // className='big'
              size='large'
              simple
            >
              <Dropdown.Menu>
                <Dropdown.Item>
                  {/* <Icon name='attention' className='right floated' /> */}
                  Хоолны тогооч
                </Dropdown.Item>
                <Dropdown.Item style={{ width: '200px' }}>
                  {this.state.isToggled ? (
                    <Checkbox
                      toggle
                      defaultChecked
                      className='right floated'
                      onChange={this.toggleCheckbox}
                    />
                  ) : (
                    <Checkbox
                      toggle
                      className='right floated'
                      onChange={this.toggleCheckbox}
                    />
                  )}
                  Талон хэвлэх
                </Dropdown.Item>
                <Dropdown.Item onClick={this.signOut}>
                  {/* <Icon name='conversation' className='right floated' /> */}
                  Гарах
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className='row'>
          <div
            className='col-6'
            style={this.state.isExpand ? { display: 'none' } : null}
          >
            <Tab
              menu={{
                secondary: true,
                pointing: true,
                className: 'primaryColor',
              }}
              style={{ margin: '20px' }}
              onTabChange={this._tabChange}
              activeIndex={this.state.activeIndex}
              panes={this.state.panes}
            />
            <div>
              <label>
                <input
                  type='text'
                  name='name'
                  value={this.state.studentBarCode}
                  onChange={this.studentBarCodeChange}
                />
              </label>
              <input
                type='button'
                value='submit'
                onClick={this.userHandleSubmit}
              />
            </div>
          </div>
          <div
            className={
              this.state.isExpand
                ? 'col-12 mainHeight'
                : 'col-6 shadow mainHeight'
            }
          >
            <div className='imgExpandBtn'>
              {this.state.isExpand ? (
                <i
                  className='fa fa-compress fa-2x'
                  onClick={() => this._expandBtn()}
                ></i>
              ) : (
                <i
                  className='fa fa-expand fa-2x'
                  onClick={() => this._expandBtn()}
                ></i>
              )}
            </div>
            <div className='mainImgContainer'>
              {this.state.studentAvatar !== '' ? (
                <img className='mainImgStyle' src={this.state.studentAvatar} />
              ) : null}

              <div className='imgTxtContainer'>
                {/* <h4 className='imgTxt'>1-A</h4> */}
                <h4 className='imgTxt'>
                  {this.state.studentCode !== ''
                    ? this.state.studentCode
                    : null}
                </h4>
                <h4 className='imgTxt'>
                  {this.state.studentLastName !== ''
                    ? this.state.studentLastName
                    : null}
                </h4>
                <h3 className='imgTxt blue_text'>
                  {this.state.studentFirstName !== ''
                    ? this.state.studentFirstName
                    : null}
                </h3>
              </div>
            </div>
            <div className='toastInfoContainer'>
              {this.state.eatStatus === 'canEat' ? (
                <>
                  <img src={happyIcon} />
                  <div className='txtConatiner'>
                    <h4 className='toastTxt'>Сайхан хооллоорэй</h4>
                    <h4 className='toastTxt'>Have a nice meal</h4>
                  </div>
                </>
              ) : this.state.eatStatus === 'noPrivilege' ? (
                <>
                  <img src={cryIcon} />
                  <div className='txtConatiner'>
                    <h5 className='toastTxtNoMeal'>Хоолны эрх байхгүй байна</h5>
                    <h5 className='toastTxtNoMeal'>You've no meal pass</h5>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <Modal
          closeIcon
          open={this.state.confirmModal}
          centered={true}
          // trigger={<Button>Show Modal</Button>}
          onClose={this.removeRepeat}
          // onOpen={() => setOpen(true)}
          size={'large'}
        >
          <Header icon='food' content='Хоол идэх' />
          <Modal.Content>
            <p>
              Та өнөөдөр хоол идсэн байна. Дахин хоол идэхийг баталгаажуулах уу?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.removeRepeat}>
              <Icon name='remove' /> Цуцлах
            </Button>
            <Button color='green' onClick={this.confirmRepeat}>
              <Icon name='checkmark' /> Батлах
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default Dashboard;
