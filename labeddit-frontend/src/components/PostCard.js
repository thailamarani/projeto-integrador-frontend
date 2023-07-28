import styled from 'styled-components';
import axios from 'axios';
import { goToCommentsPage } from '../routes/coordinator';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, TOKEN_NAME } from '../constants/constants';
import ArrowUpIcon from '../images/arrow-up.svg';
import ArrowDownIcon from '../images/arrow-down.svg';
import CommentIcon from '../images/comment-icon.svg';

const PostCardContainer = styled.article`
  background-color: #fbfbfb;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 0.5rem;
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
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
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
  .vote-info {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
  }
  .comment-info {
    margin-left: 24px;
    display: flex;
    align-items: center;
    span {
      margin-left: 1rem;
    }
  }
`;

export default function PostCard(props) {
    const navigate = useNavigate()
    const { post, fetchUpdate } = props
    const { id, creator, content, votesCount, commentsCount } = post

    const votePost = (e, vote) => {
        e.stopPropagation()
        const body = {
            postId: id,
            vote: vote
        }
        const axiosConfig = {
            headers: {
                Authorization: window.localStorage.getItem(TOKEN_NAME)
            }
        }
        axios.put(BASE_URL + `/posts/${id}/vote`, body, axiosConfig)
            .then(res => {
                fetchUpdate()
            })
            .catch(err => console.log(err))
    }

    return (
        <PostCardContainer onClick={() => goToCommentsPage(navigate, id)}>
            <p>Enviado por: {creator.nickname}</p>
            <h1>{content}</h1>
            <CardFooter>
                <section className="vote-info">
                    <button onClick={(e) => votePost(e, true)}>
                        <img className="vote-icon" src={ArrowUpIcon} alt="Vote up" />
                    </button>
                    <span>{votesCount}</span>
                    <button onClick={(e) => votePost (e, false)}>
                        <img className="vote-icon" src={ArrowDownIcon} alt="Vote down" />
                    </button>
                </section>
                <section className="comment-info">
                    <img className="comment-icon" src={CommentIcon} alt="Ícone de comentários" />
                    <span>{commentsCount}</span>
                </section>
            </CardFooter>
        </PostCardContainer>
    )
};