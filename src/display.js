
const Display=(()=>{

    const createPostTile = function(post){
        const postDiv = document.createElement('div');
        const postTitle = document.createElement('p');
        const postText = document.createElement('p');
    
        postDiv.classList.add('post-tile');
    
        postTitle.textContent=post.title;
        postText.textContent=post.text;
    
        featuredPosts.appendChild(postDiv);
        postDiv.appendChild(postTitle);
        postDiv.appendChild(postText);
    
        postTitle.addEventListener("click",()=>{
            getPost(post.id);
        });
    }
    return{createPostTile}
})();

export default Display;