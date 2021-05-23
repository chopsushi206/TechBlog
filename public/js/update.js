document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("update");
  const submitUpdate = document.getElementById("updatePost");
  const submitDelete = document.getElementById("deletePost");

  const updatePost = async (event) => {
    event.preventDefault();
    const id = postForm.getAttribute("data-id");

    const title = postForm.title.value.trim();
    const blog = postForm.blog.value.trim();
    console.log(title, blog);
    console.log(id);
    if (title && blog) {
      const response = await fetch(`/api/posts/update/${id}`, {
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

  const deletePost = async (event) => {
    event.preventDefault();
    const id = postForm.getAttribute("data-id");
    console.log(id);
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
      alert("You have successfully deleted your post.");
    } else {
      alert("Failed to delete. Please try again.");
    }
  };
  // When the button is clicked, the following code is executed

  submitDelete.addEventListener("click", deletePost);
  submitUpdate.addEventListener("click", updatePost);
});
