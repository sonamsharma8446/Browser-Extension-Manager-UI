fetch('data.json')// Loads the data.json file from the project folder.
    .then(response => response.json())//Converts the response to a usable JavaScript object (an array of extension data).
    .then(
        data => {
            let allExtensions = data;
            const extensionList = document.querySelector(".grid-container");

            function renderExtensions(filter = 'all') {
                extensionList.innerHTML = '';
                const filtered = allExtensions.filter(user => {
                    if (filter === 'active') return user.isActive;
                    if (filter === 'inactive') return !user.isActive;
                    return true;
                })

                filtered.forEach(user => {
                    const extension = document.createElement("div");
                    extension.classList.add("grid-item");
                    extension.innerHTML = `
        <div class="box">
            <img src="${user.logo}" alt="${user.name}" /> 
            <div>
                <p style="font-size:1.2rem; margin-top:0%; color: #333446";><strong>${user.name}</strong></p>
                <p>${user.description}</p>
            </div>
        </div>     
        <div class="button"> 
            <button class="removeBtn">Remove</button>
            <div>
            <button class="toggleBtn">${user.isActive ? "Active" : "inActive"}</button>
            </div>
        </div>
            `;
                    extensionList.appendChild(extension);

                    const toggleBtn = extension.querySelector(".toggleBtn");
                    const removeBtn = extension.querySelector(".removeBtn");

                    toggleBtn.addEventListener("click", () => {
                        user.isActive = !user.isActive;
                        renderExtensions(filter);
                    });
                    removeBtn.addEventListener("click", () => {
                        allExtensions = allExtensions.filter(u => u !== user);
                        renderExtensions(filter);
                    })
                });
                document.querySelector('.all-btn').addEventListener("click", () => renderExtensions('all'));
                document.querySelector('.active-btn').addEventListener("click", () => renderExtensions('active'));
                document.querySelector('.inactive-btn').addEventListener("click", () => renderExtensions('inactive'));
            }
            renderExtensions();
        })
    .catch(error => console.error("Error loading JSON:", error));

document.querySelector("#themeSelector").addEventListener('change', (e) => {
    document.body.className = e.target.value;
})

