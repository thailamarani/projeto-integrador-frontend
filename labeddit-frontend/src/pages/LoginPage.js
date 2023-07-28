import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';
import { goToPostsPage, goToSignupPage } from '../routes/coordinator';
import { BASE_URL, TOKEN_NAME } from '../constants/constants';
import HorizontalLine from '../components/HorizontalLine';
import LoginLogoIcon from '../images/login-logo.svg';
import FooterIcon from '../images/footer-bar.svg';

export const LoginPageContainer = styled.main`
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    #logo {
        width: 152px;
    }
    h1 {
        font-size: 16px;
    }
`;

export const HeaderSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 8vh;
    #logo {
        width: 152px;
    }
    h1 {
        font-size: 16px;
        font-weight: 200;
        margin: 0.5rem 0;
    }
`;

export const FormSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        input {
            color: #323941;
            width: 100%;
            max-width: 365px;
            height: 51px;
            border-radius: 25px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            border: none;
        }
    }
        button {
            width: 100%;
            max-width: 365px;
            height: 51px;
            border-radius: 25px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            border: none;
        }
        button.primary {
            background-color: #fc8b6b;
            color: white;
            margin-top: 3rem;
        }
        button.secondary {
            border: 1px solid #fe7e02;
            color: #fe7e02;
        }
`;

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        const token = window.localStorage.getItem(TOKEN_NAME)
        if (token) {
            goToPostsPage(navigate)
        }
    }, [])

    const login = (e) => {
        e.preventDefault()
        const body = {
            email: email,
            password: password
        }
        axios.post(BASE_URL + "/users/login", body)
            .then(res => {
                window.localStorage.setItem(TOKEN_NAME, res.data.token)
                goToPostsPage(navigate)
            }).catch(err => console.log(err))
    }

    return (
        <LoginPageContainer>
            <HeaderSection>
                <img id="logo" src={LoginLogoIcon} alt="Logo da Labenu" />
                <h1>Projeto LabEddit</h1>
            </HeaderSection>
            <FormSection>
                <form onSubmit={login}>
                    <input placeholder="E-mail" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button className="primary" type="submit">Continuar</button>
                </form>
            <HorizontalLine />
            <button className="secondary" onClick={() => goToSignupPage(navigate)}>Crie uma conta!</button>
            </FormSection>
            <img id="footer-bar" src={FooterIcon} alt="Barra horizontal de rodapé" />
        </LoginPageContainer>    
    )
};