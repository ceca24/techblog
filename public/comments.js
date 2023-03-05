const postId = document.querySelector('#comment').getAttribute('data-id');

const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_body = document.querySelector('#comment-body').value.trim();

    if (comment_body) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ postId, comment_body }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to add comment');
        }
    }
};

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);
