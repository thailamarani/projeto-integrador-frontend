import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, TOKEN_NAME } from '../constants/constants';
import { goToLoginPage } from '../routes/coordinator';
import HeaderBar from '../components/HeaderBar';
import HorizontalLine from '../components/HorizontalLine';
import PostCard from '../components/PostCard';

export const PostsPageContainer = styled.main`
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
`;

export const FormSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 2rem;
  form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    textarea {
        background-color: #ededed;
        color: #323941;
        width: 100%;
        max-width: 365px;
        height: 130px;
        margin: 0.5rem 0;
        padding: 10px;
        font-size: 18px;
        border: none;
        resize: none;
    }
  }
    button {
        width: 100%;
        max-width: 365px;
        height: 51px;
        border-radius: 15px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        border: none;
  }
    button.primary {
        background-color: #fc8b6b;
        color: white;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
  }
`;

export const PostsSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export default function PostsPage() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [content, setContent] = useState("")

    useEffect(() => {
        const token = window.localStorage.getItem(TOKEN_NAME)
        if (!token) {
            goToLoginPage(navigate)
        } else {
            fetchPosts()
        }
    }, [])

    const fetchPosts = () => {
        const axiosConfig = {
            headers: {
                Authorization: window.localStorage.getItem(TOKEN_NAME)
            }
        }
        axios.get(BASE_URL + "/posts", axiosConfig)
            .then(res => {
                setPosts(res.data)
                setContent("")
            })
            .catch(err => console.log(err))
    }

    const createPost = (e) => {
        e.preventDefault()
        const body = {
            content: content
        }
        const axiosConfig = {
            headers: {
                Authorization: window.localStorage.getItem(TOKEN_NAME)
            }
        }
        axios.post(BASE_URL + "/posts", body, axiosConfig)
            .then(res => {
                fetchPosts()
            })
            .catch(err => console.log(err))
    }

    return (
        <PostsPageContainer>
            <HeaderBar />
            <FormSection>
                <form onSubmit={createPost}>
                    <textarea placeholder="Digite algo" value={content} onChange={(e) => setContent(e.target.value)} required />
                    <button className="primary" type="submit">Post</button>
                </form>
            </FormSection>
            <HorizontalLine />
            <PostsSection>
                {posts.map(post => (
                    <PostCard post={post} fetchUpdate={fetchPosts} key={post.id} />
                ))}
            </PostsSection>
        </PostsPageContainer>
    )
};