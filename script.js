document.addEventListener('DOMContentLoaded', function() {
    // Fetch posts from the server when the page loads
    fetchPosts();
  
    // Handle form submission
    document.getElementById('postForm').addEventListener('submit', submitPost);
  });
  
  function fetchPosts() {
    fetch('/api/posts')
      .then(function(response) {
        return response.json();
      })
      .then(function(posts) {
        // Render the posts
        var postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = '';
  
        posts.forEach(function(post) {
          var postElement = document.createElement('div');
          postElement.classList.add('post');
  
          var authorElement = document.createElement('h3');
          authorElement.textContent = post.author;
  
          var contentElement = document.createElement('p');
          contentElement.textContent = post.content;
  
          postElement.appendChild(authorElement);
          postElement.appendChild(contentElement);
  
          postsContainer.appendChild(postElement);
        });
      });
  }

  
  function submitComment() {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    
    if (name.trim() === "" || message.trim() === "") {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const timestamp = new Date().toLocaleString();

    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    
    const userParagraph = document.createElement("p");
    userParagraph.classList.add("user");
    userParagraph.textContent = name;
    
    const timestampParagraph = document.createElement("p");
    timestampParagraph.classList.add("timestamp");
    timestampParagraph.textContent = "Posted on " + timestamp;
    
    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = message;
    
    commentDiv.appendChild(userParagraph);
    commentDiv.appendChild(timestampParagraph);
    commentDiv.appendChild(messageParagraph);
    
    document.getElementById("discussion").appendChild(commentDiv);

    // Clear input fields after submission
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
  }