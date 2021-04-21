import styled from 'styled-components'

const StyledAppFooter = styled.div`
    background-color: darkgreen;
    width: 100%;
    height: 64px;
    color: white;
    
    label {
        padding-top: 16px;
        text-align: center;
    }
`

function AppFooter({color}) {
    return (
        <StyledAppFooter style={{backgroundColor: color}}>
            <label>Copyright diego.parra.leal@gmail.com - 2021</label>
        </StyledAppFooter>
    );
}
  
export default AppFooter;
  