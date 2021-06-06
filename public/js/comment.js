document.addEventListener("DOMContentLoaded", () => {
    const commentForm = document.getElementById("newComment");
    const newComment = document.getElementById("submitComment");
  
    const commentFormHandler = async (event) => {
      event.preventDefault();
  
      const content = commentForm.comment.value.trim();
  
      if (content) {
          console.log(content);
        const response = await fetch("/api/comments/", {
          method: "POST",
          body: JSON.stringify({ content }),
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
  
      if (content) {
        commentFormHandler(e);
      } else {
        alert("Error. Failed to post comment. Please try again.");
      }
    });
  });