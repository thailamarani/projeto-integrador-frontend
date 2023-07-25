export const goToPostsPage = (navigate) => {
    navigate("/")
};

export const goToLoginPage = (navigate) => {
    navigate("/login")
};

export const goToSignupPage = (navigate) => {
    navigate("/signup")
};

export const goToCommentsPage = (navigate, postId) => {
    navigate(`/posts/${postId}`)
};