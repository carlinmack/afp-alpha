document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/auth/logged-in')
        .then(r => r.json())
        .then(data => console.log(data))
        // .then((data) => {
        //     console.log(data);
        //     // document.getElementById('details').innerHTML = JSON.stringify(data);
        // })
        .catch((error) => {
            console.error('Error:', error);
        });
});
