document.addEventListener("DOMContentLoaded", () => {
    const commentForm = document.querySelector("#newComment");
    const newComment = document.getElementById("submitComment");
  
    const commentFormHandler = async (event) => {
      event.preventDefault();
  
      const content = commentForm.comment.value.trim();
      const postId = commentForm.dataset.id;
      if (content && postId) {
          
        const response = await fetch("/api/comments/", {
          method: "POST",
          body: JSON.stringify({ comment: content, post_id: postId }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          document.location.replace("/");
          alert("Your comment has been posted.");
        } else {
          alert("Failed to post comment. Please try again.");
        }
        console.log(response);
      }
    };
  
    // When the login button is clicked, the following code is executed
  
    newComment.addEventListener("click", (e) => {
      e.preventDefault();
      const content = commentForm.comment.value; 
      const postId = commentForm.dataset.id;
      console.log(postId);
      if (content && postId) {
        commentFormHandler(e);
      } else {
        alert("Error. Failed to post comment. Please try again.");
      }
    });
  });