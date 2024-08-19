document.addEventListener("DOMContentLoaded", function () {
  fetch("/dataPro.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("File dataPro.json tidak ditemukan atau tidak dapat dibaca.");
      }
      return response.json();
    })
    .then((data) => {
      const projectContainer = document.getElementById("card");

      if (data.length === 0) {
        projectContainer.innerHTML = "<p>Tidak ada data</p>";
        return;
      }

      data.forEach((project) => {
        const card = document.createElement("div");
        card.className = "container-card";

        let techHTML = '';
        project.tech.forEach(tech => {
          techHTML += `<i class="fa-brands fa-${tech}"></i>`;
        });

        card.innerHTML = `
          <div class="card">
            <div class="image-container">
                <img src="${project.gambar}" />
                <div class="overlay">
                    <div class="row-card">
                        <h5>${project.judul}</h5>
                        <div class="card-desc">
                             <p>${project.deskripsi}</p>
                        </div>
                        <p>Teknologi yang digunakan</p>
                        <div class="card-tecnology">
                          ${techHTML}
                        </div>
                        
                        <div class="button-card">
                            <a href="${project.link}" target="_blank" style="--clr: #3795BD">
                                <span>Click Here</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        `;

        projectContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching project data:", error);
      const projectContainer = document.getElementById("card");
      projectContainer.innerHTML = `<p>${error.message}</p>`;
    });
});
