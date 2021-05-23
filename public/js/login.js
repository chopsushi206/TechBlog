document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginButton = document.getElementById("login-form-submit");
  const loginErrorMsg = document.getElementById("login-error-msg");

  //login form

  const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();

    if (username && password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
        alert("You have successfully logged in.");
      } else {
        alert("Failed to log in.");
      }
      console.log(response);
    }
  };

  // When the login button is clicked, the following code is executed

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username && password) {
      // If the credentials are valid, show an alert box and reload the page
      loginFormHandler(e);
    } else {
      // Otherwise, make the login error message show (change its opacity)
      loginErrorMsg.classList.remove("hidden");
    }
  });
});
