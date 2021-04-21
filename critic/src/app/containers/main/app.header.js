import styled  from 'styled-components'
import logo from '../../images/logo.png'

const StyledAppHeader = styled.div`
    background-color: darkgreen;
    width: 100%;
    height: 64px;
    
    .crt-logo{
        height: 48px;
        margin-top: 8px;
    }

    ul li {
        display: inline-block;
    }
    ul br {
        display: none;
    }
`

function AppHeader({color, showLogo, onLogoClick}) {

    const menuItems = ["Restaurants", "Users", "Secret", "Otro menu"];
    const internalClick = () => {
        console.log("SE HIZO CLICK INTERNAMENTE EN APP HEADER")
        onLogoClick()
    }

    const renderMenuItem = (menuItem) => {
        return  (<>
                    <li key={menuItem}>{menuItem}</li>
                    <br/>
                </>)
    }

    return (
        <StyledAppHeader style={{backgroundColor: color}}>
            { showLogo && 
                <img className='crt-logo' src={logo} alt="logo" onClick={internalClick}></img>
            }
            <ul>
                { menuItems.map(menuItem => renderMenuItem(menuItem))}
                { menuItems.map(menuItem => (
                    <>
                        <li key={menuItem}>{menuItem}</li>
                        <br/>
                    </>)
                )}
            </ul>
        </StyledAppHeader>
    );
}
  
export default AppHeader;
  