const timelineData = [
  { year: "25.12.1995", title: "Jap Kanwar meets Dolly", image: "assets/kanwar_dolly_try.jpg" },
//  { year: "Sometimes in 1996", title: "Dolly's ka Pregnancy", image: "assets/pregnancy.jpg" },
//  { year: "14.09.1996", title: "The big day Kanwar and Dolly becomes a parent", image: "assets/baby.jpg" },
//  { year: "2023", title: "First Time Meeting Pavan", image: "assets/meeting-pavan.jpg" },
  { year: "13.09.2024", title: "Birthday Pre Ellan", image: "assets/Pre_Ellan_bday.jpg" },
  { year: "14.09.2024", title: "Elaan Ceremony", video: "https://www.youtube.com/embed/4CK7t9eKTyU" },
  { year: "14.09.2024", title: "Roka Dinner", video: "https://www.youtube.com/embed/Q36TcILM6GA" },
  { year: "2025", title: "Wedding", image: "assets/wedding.jpg" }
];

let currentIndex = 0;

const hologram = document.getElementById('hologram');
const memoryTitle = document.getElementById('memory-title');

function loadMemory(index) {
  const memory = timelineData[index];
  let content = '';

  if (memory.image) {
    content = `<img src="${memory.image}" alt="${memory.title}">`;
  } else if (memory.video) {
    content = `<iframe src="${memory.video}" frameborder="0" allowfullscreen style="width:100%; height:100%; border-radius:10px;"></iframe>`;
  }

  hologram.innerHTML = content;
  memoryTitle.textContent = `${memory.year}: ${memory.title}`;
}

function nextMemory() {
  if (currentIndex < timelineData.length - 1) {
    hologram.classList.add('flip-out');

    setTimeout(() => {
      currentIndex++;
      loadMemory(currentIndex);

      // Remove flip-out, add flip-in
      hologram.classList.remove('flip-out');
      hologram.classList.add('flip-in');

      // After flip-in is done, remove flip-in class
      setTimeout(() => {
        hologram.classList.remove('flip-in');
      }, 300);

    }, 300); // after flip-out ends
  }
}

function prevMemory() {
  if (currentIndex > 0) {
    hologram.classList.add('flip-out');

    setTimeout(() => {
      currentIndex--;
      loadMemory(currentIndex);

      hologram.classList.remove('flip-out');
      hologram.classList.add('flip-in');

      setTimeout(() => {
        hologram.classList.remove('flip-in');
      }, 300);

    }, 300);
  }
}

// Timeline sidebar
const timelineList = document.getElementById('timeline-list');
timelineData.forEach((item, index) => {
  const li = document.createElement('li');
  li.textContent = item.year;
  li.onclick = () => jumpToMemory(index);
  timelineList.appendChild(li);
});

function jumpToMemory(index) {
  currentIndex = index;
  loadMemory(currentIndex);
}

// Initialize first memory
loadMemory(currentIndex);

// Event listeners for buttons
document.addEventListener('keydown', function(event) {
  if (event.key === "ArrowLeft") {
    prevMemory();
  } else if (event.key === "ArrowRight") {
    nextMemory();
  }
});