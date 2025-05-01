window.onload = () => {
  const user = localStorage.getItem("username");
  if (user) {
    document.getElementById("login-modal").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    document.getElementById("username-display").innerText = `👤 ${user}`;
  } else {
    document.getElementById("login-modal").style.display = "flex";
  }
};

function login() {
  const username = document.getElementById("username").value;
  if (!username.trim()) {
    alert("Please enter a valid name.");
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
  const title = document.getElementById("video-title").value;
  const tags = document.getElementById("video-tags").value;

  const file = fileInput.files[0];
  if (!file || !title) {
    alert("Please select a video and enter a title.");
    return;
  }

  const videoURL = URL.createObjectURL(file);
  const tagList = tags.split(',').map(tag => tag.trim().toLowerCase());

  const videoCard = document.createElement("div");
  videoCard.className = "video-card";
  videoCard.setAttribute("data-title", title.toLowerCase());
  videoCard.setAttribute("data-tags", tagList.join(' '));

  const tagsHTML = tagList.map(tag => `<span class="tag">${tag}</span>`).join('');

  videoCard.innerHTML = `
    <h4>${title}</h4>
    <video controls src="${videoURL}"></video>
    <div class="tag-container">${tagsHTML}</div>
  `;

  document.getElementById("video-container").appendChild(videoCard);

  // Clear input
  fileInput.value = "";
  document.getElementById("video-title").value = "";
  document.getElementById("video-tags").value = "";
}

function searchVideos() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const videos = document.querySelectorAll(".video-card");

  videos.forEach(card => {
    const title = card.getAttribute("data-title");
    const tags = card.getAttribute("data-tags");
    if (title.includes(query) || tags.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

document.getElementById("darkModeToggle").addEventListener("click", () => {
  const body = document.body;
  body.classList.toggle("dark-mode");

  // Save the user's preference in localStorage
  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
});

// Apply the saved theme on page load
window.onload = () => {
  const user = localStorage.getItem("username");
  if (user) {
    document.getElementById("login-modal").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    document.getElementById("username-display").innerText = `👤 ${user}`;
  } else {
    document.getElementById("login-modal").style.display = "flex";
  }

  // Check and apply dark mode preference
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
  }
};