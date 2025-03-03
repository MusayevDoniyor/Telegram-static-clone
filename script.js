import { Picker } from "https://esm.sh/emoji-picker-element@1.18.2";

const picker = new Picker({ locale: "en" });

const users = [
  {
    id: 1,
    name: "Doniyor",
    profileImg: "./images/avatars/avatar1.jpg",
    lastSeen: "last seen recently",
    messages: [
      { id: 101, text: "Hello", time: "8:02 AM", sent: true, read: true },
      {
        id: 102,
        text: "How are you?",
        time: "1:07 PM",
        sent: true,
        read: false,
      },
      { id: 103, text: "I'm fine!", time: "3:39 PM", sent: false },
    ],
  },
  {
    id: 2,
    name: "Ali",
    profileImg: "",
    lastSeen: "last seen 5 minutes ago",
    messages: [],
  },
];

const defaultProfileImg = "./images/avatars/default-avatar.svg";

// UI elements
const chatList = document.getElementById("chat-list");
const chatWindow = document.getElementById("chat-window");
const chatProfileImg = document.getElementById("chat-profile_img");
const chatUsername = document.getElementById("chat-username");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-message");
const searchInput = document.getElementById("search-chats");
const chatHeader = document.getElementById("chat-header");
const chatStatus = document.getElementById("chat-status");
const chatInput = document.getElementById("chat-input");
const stickerSender = document.getElementById("sticker-sender");
const sendStickerBtn = document.getElementById("send-sticker");
const leftPanel = document.querySelector(".chats");
const resizer = document.getElementById("resizer");
const stickerButton = document.getElementById("sticker-button");
const stickerPanel = document.getElementById("sticker-panel");

let currentChat = null;
let isResizing = false;

// Chat panelni resizing qilish
resizer.addEventListener("mousedown", (e) => {
  isResizing = true;
  document.addEventListener("mousemove", handleSize);
  document.addEventListener("mouseup", () => {
    isResizing = false;
    document.removeEventListener("mousemove", handleSize);
  });
});

function handleSize(e) {
  if (isResizing) {
    const newWidth = e.clientX;
    if (newWidth > 200 && newWidth < 800) {
      leftPanel.style.width = `${newWidth}px`;
    }
  }
}

// Chat bo'sh bo'lsa, header va inputlarni yashirish va select chat messageni chiqarish
if (!currentChat) {
  chatHeader.style.display = "none";
  chatInput.style.display = "none";
  chatStatus.innerHTML = "";

  chatWindow.innerHTML = `<p class="chat-not-selected">Select chat to continue</p>`;
}

// Chatlarni render qilish
const renderUsers = (users) => {
  chatList.innerHTML = "";

  if (users.length) {
    users.forEach((user) => {
      const userList_item = document.createElement("li");
      userList_item.classList.add("user_item");
      userList_item.innerHTML = `
        <img class="profile_img" src="${user.profileImg || defaultProfileImg}">
        <div>
          <h2 class="profile_name">${user.name}</h2>
          <p class="last-message">${
            user.messages.length
              ? user.messages.slice(-1)[0].text
              : "No messages"
          }</p>
        </div>
      `;

      userList_item.onclick = () => openChat(user);
      chatList.append(userList_item);
    });
  } else {
    chatList.innerHTML = `<p class='no-chats'>No chats found</p>`;
  }
};

// Chatlarni qidirish
searchInput.addEventListener("input", (e) => {
  const searchedChats = users.filter((user) =>
    user.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderUsers(searchedChats);
});

// Chatni ochish
const openChat = (user) => {
  currentChat = user;
  chatHeader.style.display = "flex";
  chatInput.style.display = "flex";

  chatProfileImg.src = user.profileImg || defaultProfileImg;
  chatUsername.textContent = user.name;
  chatStatus.textContent = user.lastSeen;
  chatWindow.innerHTML = "";

  stickerSender.style.display = user.messages.length === 0 ? "block" : "none";

  user.messages.forEach((msg) => {
    const message = document.createElement("div");
    message.classList.add("message", msg.sent ? "sent" : "received");
    message.innerHTML = `
      <p>${msg.text}</p>
      <time>${msg.time} ${msg.sent ? (msg.read ? "✔✔" : "✔") : ""}</time>
    `;
    chatWindow.append(message);
  });

  chatWindow.scrollTop = chatWindow.scrollHeight;
  messageInput.focus();
};

// Yangi xabar yuborish
const sendMessage = (text) => {
  if (!currentChat || !text.trim()) return;

  currentChat.messages.push({
    text,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    sent: true,
    read: false,
  });

  messageInput.value = "";
  openChat(currentChat);
  setTimeout(() => renderUsers(users), 0);
  stickerPanel.classList.add("hidden");
};

messageInput.addEventListener("input", () => {
  sendBtn.disabled = !messageInput.value.trim();
});

sendBtn.addEventListener("click", () => sendMessage(messageInput.value));

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage(messageInput.value);
});

// Sticker jo'natish
sendStickerBtn.addEventListener("click", () => sendMessage("😊"));

// **Emoji panelni to'g'ri yopish**
document.addEventListener("click", (e) => {
  if (!stickerPanel.contains(e.target) && e.target !== stickerButton) {
    stickerPanel.classList.add("hidden");
  }
});

// **Sticker panelni ochish/yopish**
stickerButton.addEventListener("click", (e) => {
  stickerPanel.classList.toggle("hidden");
  e.stopPropagation();
});

// Emoji bosilganda inputga qo'shish
stickerPanel.addEventListener("emoji-click", (event) => {
  messageInput.value += event.detail.unicode;
  sendBtn.disabled = !messageInput.value.trim();
});

stickerPanel.append(picker);

// Chatlarni render qilish
renderUsers(users);
