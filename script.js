// Load projects from JSON file
async function loadProjects() {
  try {
    const response = await fetch("./projects.json");
    const projects = await response.json();

    const projectsContainer = document.getElementById("projectsContainer");

    projects.forEach((project) => {
      const projectElement = createProjectElement(project);
      projectsContainer.appendChild(projectElement);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    // Fallback content if JSON fails to load
    document.getElementById("projectsContainer").innerHTML =
      '<p style="text-align: center; color: white;">Projects will be loaded here</p>';
  }
}

// Create individual project element
function createProjectElement(project) {
  const projectDiv = document.createElement("div");
  projectDiv.className = "project-item";

  projectDiv.innerHTML = `
    <div class="project-title">${project.title}</div>
    <div class="project-description">${project.description}</div>
    <div class="project-technologies">
      ${project.technologies
        .map((tech) => `<span class="tech-tag">${tech}</span>`)
        .join("")}
    </div>
    <div class="project-links">
      ${
        project.github
          ? `<a href="${project.github}" target="_blank" class="project-link github-link">GitHub</a>`
          : ""
      }
      ${
        project.demo
          ? `<a href="${project.demo}" target="_blank" class="project-link demo-link">Live Demo</a>`
          : ""
      }
    </div>
  `;

  return projectDiv;
}

// Load projects when page loads
document.addEventListener("DOMContentLoaded", loadProjects);
