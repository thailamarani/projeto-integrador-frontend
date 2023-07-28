import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { goToLoginPage, goToPostsPage } from '../routes/coordinator';
import { TOKEN_NAME } from '../constants/constants';
import CloseIcon from '../images/close-x.svg';
import HeaderLogo from '../images/header-logo.svg';

const HeaderBarContainer = styled.header`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    #header-bar-logo {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .close-icon {
        width: 25px;
        color: #a3a3a3;
    }
    button {
        color: #4088cb;
        font-size: 18px;
        font-weight: 500;
        outline: none;
        border: none;
        &:last-child {
            margin-left: auto;
        }
        &:hover {
            cursor: pointer;
        }
    }
`;

export default function HeaderBar() {
    const location = useLocation()
    const navigate = useNavigate()
    const deslogar = () => {
        window.localStorage.removeItem(TOKEN_NAME)
        goToLoginPage(navigate)
    }
    const renderCorrectButtons = () => {
        switch (location.pathname) {
            case "/signup":
                return <button onClick={() => goToLoginPage(navigate)}>Entrar</button>
            case "/":
                return <button onClick={deslogar}>Sair</button>
            default:
                return (
                    <>
                        <button onClick={() => goToPostsPage(navigate)}>
                            <img className="close-icon" src={CloseIcon} alt="Voltar para posts" />
                        </button>
                        <button className="logout-btn" onClick={deslogar}>Sair</button>
                    </>
                )
        }
    }

    return (
        <HeaderBarContainer>
            <img id="header-bar-logo" src={HeaderLogo} alt="LabEddit mini logo" />
            {renderCorrectButtons()}
        </HeaderBarContainer>
    )
};