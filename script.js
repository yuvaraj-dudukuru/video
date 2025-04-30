window.onload = () => {
  const user = localStorage.getItem("username");
  if (user) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("logout-section").style.display = "block";
    document.getElementById("welcome-msg").innerText = `Welcome, ${user}`;
    document.getElementById("main-content").style.display = "block";
  }
};

function login() {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Please enter a username");
    return;
  }
  localStorage.setItem("username", username);
  location.reload();
}

function logout() {
  localStorage.removeItem("username");
  location.reload();
}

function uploadVideo() {
  const fileInput = document.getElementById("video-upload");
  const titleInput = document.getElementById("video-title");
  const file = fileInput.files[0];
  const title = titleInput.value;

  if (!file || !title) {
    alert("Please select a video and enter a title");
    return;
  }

  const videoURL = URL.createObjectURL(file);

  const videoCard = document.createElement("div");
  videoCard.className = "video-card";
  videoCard.setAttribute("data-title", title.toLowerCase());

  videoCard.innerHTML = `
    <h4>${title}</h4>
    <video controls src="${videoURL}"></video>
  `;

  document.getElementById("video-container").appendChild(videoCard);

  // Clear inputs
  fileInput.value = "";
  titleInput.value = "";
}

function searchVideos() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const videos = document.querySelectorAll(".video-card");

  videos.forEach(card => {
    const title = card.getAttribute("data-title");
    if (title.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
