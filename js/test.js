document.addEventListener('DOMContentLoaded', function () {
    updatePosts();
});

function updatePosts() {
    fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            query: '{ Posts{ id, title, description, createDate, author } }',
        }),
    })
        .then((r) => r.json())
        .then((data) => {
            console.log(data);
            document.getElementById('posts').innerHTML = "";
            for (let post of data['data']['Posts']) {
                var output = `<article class="entry">
                <div class="item-text">
                <h5>${post['title']}</h5> <br>
                    by ${post['author']} <br>
                    ${post['description']}
                </div>
                <span class="date">
                ${post['createDate']}
                </span>
            </article>`;

                document
                    .getElementById('posts')
                    .insertAdjacentHTML('beforeend', output);
            }
        });
}

function handlePostSubmit() {
    let fields = document.getElementById('createPost').elements

    let createPostMutation = `
    mutation {
        createPost(
            title: "${fields['title'].value}", 
            description: "${fields['description'].value}"
            createDate:"${new Date().toLocaleDateString('en-GB')}",
            author: "${fields['author'].value}"
        ) {
            id, title, description, createDate, author
        }
    }`;

    console.log(createPostMutation)

    fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            query: createPostMutation,
        }),
    }).then(() => {
        updatePosts();
    });
}
