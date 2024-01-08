import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://oldagramvol2-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const PostsDB = ref(database, "Posts")

onValue(PostsDB, function(snapshot){
    if(snapshot.exists()){
        clearPosts()
        let fromDB = Object.entries(snapshot.val())
        renderDBToSite(fromDB)
    } else {
        push(PostsDB, posts)
        
    }
    
})

const mainEl = document.getElementById("main")

const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

function renderDBToSite(item) {
    let itemID = item[0][0]
    let itemValues = item[0][1]
    let exactItemID = ref(database, `Posts/${itemID}/${itemValues.likes}`)
    for(let i=0; i < 3; i++) {
        mainEl.innerHTML += `
        <section>
                <div id="post-infos">
                    <img class="profile" src="${posts[i].avatar}" alt="Van Gogh's profile">
                    <h4> <span class="bold"> ${posts[i].name} </span> ${posts[i].location}</h4>
                </div>
                <img id="post" src="${posts[i].post}" alt="Van Gogh's post">
                <div>
                    <img class="icons" id="${i}" src="images/icon-heart.png" alt="like button">
                    <img class="icons" src="images/icon-comment.png" alt="comment button">
                    <img class="icons" id="dm" src="images/icon-dm.png" alt="message button">
                </div>
                <h4 id="likes" class="bold">${posts[i].likes} likes</h4>
                <h3 id="comments"><span class="bold" id="comments-user">${posts[i].username}</span> ${posts[i].comment}</h3>
            </section>
            `
             
    }
    
    for(let i=0; i < 3; i++) {
        const postEl = document.getElementById("post")
        const likesEl = document.getElementById(`${i}`)
            postEl.addEventListener("dblclick", function() {
                let currentLikes = itemValues[i].likes
                currentLikes ++
                itemValues[i].likes = currentLikes
                update(ref(database, `Posts/${itemID}/${i}`), posts[i] = {
                name: itemValues[i].name,
                username: itemValues[i].username,
                location: itemValues[i].location,
                avatar: itemValues[i].avatar,
                post: itemValues[i].post,
                comment: itemValues[i].comment,
                likes: itemValues[i].likes 
            })
            })
            likesEl.addEventListener("click", function() {
                let currentLikes = itemValues[i].likes
                currentLikes ++
                itemValues[i].likes = currentLikes
                update(ref(database, `Posts/${itemID}/${i}`), posts[i] = {
                name: itemValues[i].name,
                username: itemValues[i].username,
                location: itemValues[i].location,
                avatar: itemValues[i].avatar,
                post: itemValues[i].post,
                comment: itemValues[i].comment,
                likes: itemValues[i].likes 
            })
            })
            
    }
   
}

function clearPosts() {
    mainEl.innerHTML = " "
}