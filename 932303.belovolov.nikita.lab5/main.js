const newsContainer = document.getElementById("newsContainer");
const postTemplate = document.getElementById("postTemplate");
const postPopup = document.getElementById("postPopup");

const data = {
  0: {
    id: 0,
    title: "Новость 1",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae voluptatum suscipit sed delectus facere veritatis autem quisquam unde nam doloribus?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet asperiores aut nihil! Corporis debitis labore fugiat id, eligendi ratione veritatis!\nLorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam hic, ipsa, ullam, cupiditate eveniet at voluptate corrupti commodi nobis ratione voluptatem! Vel animi totam cupiditate doloribus ad ab exercitationem officia eveniet impedit? Deleniti quasi nisi consectetur perspiciatis quibusdam nostrum, enim perferendis nam, magni molestias recusandae id libero vitae, repudiandae praesentium.",
  },
  1: {
    id: 1,
    title: "Новость 2",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae voluptatum suscipit sed delectus facere veritatis autem quisquam unde nam doloribus?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. A alias.\nLorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam hic, ipsa, ullam, cupiditate eveniet at voluptate corrupti commodi nobis ratione voluptatem! Vel animi totam cupiditate doloribus ad ab exercitationem officia eveniet impedit? Deleniti quasi nisi consectetur perspiciatis quibusdam nostrum, enim perferendis nam, magni molestias recusandae id libero vitae, repudiandae praesentium.",
  },
  2: {
    id: 2,
    title: "Новость 3",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae voluptatum suscipit sed delectus facere veritatis autem quisquam unde nam doloribus?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. A alias 2.\nLorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam hic, ipsa, ullam, cupiditate eveniet at voluptate corrupti commodi nobis ratione voluptatem! Vel animi totam cupiditate doloribus ad ab exercitationem officia eveniet impedit? Deleniti quasi nisi consectetur perspiciatis quibusdam nostrum, enim perferendis nam, magni molestias recusandae id libero vitae, repudiandae praesentium.",
  },
};

for (let post_data of Object.values(data)) {
  let clone = postTemplate.content.cloneNode(true);
  clone.querySelector(".post-header").textContent = post_data.title;
  clone.querySelector(".post-desc").textContent = post_data.desc;
  clone.querySelector(".btn").onclick = () => {
    openPostPopup(post_data.id);
  };
  newsContainer.appendChild(clone);
}

function openPostPopup(pid) {
  postPopup.querySelector(".popup-header").textContent = data[pid].title;
  postPopup.querySelector(".popup-content").textContent =
    `${data[pid].title}: ${data[pid].content}`;
  postPopup.classList.add("shown");
}

postPopup.onclick = () => {
  postPopup.classList.remove("shown");
};
