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
    profileImg: "./images/avatars/avatar1.jpg",
    lastSeen: "last seen 5 minutes ago",
    messages: [
      { id: 201, text: "Hey bro, what's up?", time: "9:15 AM", sent: false },
      {
        id: 202,
        text: "All good, working on a project.",
        time: "9:16 AM",
        sent: true,
        read: true,
      },
    ],
  },
  {
    id: 3,
    name: "Shoxrux",
    profileImg: "",
    lastSeen: "online",
    messages: [
      {
        id: 301,
        text: "Let's meet at 5 PM.",
        time: "11:45 AM",
        sent: true,
        read: true,
      },
      { id: 302, text: "Okay, see you then!", time: "11:50 AM", sent: false },
    ],
  },
  {
    id: 4,
    name: "Olim",
    profileImg: "",
    lastSeen: "last seen 1 hour ago",
    messages: [
      {
        id: 401,
        text: "Did you finish the task?",
        time: "2:30 PM",
        sent: true,
        read: false,
      },
      {
        id: 402,
        text: "Not yet, but almost done.",
        time: "3:10 PM",
        sent: false,
      },
    ],
  },
  {
    id: 5,
    name: "Ziyoda",
    profileImg: "",
    lastSeen: "typing...",
    messages: [
      {
        id: 501,
        text: "Where are you?",
        time: "4:00 PM",
        sent: true,
        read: false,
      },
      {
        id: 502,
        text: "On my way, 5 mins left!",
        time: "4:05 PM",
        sent: false,
      },
    ],
  },
  {
    id: 6,
    name: "Sardor",
    profileImg: "",
    lastSeen: "last seen yesterday",
    messages: [
      {
        id: 601,
        text: "Check your email.",
        time: "8:45 AM",
        sent: true,
        read: true,
      },
      { id: 602, text: "Alright, I'll do that.", time: "9:00 AM", sent: false },
    ],
  },
  {
    id: 7,
    name: "Madina",
    profileImg: "",
    lastSeen: "online",
    messages: [
      {
        id: 701,
        text: "Happy Birthday!",
        time: "12:00 AM",
        sent: true,
        read: true,
      },
      { id: 702, text: "Thank you so much! 😊", time: "12:05 AM", sent: false },
    ],
  },
  {
    id: 8,
    name: "Jasur",
    profileImg: "./images/avatars/avatar1.jpg",
    lastSeen: "last seen 30 minutes ago",
    messages: [
      {
        id: 801,
        text: "Are you coming to the party?",
        time: "6:30 PM",
        sent: true,
        read: false,
      },
      {
        id: 802,
        text: "Yes, I'll be there by 7!",
        time: "6:35 PM",
        sent: false,
      },
    ],
  },
  {
    id: 9,
    name: "Nodira",
    profileImg: "",
    lastSeen: "last seen recently",
    messages: [
      {
        id: 901,
        text: "Can you send me the notes?",
        time: "10:15 AM",
        sent: true,
        read: true,
      },
      {
        id: 902,
        text: "Sure, give me a minute.",
        time: "10:20 AM",
        sent: false,
      },
    ],
  },
  {
    id: 10,
    name: "Bobur",
    profileImg: "",
    lastSeen: "last seen 2 hours ago",
    messages: [
      {
        id: 1001,
        text: "Let's play football tomorrow.",
        time: "5:00 PM",
        sent: true,
        read: false,
      },
      {
        id: 1002,
        text: "Sounds great! What time?",
        time: "5:10 PM",
        sent: false,
      },
    ],
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
const allUserItems = document.getElementsByClassName("user-item");

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
      userList_item.draggable = true;
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

// **User draggable**

const addDragEvents = () => {
  const allUserItems = document.getElementsByClassName("user_item");
  Array.from(allUserItems).forEach((user) => {
    user.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", user.innerText);
      user.classList.add("dragging");
    });

    user.addEventListener("dragend", () => {
      user.classList.remove("dragging");
    });
  });
};

chatList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const dragging = document.getElementsByClassName("dragging")[0];
  const afterElement = getDragAfterElement(chatList, e.clientY);
  if (afterElement == null) {
    chatList.appendChild(dragging);
  } else {
    chatList.insertBefore(dragging, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".user_item:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// Chatlarni render qilish
renderUsers(users);
addDragEvents();
