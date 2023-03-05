const editPostHandler = async (postId, method) => {

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_body = document.querySelector('textarea[name="post-body"]').value.trim();

    if (title && post_body) {
        const response = await fetch(`/api/posts/${postId}`, {
            method,
            body: JSON.stringify({ title, post_body }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    }
};