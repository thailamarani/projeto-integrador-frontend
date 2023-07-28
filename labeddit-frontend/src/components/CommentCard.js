import styled from 'styled-components';
import axios from 'axios';
import { BASE_URL, TOKEN_NAME } from '../constants/constants';
import ArrowUp from '../images/arrow-up.svg';
import ArrowDown from '../images/arrow-down.svg';

const CommentCardContainer = styled.article`
    background-color: #fbfbfb;
    border: 1px solid lightgray;   
    border-radius: 10px;
    padding: 1rem;
    margin-top: 1rem;
    h1 {
        font-size: 18px;
        font-weight: 400;
        padding: 1rem 0;
    }
    p {
        color: #6f6f6f;
        font-size: 12px;
    }
`;

const CardFooter = styled.footer`
    display: flex;
    color: #6f6f6f;
    button {
        border: none;
        &:hover {
            cursor: pointer;
        }
    }
    .voteinfo {
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
  }
`;

export default function CommentCard (props) {
    const { comment, fetchComments } = props
    const { id, postId, creator, content, votesCount } = comment
    const voteComment = (e, vote) => {
        e.stopPropagation()
        const body = {
            commentId: id,
            vote: vote
        }
        const axiosConfig = {
            headers: { Authorization: window.localStorage.getItem(TOKEN_NAME) }
        }
        axios.put(BASE_URL + `/posts/${postId}/comments/${id}/vote`, body, axiosConfig)
            .then(res => {
                fetchComments()
            })
            .catch(err => console.log(err))
    }

    return (
        <CommentCardContainer>
            <p>Enviado por: {creator.nickname}</p>
            <h1>{content}</h1>
            <CardFooter>
                <section className="voteinfo">
                    <button onClick={(e) => voteComment(e, true)}>
                        <img className="vote-icon" src={ArrowUp} alt="Vote up" />
                    </button>
                    <span>{votesCount}</span>
                    <button onClick={(e) => voteComment(e, false)}>
                        <img className="vote-icon" src={ArrowDown} alt="Vote down" />
                    </button>
                </section>
            </CardFooter>
        </CommentCardContainer>
    )
};