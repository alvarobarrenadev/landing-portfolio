document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("footer__form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(input, message) {
    const grp = input.closest(".footer__form--group");
    grp.classList.remove("has-success");
    grp.classList.add("has-error");
    const icon = grp.querySelector(".error-icon");
    const msg = grp.querySelector(".error-message");
    input.classList.add("error");
    icon.classList.add("show");
    msg.textContent = message;
    msg.classList.add("show");
  }

  function setSuccess(input) {
    const grp = input.closest(".footer__form--group");
    grp.classList.remove("has-error");
    grp.classList.add("has-success");
    const icon = grp.querySelector(".error-icon");
    const msg = grp.querySelector(".error-message");
    input.classList.remove("error");
    icon.classList.remove("show");
    msg.classList.remove("show");
  }

  function validateName() {
    const v = nameInput.value.trim();
    if (!v) {
      setError(nameInput, "Sorry, can't be empty");
      return false;
    }
    if (v.length < 2) {
      setError(nameInput, "Sorry, invalid format here");
      return false;
    }
    setSuccess(nameInput);
    return true;
  }

  function validateEmail() {
    const v = emailInput.value.trim();
    if (!v) {
      setError(emailInput, "Sorry, can't be empty");
      return false;
    }
    if (!emailRegex.test(v)) {
      setError(emailInput, "Sorry, invalid format here");
      return false;
    }
    setSuccess(emailInput);
    return true;
  }

  function validateMessage() {
    const v = messageInput.value.trim();
    if (!v) {
      setError(messageInput, "Sorry, can't be empty");
      return false;
    }
    if (v.length < 10) {
      setError(messageInput, "Sorry, message too short");
      return false;
    }
    setSuccess(messageInput);
    return true;
  }

  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("blur", () => {
      if (input === nameInput) validateName();
      if (input === emailInput) validateEmail();
      if (input === messageInput) validateMessage();
    });
    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        if (input === nameInput) validateName();
        if (input === emailInput) validateEmail();
        if (input === messageInput) validateMessage();
      }
    });
    input.addEventListener("focus", () => {
      const grp = input.closest(".footer__form--group");
      grp.classList.remove("has-error", "has-success");
      input.classList.remove("error");
      grp.querySelector(".error-icon").classList.remove("show");
      grp.querySelector(".error-message").classList.remove("show");
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = validateName() && validateEmail() && validateMessage();
    if (ok) form.submit();
  });
});