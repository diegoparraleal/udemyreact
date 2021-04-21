import AppFooter from "./app.footer";
import AppHeader from "./app.header";
import styled from 'styled-components'
import homeImage from '../../images/home-image.jpg'

const StyledAppMain = styled.div`
    width: 1024px;
    margin: 0 auto;
    text-align: center;

    > label {
        padding: 0 32px;
        font-size: 32px;
        display: block;
        color: darkgreen;
    }

    img {
        padding: 0 32px;
    }

    button{
        padding: 0 16px;
    }

`

function AppMain(){

    const logoClicked = () => console.log("SE HIZO CLICK EN EL LOGO");

    return (
    <StyledAppMain>
        <AppHeader color="red" onLogoClick={logoClicked} showLogo={false} />
        <label>Welcome to critic, the leading world site for restaurant reviews!</label>
        <img src={homeImage} alt="homeImage" />
        <button>Login</button>
        <AppFooter color="red"/>
    </StyledAppMain>)
}

export default AppMain;