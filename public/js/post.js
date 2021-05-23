document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("newPost");
  const newPost = document.getElementById("submitPost");
  const editPost = document.getElementById("submitEdit");

  const postFormHandler = async (event) => {
    event.preventDefault();

    const title = postForm.title.value.trim();
    const blog = postForm.blog.value.trim();

    if (title && blog) {
      const response = await fetch("/api/posts/", {
        method: "POST",
        body: JSON.stringify({ title, blog }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
        alert("You have successfully posted.");
      } else {
        alert("Failed to post.");
      }
      console.log(response);
    }
  };

  // When the login button is clicked, the following code is executed

  newPost.addEventListener("click", (e) => {
    e.preventDefault();
    const title = postForm.title.value;
    const blog = postForm.blog.value;

    if (title && blog) {
      postFormHandler(e);
    } else {
      alert("Error. Failed to post. Please try again.");
    }
  });
});
