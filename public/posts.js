const newPostsHandler = async () => {
    event.preventDefault();

    const title = document.querySelector('input [name= #post-title]').value;
    const post_body = document.querySelector('textarea [name= #post-body]').value;

    if (title && post_body) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, post_body }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    }
};

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostsHandler);