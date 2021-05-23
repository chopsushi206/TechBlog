document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("update");
  const submitUpdate = document.getElementById("updatePost");

  const postFormHandler = async (event) => {
    event.preventDefault();

    const title = postForm.title.value.trim();
    const blog = postForm.blog.value.trim();

    if (title && blog) {
      const response = await fetch("/api/posts/update/${id}", {
        method: "PUT",
        body: JSON.stringify({ title, blog }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
        alert("You have successfully updated your post.");
      } else {
        alert("Failed to update.");
      }
      console.log(response);
    }
  };

  // When the login button is clicked, the following code is executed

  submitUpdate.addEventListener("click", (e) => {
    e.preventDefault();
    const title = postForm.title.value;
    const blog = postForm.blog.value;

    if (title && blog) {
      postFormHandler(e);
    } else {
      alert("Error. Failed to update. Please try again.");
    }
  });
});
