import AppFooter from "./app.footer";
import AppHeader from "./app.header";
import styled from 'styled-components'
import homeImage from '../../images/home-image.jpg'

const StyledAppMain = styled.div`
    width: 1024px;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;

    .crt-content {
        flex-grow: 1;

        label {
            color: #003433;
            font-size: 24px;
            text-align: center;
            padding: 8px 0px;
            margin: 32px 64px;
            font-weight: 300;
            display: block;
        }

        img {
            width: 100%;
        }

        button{
            margin: 32px 64px;
            padding: 8px 16px;
            background-color: #003433;
            color: white;
        }
    }

`

function AppMain(){

    const logoClicked = () => console.log("SE HIZO CLICK EN EL LOGO");

    return (
    <StyledAppMain>
        <AppHeader color="#003433" onLogoClick={logoClicked} showLogo={true} />
        <div className="crt-content">
            <label>Welcome to critic, the leading world site for restaurant reviews!</label>
            <img src={homeImage} alt="homeImage" />
            <button>LOGIN</button>
        </div>
        <AppFooter color="#003433"/>
    </StyledAppMain>)
}

export default AppMain;