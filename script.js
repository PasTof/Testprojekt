let posts = [
    {
        "logo": "img/pumpkin.png",
        "name": "Pumpkino",
        "place": "Hamburg",
        "post": "img/1.png",
        "likes": 245,
        "liked": false,
        "discription": "Was für schönes Wasser",
        "comments": ['Kann man sich wohl nass machen', 'Bötchen fahren'],
        "comment-user": ['Mark', 'Franziska']
    },
    {
        "logo": "img/woman.png",
        "name": "Charlotte",
        "place": "Hamburg",
        "post": "img/4.png",
        "likes": 3,
        "liked": false,
        "discription": "Da stellt man sein Fahrrad doch gerne ab.",
        "comments": ['Ich glaub die sind nicht festgebunden', 'nehm ich'],
        "comment-user": ['Gustav', 'Brigitte']
    },

    {
        "logo": "img/fox.png",
        "name": "Fuchsi",
        "place": "Koblenz",
        "post": "img/9.png",
        "likes": 11,
        "liked": true,
        "discription": "Hab ich da was in der Nase?",
        "comments": ['Clean as fuck'],
        "comment-user": ['Rebecca']
    }
];

let currentUser = 'Pascal';


function start() {

    load();
    render();
}

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];

        content.innerHTML += htmltemplate(post, i);

        createComment(post, i);
        checkIfLiked(i);
    };
}

function htmltemplate(post, i) {
    return /* html */`
    <div class="poststructure">
        <div class="post-head">
            <img src="${post['logo']}" alt="">
            <div class="headname">
                <h2>${post[`name`]}</h2>
                <span>${post['place']}</span>
            </div>
        </div>
        <img class="post-image" src="${post['post']}" alt="">
        <div class="ineraction">
            <div>
                <img onclick="addlike(${i})" id="like${i}" src="img/heart.svg" alt="">
                <img src="img/commentbubble.svg" alt="">
                <img src="img/message.svg" alt="">
                
            </div>
            <img src="img/bookmark.svg" alt="">
        </div>
        <div class="likes" >Gefällt ${post['likes']} mal</div>
        <div class="discription">
            <div><b>${post[`name`]}</b> ${post[`discription`]}</div>
            <br>
        </div>
        <div class="comments" id="comment${i}"></div>
        <div class="divInput">
        <input class="inputcomments" id="input${i}" placeholder="kommentieren..."><button class="commentButton" onclick="addComment(${i})">posten</button>
        </div>
    </div>
`
}

function createComment(post, i) {
    let commentcontent = document.getElementById(`comment${i}`);

    for (let j = 0; j < post['comments'].length; j++) {
        commentcontent.innerHTML += /* html */ `        
            <div><b>${post['comment-user'][j]}</b> ${post['comments'][j]}</div>
        `

    };
}

function addComment(index) {
    let input = document.getElementById(`input${index}`);
    posts[index]['comment-user'].push(currentUser);
    posts[index]['comments'].push(input.value);

    save();
    load();
    render();
    input.value = '';
}

function save() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

function load() {
    let postastext = localStorage.getItem('posts');
    if(postastext){
        posts = JSON.parse(postastext);
    }
}

function checkIfLiked(i) {
    if (posts[i]['liked'] == true) {
        document.getElementById(`like${i}`).src = "./img/heart.svg";
    } else {
        document.getElementById(`like${i}`).src = "./img/redheart.png";
    }

    save();
}

function addlike(i) {
    if (!posts[i]['liked']) {
        posts[i]['liked'] = true;
        dontLikeIt(i);
    } else {
        posts[i]['liked'] = false;
        likeIt(i);
    }

    save();
}

function dontLikeIt(i) {
    posts[i]['likes']--;
    posts[i]['liked'] = true;

    render();
    save();
}

function likeIt(i) {
    posts[i]['likes']++;
    posts[i]['liked'] = false;

    render();
    save();
}

window.addEventListener('scroll', function () {
    let navbar = document.querySelector('.navbar');

    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
