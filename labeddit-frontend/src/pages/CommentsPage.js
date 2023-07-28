import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BASE_URL, TOKEN_NAME } from '../constants/constants';
import { goToLoginPage } from '../routes/coordinator';
import HeaderBar from '../components/HeaderBar';
import HorizontalLine from '../components/HorizontalLine';
import CommentCard from '../components/CommentCard';
import PostCard from '../components/PostCard';

export const CommentsPageContainer = styled.main`
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
`;

export const PostSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
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
    }
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

export const CommentsSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export default function CommentsPage() {
    const navigate = useNavigate()
    const params = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [content, setContent] = useState("")

    useEffect(() => {
        const token = window.localStorage.getItem(TOKEN_NAME)
        if (!token) {
            goToLoginPage(navigate)
        } else {
            fetchPost()
            fetchComments()
        }
    }, [])

    const fetchPost = () => {
        const axiosConfig = {
            headers: { Authorization: window.localStorage.getItem(TOKEN_NAME) }
        }
        axios.get(BASE_URL + `/posts/${params.id}`, axiosConfig)
            .then(res => {
                setPost(res.data)
            })
            .catch(err => console.log(err))
    }

    const fetchComments = () => {
        const axiosConfig = {
            headers: { Authorization: window.localStorage.getItem(TOKEN_NAME) }
        }
        axios.get(BASE_URL + `/posts/${params.id}/comments`, axiosConfig)
            .then(res => {
                setComments(res.data)
            })
            .catch(err => console.log(err))
    }

    const createComment = (e) => {
        e.preventDefault()
        const body = {
            content: content
        }
        const axiosConfig = {
            headers: { Authorization: window.localStorage.getItem(TOKEN_NAME) }
        }
        axios.post(BASE_URL + `/posts/${params.id}/comments`, body, axiosConfig)
            .then(res => {
                fetchPost()
                fetchComments()
                setContent("")
            })
            .catch(err => console.log(err))
    }

    return (
        <CommentsPageContainer>
            <HeaderBar />
            <PostSection>
                {post && <PostCard post={post} fetchUpdate={fetchPost} />}
            </PostSection>
            <FormSection>
                <form onSubmit={createComment}>
                    <textarea placeholder="Comentar" value={content} onChange={(e) => setContent(e.target.value)} required />
                    <button className="primary" type="submit">Commentar</button>
                </form>
            </FormSection>
            <HorizontalLine />
            <CommentsSection>
                {comments.map(comment => (
                    <CommentCard comment={comment} fetchComments={fetchComments} key={comment.id} />
                ))}
            </CommentsSection>
        </CommentsPageContainer>
    )
};