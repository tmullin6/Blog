import "./style.less";
import Post from "./post";


const recentPosts = document.querySelector('.recent-posts');
const appBody = document.querySelector(".page-body");
const title = document.querySelector('.title');

window.onload=getAllPosts();

title.addEventListener('click',()=>{
    while(appBody.firstChild){
        appBody.removeChild(appBody.lastChild);
    };

    getAllPosts();
})

//allPosts.addEventListener('click',renderPostPage);

async function getAllPosts(){

    let response = await fetch("http://localhost:3000/api/posts",{mode:"cors"});
    let posts = await response.json();

    for (let i =0; i<posts.length; i++){
        let newPost = new Post(posts[i].title,posts[i].author,posts[i].text,posts[i].date,posts[i].comments,posts[i]._id);
        console.log(newPost);
        createPostTile(newPost);
    }
    
}

async function getPost(postid){

    let response = await fetch(`http://localhost:3000/api/posts/${postid}`,{mode:'cors'});
    let post = await response.json();
    let blogPost = new Post(post.title,post.author,post.text,post.date,post.comments,post._id);
    
    renderPostPage(blogPost);
}

function createPostTile (post){
    const postDiv = document.createElement('div');
    const postTitle = document.createElement('p');
    const postText = document.createElement('p');
    //const postDate = document.createElement('p');

    postDiv.classList.add('post-tile');
    postTitle.classList.add('post-title');
    postText.classList.add('post-text');

    postTitle.textContent=post.title;
    postText.textContent=post.text;
    //postDate.textContent = post.date;

    recentPosts.appendChild(postDiv);
    postDiv.appendChild(postTitle);
    postDiv.appendChild(postText);
    //postDiv.appendChild(postDate);

    postDiv.addEventListener("click",()=>{
        getPost(post.id);
    });

    
}

function renderPostPage(post){

    while(appBody.firstChild){
        appBody.removeChild(appBody.lastChild);
    };

    const title = document.createElement('h1');
    const author = document.createElement('h3');
    const date = document.createElement('h4');
    const text = document.createElement('p');

    title.textContent=post.title;
    author.textContent=post.author;
    date.textContent=post.date;
    text.textContent=post.text;

    appBody.appendChild(title);
    appBody.appendChild(author);
    appBody.appendChild(date);
    appBody.appendChild(text);


}