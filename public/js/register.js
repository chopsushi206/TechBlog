document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const signupButton = document.getElementById("signup-form-submit");

  const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = signupForm.username.value.trim();
    const password = signupForm.password.value.trim();

    if (username && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert(
          "You've successfully registered your account. You can now log in."
        );
        document.location.replace("/login");
      } else {
        alert("Something went wrong, please try again.");
      }
    }
  };

  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = signupForm.username.value;
    const password = signupForm.password.value;

    if (username && password) {
      signupFormHandler(e);
    } else {
      loginErrorMsg.style.opacity = 1;
    }
  });
});
