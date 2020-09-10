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
      show_all: true,
      show_info: false,
      show_pagination: false,
      dynamic: true,
      excelFileName: 'Excel',
      sort: {
        column: 'time',
        order: 'desc',
      },
    };

    this.columns = [
      {
        key: 'time',
        text: 'Цаг',
        align: 'left',
        width: 100,
        sortable: false,
      },
      {
        key: 'grade',
        text: 'Бүлэг',
        width: 100,
        align: 'left',
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

    if (schoolId && token) {
      fetch(
        `http://dev.nomch.mn/mobile/api/v2/kiosk/report?school=${schoolId}`,
        {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
            'Access-Control-Allow-Headers': 'Content-Type',
            Authorization: 'Bearer ' + token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.data && data.data.sales) {
            let tmpRecords = [];

            data.data.sales.forEach((sale, index) => {
              let saleObj = {};

              if (sale.usedDate && sale.usedDate.date) {
                saleObj.time = sale.usedDate.date.substring(11, 16);
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
          staticFirstRow={false}
        />
      </div>
    );
  };

  print = () => {
    let style = '<style>';
      style= style+'.schoolLogo {width:30%; height:20%}';
      style=style+'.logoLine{display:flex}';
      style=style+'.dateLogoContainer{margin-left:5%}';
      style=style+'.rowContainer{display:flex; width: 100%;}';
      style=style+'.row-class{width: 20%; padding: 0.5em 1em;}';
      style=style+'.row-studentcode{width: 30%; padding: 0.5em 1em;}';
      style=style+'.row-studentname{width: 40%; padding: 0.5em 1em; flex-wrap: wrap; word-wrap: break-word;}';
      style=style+'.row-food{width:30%; padding: 0.5em 1em}';
      style=style+'.row-foodNumber{width:20%; padding: 0.5em 1em}';
      style=style+'.row-foodPrice{width:20%; padding: 0.5em 1em}';
      style=style+'.row-foodTotal{width:30%; padding: 0.5em 1em}';
      style=style+'.row-total{width:40%; padding: 0.5em 1em;font-weight: bold;}';
      style=style+'.row-totalNumber{width:30%; padding: 0.5em 1em;font-weight: bold;}';
      style=style+'.row-totalPrice{display:flex;justify-content: flex-end;font-weight: bold;padding: 0.5em 1em}';

    style = '</style>';

    var win = window.open('', '_blank');
    win.document.write('<html><head>');
    // win.document.write('<title>' + this.config.filename + '</title>');
    win.document.write(style);
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write('<div style="display:flex">');
      win.document.write(
        `<img style="width:30%; height:20%" src="https://m.zangia.mn/s/2006/1N-ADAMOY9-S4ADEWR-BM021UK-22.jpg"></img>`
      );
      win.document.write('<div style="margin-left:5%;">');
        win.document.write('<div class="dateLogo">'+'2020-9-10'+'</div>');
        win.document.write('<div class="dateLogo">'+'11:07'+'</div>');
      win.document.write('</div>');
    win.document.write('</div>');
    win.document.write('<div style="display:flex; width: 100%;">');
        win.document.write('<p style="width: 20%; padding: 0.5em 1em;">'+'1-1'+'</p>');
        win.document.write('<p style="width: 30%; padding: 0.5em 1em;">'+'SM077003'+'</p>');
        win.document.write('<p style="width: 40%; padding: 0.5em 1em; flex-wrap: wrap; word-wrap: break-word;">'+'baatarasdfaasdsdssdas'+'</p>');
    win.document.write('</div>');
    win.document.write('<hr>');
    win.document.write('<div style="display:flex; width: 100%;">');
      win.document.write('<p style="width:30%; padding: 0.5em 1em;">'+'Хоол'+'</p>');
      win.document.write('<p style="width:20%; padding: 0.5em 1em;">'+'2'+'</p>');
      win.document.write('<p style="width:20%; padding: 0.5em 1em;">'+'4000'+'</p>');
      win.document.write('<p style="width:30%; padding: 0.5em 1em;">'+'8000'+'</p>');
    win.document.write('</div>');
    win.document.write('<hr>');
    win.document.write('<div style="display:flex; width: 100%;">');
      win.document.write('<p style="width:40%; padding: 0.5em 1em;font-weight: bold;">'+'Нийт дүн'+'</p>');
      win.document.write('<p style="width:30%; padding: 0.5em 1em;font-weight: bold;">'+'2'+'</p>');
      win.document.write('<p style="display:flex;justify-content: flex-end;font-weight: bold;padding: 0.5em 1em">'+'8000'+'</p>');
    win.document.write('</div>');
    win.document.write('<hr>');
    win.document.write('<hr>');
    win.document.write('<div>');
        win.document.write('<p style="display:flex;font-size:10px; justify-content: center">'+'COPYRIGHT@NOMCH IT CONSULTING LLC'+'</p>');
        win.document.write('<p style="display:flex;font-size:10px; justify-content: center">'+'77890122'+'</p>');
    win.document.write('</div>');
  
    win.document.write('</body></html>');
    win.print();
    win.close();
  };

  _tabChange = (e, { activeIndex }) => {
    this.setState({ activeIndex });
  };

  _expandBtn = () => {
    this.print();
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
    console.log('event = ', event);
    if (event) {
      this.setState({ studentBarCode: this.state.studentBarCode + `${event}` });
    }
  };

  userHandleSubmit = async () => {
    const { studentBarCode } = this.state;

    if (studentBarCode !== '' && this.state.schoolId) {
      await fetch(
        `http://dev.nomch.mn/mobile/api/sale/food/usage?school_id=${this.state.schoolId}&nfcCode=${studentBarCode}`,
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
        .then(async (res) => {
          if (res.data) {
            if (res.data.sale) {
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
                    nfcCode: studentBarCode,
                  };

                  let isSuccess = false;

                  await fetch(
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
                      console.log('BARD = ');
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });

                  if (isSuccess) {
                    await fetch(
                      `http://dev.nomch.mn/mobile/api/v2/kiosk/report?school=${this.state.schoolId}`,
                      {
                        method: 'GET',
                        headers: {
                          'Access-Control-Allow-Origin': '*',
                          'Content-Type':
                            'application/x-www-form-urlencoded;charset=UTF-8;',
                          'Access-Control-Allow-Headers': 'Content-Type',
                          Authorization: 'Bearer ' + this.state.token,
                        },
                      }
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.data && data.data.sales) {
                          let tmpRecords = [];
                          data.data.sales.forEach((sale) => {
                            let saleObj = {};
                            if (sale.usedDate && sale.usedDate.date) {
                              saleObj.time = sale.usedDate.date.substring(
                                11,
                                16
                              );
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
                  }
                  setTimeout(() => {
                    this.setState({
                      eatStatus: '',
                      studentLastName: '',
                      studentFirstName: '',
                      studentCode: '',
                      studentAvatar: '',
                      studentBarCode: '',
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
                    studentLastName: '',
                    studentFirstName: '',
                    studentCode: '',
                    studentAvatar: '',
                    studentBarCode: '',
                  });
                }, 3000);
              }
            }
          } else {
            console.log('BARCODE = ', this.state.studentBarCode);
            this.setState({
              eatStatus: '',
              studentLastName: '',
              studentFirstName: '',
              studentCode: '',
              studentAvatar: '',
              studentBarCode: '',
            });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  removeRepeat = () => {
    this.setState({ confirmModal: false });

    setTimeout(() => {
      this.setState({
        eatStatus: '',
        studentLastName: '',
        studentFirstName: '',
        studentCode: '',
        studentAvatar: '',
        studentBarCode: '',
      });
    }, 2000);
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
        console.log('BARD1 = ', data);
        isSuccess = data.success;
      })
      .catch((error) => {
        console.error('Error:', error);
      });

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
                saleObj.time = sale.usedDate.date.substring(11, 16);
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
          studentLastName: '',
          studentFirstName: '',
          studentCode: '',
          studentAvatar: '',
          studentBarCode: '',
        });
      }, 3000);
    }
  };

  enterPress = (target) => {
    if (target.key) {
      if (target.charCode === 13) {
        this.userHandleSubmit();
        console.log('asdfasdf');
      } else {
        this.studentBarCodeChange(target.key);
      }
    }
  };

  render() {
    document.addEventListener('keypress', this.enterPress);
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
            <div style={{ display: 'none' }}>
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
