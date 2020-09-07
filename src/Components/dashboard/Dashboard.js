import React from 'react';

import { Tab } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';

import DataTable from '../widgets/datatable/DataTable';
import { NDropdown as Dropdown } from '../widgets/Dropdown';
import happyIcon from './happyIcon.png';

const options = [
  {
    key: 'chief',
    className: 'fas fa-exchange-alt',
    text: `Хоолны тогооч`,
    value: 'change',
  },
  {
    key: 'print',
    className: 'fas fa-trash-alt',
    text: 'Талон хэвлэх',
    value: 'print',
  },
  {
    key: 'signOut',
    className: 'fas fa-trash-alt',
    text: 'Гарах',
    value: 'signOut',
  },
];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      isExpand: false,
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
      },
    ];
  }

  renderFoodListMorning = () => {
    return (
      <div>
        <DataTable
          className='table table-bordered dataTableHeaderColor width-auto'
          columns={this.columns}
          config={this.config}
        />
      </div>
    );
  };

  renderFoodList = () => {
    return <div>asdfs</div>;
  };

  _tabChange = (e, { activeIndex }) => {
    this.setState({ activeIndex });
  };

  _dropdownChange = (state, questionId, data) => {
    if (data.value === 'print') {
      // this.props.removeQuestion(questionId);
    } else if (data.value === 'signOut') {
      // this.props.orderQuestion();
    } else if (data.value === 'chief') {
    }
  };

  _expandBtn = () => {
    console.log('state=', this.state);
    this.setState({ isExpand: !this.state.isExpand });
  };

  render() {
    return (
      <div className='container-fluid containerDashboard'>
        <div className='row headerRectangle'>
          <div className='col-12 headerIcon'>
            <i className='fa fa-print fa-3x iconWhite'></i>
            <Dropdown
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              className='fa fa-user fa-3x courseQuestionDropdown iconWhite'
              floating
              direction='left'
              options={options}
              onChange={(event, data) =>
                this._dropdownChange('userId', 1, data)
              }
              trigger={<></>}
            />
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
              panes={[
                {
                  menuItem: 'Өглөөний цай',
                  render: this.renderFoodListMorning,
                },
                { menuItem: 'Өдрийн хоол', render: this.renderFoodList },
              ]}
            />
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
                  class='fa fa-compress fa-2x'
                  onClick={() => this._expandBtn()}
                ></i>
              ) : (
                <i
                  class='fa fa-expand fa-2x'
                  onClick={() => this._expandBtn()}
                ></i>
              )}
            </div>
            <div className='mainImgContainer'>
              <img
                className='mainImgStyle'
                src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PEBAQDw8ODxAPDw8PEBUQDxANERAPFREWFhUVFRUYHSggGBolGxU
            VITEhJyorLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGzUdHyUtLTAtLTEtLzUtNSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAK
            gBLAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EADsQAAIBAwIDBgMGBAYDAQAAAAECAAMEERIhBTFBBhNRYXGBIpGhFCMyscHwB1Ji0TNCcoLh8RWjshb/xAAZAQEAAwEBA
            AAAAAAAAAAAAAAAAQIDBAX/xAApEQEBAAICAgAFAwUBAAAAAAAAAQIRAyESMQQiMkFxE1GxQmGBkdEj/9oADAMBAAIRAxEAPwD2OEIssqIQhAIQhAIQhAIQhAIQhAIQhAIQhAIQmB2m7QpaqVUg1T76R4+si
            3SZN9L3FeMUbYHW2WxkKN2Pr4CcLxXtpUbOlhTB5BAGOPNicfIznOIXlSsSWJ3OTnJ3/UyktEdR7nf/ALmNytbzCReueMs+SXrP55ZpVXjdWkco9RDnP42Ep3dfHInP76DYTIrsWOTgDzx/aV0s7+07c3bq
            ADT25tpyT/eXrLt86tpqgN5j4D9TPOrC6VG55J9pbuDvkHHnzB+seV2jwlj2rhnGqNwMo3qOomhqnhNhxWrbsGU6d+YJK+/UT1bsxx1LqmCCAw2YZ5Hy8prjnv2yyw06DMTMj1Q1S6iTMXMizFzIEgMXMYDFBk
            h8I0GKIQWLEhAWESEC1FhCSCEIQCEIQCEIQCEIQCEIQCEIQCEIhgVOK3ooUnqHki59T0Anj/EL41ajOxySxPv6Tqf4pca7sU7ZTuR31THPTyUepOZwFpWzucZ/LpgTLK9t8JqNDR1P7/fhGuvXkOf/AHJLWmzfEd
            h6b+3h++UlBRjhQXPlsox/V1P0lMs9NccNse4ojpj33+QMzatpk7t9D+k62nw6pWOAgVRzO8lfs3jckn5frOfLl03x4d+3J2lgM7A8/DEtV6bDYc84PnOhqWS0RnBz0z4yhTtixJ6fpKfq1p+jGC9FgeRBx6giX
            +z/ABJ7eqtRMjH4lG4ZevrNGvZkdJl1bcZyMBvofWaY8m2OfFp7NZXa1aaVFOQ6hh7iT6pxHYXinwmgxIwcpnp4j9fnOxzOrHLccWWOrpOGjg0rho5WltqrIMcDIFaSAyRIDHAyMGOElB8IkUQgsIkIFyEISQQh
            CAQhCAQhCAQhCAQhCAQhCARlRwoJOwAJj5mdoXxbV8czScD5SKmPJOLXDXdatWZWIq1DpBJ2QbLp222AkVOwCfEyMoG4DEfMDp6x1W4FM4IGo8l2zjzmfeX71m07kDp++U5buuyai3Wue9Ohfw8tsLny58p0nAOFM
            2AAByyfLwmTweywAdO7HnjHrid5wSnhR9ZSzvTSXU2uUuHqiAKOX1lG/VKYy25P4QNyT5ATVeox2X3J5e3jKdS2UHUd2PNjuYzxmuk4ZXfblbjh9Ss2p/gXov8AeOSzCCdDVSZtwuMzls06ZltlVqQmLfWALZA9Zvu
            ZSqDMY+030ocKHdVRnlpznG6/1eYHXyzPQrKvrRT5YPrORsUH2mh46ao+n/c3+HkU6j0v8pw6eh6fPPtO3j6edyztrZjlMizHqZswTKZKpkKyRZaKpgY4SNY8SUHiKI0RZIdCJCELsIQkghCLAIQhAIQhAIkWEBIQh
            AImocsjMdiZfGCUGoc1ORKZ5ePbTjw87ppGcn/Efin2WyYg4aq4pA/yjBJPyH1nU0agdVYcmUH5ieRfxkvmq10tlVnSkmoqpAHePzLE7DC4+Zk5XpGM7SUuz32u0pvS+GqaNOqWB3fvED7+zD5TGsODVab6XVhpOD/
            zOx7MX4p8PtmIDM9OnRbDBl1UkFM7jn+CXL7NRDsMqN8dWHQHn67zimWtx33Heqy+EUTUfSPwrt+/30nZUKQRQo2A5+cwezFtp1HxM6VBGN32Z9dKlxXZR8FMt9BOfvuOujaTRcnPMDb5y72h7SfZtKihUbUcatI
            CKf6mJwPecLU7UXdxd06FH7MUqDUXXVWWn8BZgxwu42B8CccxJsuX0olmP1OupcWVuYZfXf6iOuXDLkSrwjNQAkA5Yq2NxqHPHlLPGkWku2058pW8s2xriuq5yQJRN5T/AJ1mZxHi9GkGZ0qVSuCVTSNKs2FYkkYB
            IPyi0ruhV7ovb1aHfLqpMx2cZwcEdR4S2OF1vRc5vW3ScLbVcIf8oo6lPMFix2+QnQPTy2oeAHPkc52+cw+E2ITIQ4OAy9cNk/Q4Hym9Qqah/Kw2I8DOnD04eT6k1N/HnLCSuJYpzWMqmWSLI1kiy8VSCOEascJKDhF
            iCKJKCxYkIQvQhCSFhCEAhCEAhCEAhCEAiRYQCZ3GQCh9DNGZ/FW+GZcv0t+C/MoWV46WFV1BZ6FOtpHPJVSV/SeB8W4sLosGJVwC7ls/eMTvsNzznqvHeIVaVjfJSOHKow3AypdVqAf7f1njdwtOohrEYbJQA7DPM
            k46SmN3jGmePjnXq/8ADrhxfhSaqgcVbmo9PSCppEHB58/ws3+6dDaUai1HpOrkaM03x8GkbEeR3z85N2E4Ytvw6zXOovS79iV0/FW+8xjyDY9psXXwDOMj8pXk4v6onj5/6az7CiEGPOaKnEp0jv7y2szxmmmV2hux8J5HyIyJyN9ZUdRIo0VY8yEUE+pxOyrgATjuNXahtI3JOABzJmfLbGvBNtHgVHA8gdukr9rBkCaXB6TqgLrnPh0lftFRyu/tF+gl/wDRw44Pb1gTUpqW06C26tpHTUN8eUnPCKLd2H1utIBaasdkH9OOUtWTEOVYYPTzGcS/cUhtM/PKdNfDH3pJw+no0jywpz9DNULnB5HoRM9aeyBeZwPTbc+uJqIJ2YTp52d7Ppt4/Mcv+JZpyBZOgmsZ1MskEjWSiWUPWOEaI4SQ4RYgiyUCLEiwheixIskEIQgEIQgEIQgEIRYCSOrVC+Z8JJGFAZXK6Xxm/bPrXNQnZTjyOJFVqhqZDnBx1mm1MTA7SUtKas4xMM7ZLb26eOS2SdOa4igcspAKsCp9DPOOD9nHuOICzKnRTqJUrHBZfs4qKG9iGxO5qVctkHY/mJ2PZV6ApkfdrVqH4tgGcDYb9fSU4fbX4n1uN5lAAAGAuwA2wMSC5TUCPKWmkJE63nsmgeRlhqmJRrVO7d1PRiR6HeBuAeonFldO/GbZ3afjgoLjmzHSPUzM4RaI/wB67qznfORgeQkfaFe8qIuM5YH0A3MQcA+z1O+oU6b06ro9ZGX4tQ56GyNOR6+kzwnlldumzxxkjYuLlUGNWQNxpqad/nMniHFy66c6cbeJ/OWK32cAlxUpuNewBZWJOVC53xg8yBynO8bcrqNAO7HYNUVUQbHffLHfp5S9wqMZj/dLUZgy1CxJXkT4eE17qsDpI6gGYvZvh7DBuXNVsZbICj0CjYTaqDvaowNs7+SiY3H5tRby1O2nbU8AHmcD28hLaCQ0hLCzukeXakUSdZEslWXVSLJBI1kokqniOEaI4SUHCLEEWSFhCLCF2LEiyQQhCAQhCAQhCARYQgNflImz0OJK4kLHEzz9tcPRlSq6+DfSct2w4mTT0ilUJJ6acTqWIPXMwe0qDum0gE4PtOfl34urg15Tpw1ENsxAGdsZyQfOaSPgShQUkr4E5loDeZNq3rPtBWRCvwuR+EvkkeR8Zs2fFteNVNgrDKsPHqpGTg+hM41JP3lQKypUamW5FcHB6HB2M24+azqufk4Zl3F264olR3J/CSVOea9MHwmbWuWpHZtSHkfDyMyLvhNzTt3rqNNRW30FXpVKZOCNAGU338MeEyRxWpSbuqyPQcj8FVWUMPFSen0k83DZ807i/Fy4/T6rtLRldgx5zfonAxzH6TzW1433bYOR5HYj0PIzquGdpKTAAsAfPacuPy1vnNrPFLQE5Bdf9JzMlrRQcks5/qOce01bq/VyMMPnOZ7W8aFnS16C7uSqLyXVjmx8PSX3llek3k1jq1o29Jidvn4CadtSC7D3PjPMOxHaisbh0uKhcVmB32COdl0jop2GPTznp9FpthxzH8uPk5Ll19l6lLCyrSMsoZtGFTLJUkKyZZKqVZIJGskEsg8RwjRHCEHCOEaI4SQsIQhC7FiRZIIQhAIQhAIQiwCEIQEMgdh12liQ1AOolM40wqtXUHpOd7SWIekxJYAD+Y7zpqqjG043tRVr6xSQkhs7KuTObknTs4PbGsaJC7Dlyj2yJucHtka1pMrBwy6gR5mVby2x0lLjpfylrODSUNtIaiYkbVMAnkBuSdsCVibE9S3v6jL9lqqlPThwzAKWz4FTnaZt7wm84hV7m5xRpoBgMhK6+RakQMeu/wDaX6nDbyqUqWl2BQNJXISqV1VMnZSo3GMczK10OKXVM29xQK0yyk1FpksmG/F8LYIxnPkTPU4pZjJ087ku8q5/jnZO6s96dWne0QNwpArJ608kkemfQTGtaob8JI8j0noVHgXCkUK94TU8nTY+gU495S4h2FWrmraXNOqeuSN/Ug4z8pnyfD4Zdzq/jprx/EZY9XtgW14lDFWp+FGUt6ahk+g5yv224pQurbNGotUK4JKnOPWWLmxq2zGlc0mXII3+JWU7HHiJydl2erCtVpqv3FQMA5Ycuadc5Bx8jKcfDnjPGz/KeXkxysylZHDGPegAkZGnI5jznuvB6/eUab/zIpPqRvPDOHWFU1CgVg4JUjG4IO/ynuXB6WimijlpA+kpfaPs1acs0zKyCWactFKsJJkkKSdJZVIskWMWSLJQcI4RBHCSgojhEEWEFhEiwLsWJFkghCEAhEiwCLEiwCEIQCJFhAieip5j64lStYqvxIB3hBVc7k6tmxnwGT7S/K946Jhy2l1Dd313Ixyk4yeSbldOG7D19VjTHI0qlxRYeBSu4H0wfeadwwPMTz/s9x0WPEb20rbUqt1VdT0Stqwc+RGn3A8Z3Fa4UjYj5zm5vlzsd3F3jKo3LoOS5PrOf4xWWo9K3dxTWq694chMJnAGTyJPL/TL/EuIKmQPjfoqn8z0EwOCcMHEbipTq1dDBC4IxvUyAqhTzULnaafDce75X1FfiM9TU+7aTsjeUCTbXeFzimrM6YXqTjK5z5TSsn44NSd2jgbaiKPxe+R+Uo0+x99Sw1C9yEGlRrq0s+e2R7TW4bb8bwUZ1A6MTQP1xn6Ttnf3l/LhrJ4dZ8Itgadcu9VdnUmoxpt1X4MAY5S6/A6VX7zh913R8NbfD5ZHxL75lYXdna16lO9tu9vHw9ZtKVFOrkwyQNxjkIlS14RWbIq1qOdyADp9N1OI7/v/ADBI/CLdwv2vifeVlOamKiMqpv8AApPqPM+Egrdmk2+y3NKqSpOhnUOcdQB5Hylt6XBAvdgu+cZYd8SMb89h8hIVseFa3rJdPR1oVQd4yFW0adQBGsxuz9/9CnY8PGpj3fxoQtb4cMjY5MvMevI7TatlCgAdBiV6QvLaguoi5U0iBWprqen4ag2TUU5X2U+Us0lZQA2nOlT8J1KcjmD1E5OXHvbXG/ZaSWacqpLFMykTVpJOsroZYSWitSrJBI1kgkoPEcI0RwkoOEWIIogEWESEL0WJCSFhCJAIsSLAIsSLAIQhAIQhAJWvHpJhqi6yMhRzz4+Usytd3NOmQWXU++gfvlLY+y+ngf8AEWj3fEqtTSVWqUr4PVGGGHzBmtwe7DppLkgAY3O4nQfxT4JXuqa3oonNEd24VSWakTscczg/nOC4Jb1t10OgQ41OrUxp9+Zk/E8F5JMsZut/h+aY9ZVucVrrTRiPQY/zH/j9RLXZbs1RuaAqNcinXd2GkFGKqNgcZBBzk+mJjOq169Kmz6KKsoZsE7Z+NsfvpO2odlOH1zm3usdAoqJVx7H4vrN8MP0eOY3q/eseTPzztA7HXtBcW156DVUo/QZBmtYWHGMaXrKBjnqT8wuZUp9kr2kR3F5sOhapTHyGRNWlwnieBqul9qjj8llvKfvL+Yzv+XP8Vu24bUWpfUVuXralSquhiFUD4GZgD1JHvGjtTb1Btw9GUj+gn/4mxxDht9S+9qFbtEViaZcs2cbFNS8/7zKs+3bN8NOzORtjvCfoFlZju9Tf4uk76/YynxvhlPIFkdR56kpnHuSTI63/AIiuUqOrUBSyMf4YbP8Aozn6S9/+pqDLPYHJ5n4ht7pKlzxjh9yCle1K55lQuR7rgxcb+1/2bhlvwtGrVLnh93oXToRGRiocIPhJc50kgdOsmp1KpqVBWQ02Hd7AlkKlPxIeWMgjHQjzla5seE3SpRoVe4ZNRLEPg8hgtUPOS16VzbiklNxeUDUp02I+OrRyp3AXkoKjx/EZlyTc/wCr41pU5PTMq0TLKzkarVMyykqUjLSGWitTrJBI0MkEsqeI4RojhJDhFEQRZKpYQhIF2LEhJCxIQgEWJCAsWEIBCEIBCEIBKtzcU6bZ066uMKOoH6QhL8c3UVAUu63PFJD05ZHgRznPdp+ztsFJ78I27YI1ewC7gesITfgyty1OlM50p21jwhKXduwLn8T1A1Js+CkbAeWYlPsjZVP8C6OTyw9OsPpgxITfkxyxnlMqjGy9aXLPslc0j93enHh95THyBMv/APhb4crv/wBlWEJyfr5/f+F/CILzhnE9B0XGTjb708/9wmTW7RXtoVStZ6mI3ZWOkn/aCPrCEmZ+dkykNanR79rLojIszj0qn9JA3amk+1xaY8fwv9GAhCaeGFvrSPKoad1wVkZFQo1Q41BHBUk8wTsIxeFU6C1XsLsPWI1LTNSmwqYB2wMZMISeTDxntON3Vy0NTSveroqFQXXbZiN8Y6S4sITzr7brFIy1TMISYip0kyxISyqQRwiwkhRFhCECLCElD//Z'
              />
              <div className='imgTxtContainer'>
                <h4 className='imgTxt'>1-A</h4>
                <h4 className='imgTxt'>SYNASDFA</h4>
                <h4 className='imgTxt'>SYNASDFA</h4>
                <h3 className='imgTxt blue_text'>SYNASDFA</h3>
              </div>
            </div>
            <div className='toastInfoContainer'>
              <img src={happyIcon} />
              <div className="txtConatiner">
                <h4 className="toastTxt">Сайхан хооллоорэй</h4>
                <h4 className="toastTxt">Have a nice meal</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
