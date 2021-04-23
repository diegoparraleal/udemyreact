import styled  from 'styled-components'
import logo from '../../images/logo.png'

const StyledAppHeader = styled.div`
    width: 100%;
    height: 64px;
    text-align: left;
    display: flex;

    .crt-logo{
        height: 48px;
        margin-top: 8px;
    }

    ul {
        display: inline-block;
        flex-grow: 1;
        text-align: right;
        padding-right: 160px;

        li {
            font-size: 20px;
            color: #c6d9b4;
            display: inline-block;            
            margin-left: 32px;
            line-height: 30px;
        }
    }

    .crt-user{
        width: 200px;
        color: #c6d9b4;

        h4 {
            margin: 0;
            margin-top: 16px;
        }
        h5 {
            margin: 0;
        }

    }
`

function AppHeader({color, user, showLogo, onLogoClick}) {

    const menuItems = ["Restaurants", "Users"];
    const internalClick = () => {
        console.log("SE HIZO CLICK INTERNAMENTE EN APP HEADER")
        onLogoClick()
    }

    return (
        <StyledAppHeader style={{backgroundColor: color}}>
            { showLogo && 
                <img className='crt-logo' src={logo} alt="logo" onClick={internalClick}></img>
            }
            <ul>
                { menuItems.map(menuItem => (
                    <li key={menuItem}>{menuItem}</li>
                ))}
            </ul>
            { user && 
                <div className="crt-user">
                    <h4>{user.name}</h4>
                    <h5>{user.email}</h5>
                </div>
            }
        </StyledAppHeader>
    );
}
  
export default AppHeader;
  