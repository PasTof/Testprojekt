let posts = [
    {
        "logo": "img/logo1.jpg",
        "name": "Tagesschau",
        "place": "Hamburg",
        "post": "img/1.png",
        "likes": 245,
        "discription": "Hier findest du den Text der zu dem bild passt",
        "comments": ['kommentieren über kommentieren', 'Wissen über Wissen']
    },
    {
        "logo": "img/logo1.jpg",
        "name": "Tagesschau",
        "place": "Hamburg",
        "post": "img/4.png",
        "likes": 3,
        "discription": "Hier findest du den Text der zu dem bild passt",
        "comments": ['kommentieren über kommentieren', 'Wissen über Wissen']
    },
    {
        "logo": "img/logo1.jpg",
        "name": "Tagesschau",
        "place": "Koblenz",
        "post": "img/9.png",
        "likes": 11,
        "discription": "Hier findest du den Text der zu dem bild passt",
        "comments": ['kommentieren über kommentieren', 'Wissen über Wissen']
    }
];

function start() {
    render();
    load();
}

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];

        content.innerHTML += htmltemplate(post, i);

        let commentcontent = document.getElementById(`comment${i}`);

        for (let j = 0; j < post['comments'].length; j++) {
            let comment = post['comments'][j];
            commentcontent.innerHTML += /* html */ `        
                <div>${comment}</div>
            `

        };

    };

}

function htmltemplate(post, i) {
    return /* html */`
    <div class="poststructure">
        <div class="post-head">
            <img src="${post['logo']}" alt="">
            <div class="headname">
                <h1>${post[`name`]}</h1>
                <span>${post['place']}</span>
            </div>
        </div>
        <img class="post-image" src="${post['post']}" alt="">
        <div class="ineraction">
            <div>
                <img onclick="addlike(${i})" src="img/heart-solid.png" alt="">
                <img src="img/comment-solid.png" alt="">
            </div>
            <img src="img/archive-solid.png" alt="">
        </div>
        <div class="likes" >Gefällt ${post['likes']} mal</div>
        <div class="discription">
            <div><b>${post[`name`]}</b> ${post[`discription`]}</div>
        </div>
        <div class="comments" id="comment${i}"></div>
        <input class="inputcomments" id="input${i}"><button onclick="addComment(${i})">OK</button>
    </div>
`
}

function addComment(index) {
    let input = document.getElementById(`input${index}`);
    posts[index]['comments'].push(input.value);
    render();
    input.value = '';
    localStorage.setItem('posts', JSON.stringify(posts));
}

function load() {
    let postastext = localStorage.getItem('posts');
    posts = JSON.parse(postastext);
}

function addlike(i) {
    posts[i]['likes'] ++;
    render();
}

