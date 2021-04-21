import styled from 'styled-components'

const StyledAppFooter = styled.div`
    width: 100%;
    height: 64px;


    
    label {
        padding-top: 24px;
        text-align: center;
        color: #c6d9b4;
        font-size: 12px;
        display: inline-block;
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
  