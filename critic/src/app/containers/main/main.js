import AppFooter from "./app.footer";
import AppHeader from "./app.header";
import styled from 'styled-components'
import homeImage from '../../images/home-image.jpg'
import { useState } from "react";

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

        ul {
           list-style: none;
           li {
               display: inline;
           } 
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
    const [color, setColor] = useState("#003433");
    const logoClicked = () => console.log("SE HIZO CLICK EN EL LOGO");
    const changeColor = (newColor) => {
        setColor(newColor);
    }

    return (
    <StyledAppMain>
        <AppHeader color={color} onLogoClick={logoClicked} showLogo={true} />
        <div className="crt-content">
            <label>Welcome to critic, the leading world site for restaurant reviews!</label>
            <ul>
                <li><button onClick={ () => changeColor('blue')} >Blue</button></li>
                <li><button onClick={ () => changeColor('green')} >Green</button></li>
                <li><button onClick={ () => changeColor('red')} >Red</button></li>
            </ul>
            <img src={homeImage} alt="homeImage" />
            <button>LOGIN</button>
        </div>
        <AppFooter color={color}/>
    </StyledAppMain>)
}

export default AppMain;