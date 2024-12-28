document.addEventListener("DOMContentLoaded", function () {
    const resultsContainer = document.getElementById("results-container");
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q")?.toLowerCase().trim();

    if (!query) {
        resultsContainer.innerHTML = "<p>No search query provided.</p>";
        return;
    }

    // Define searchable content (static data from index.html)
    const searchableContent = [
        {
            id: "services",
            text: "Our services include technology consulting, project management, and cloud solutions.",
        },
        {
            id: "partners",
            text: "We partner with leading companies like Adobe, Spotify, and more.",
        },
        {
            id: "about",
            text: "Learn more about Cloudy Boss, our mission, and our organizational values.",
        },
        {
            id: "contact",
            text: "Contact us for more information about our solutions.",
        },
    ];

    // Filter results based on the query
    const results = searchableContent.filter((item) =>
        item.text.toLowerCase().includes(query)
    );

    if (results.length > 0) {
        // Create links for each result
        results.forEach((result) => {
            const link = document.createElement("a");
            link.href = `index.html#${result.id}`; // Link to the specific section
            link.textContent = result.text;
            link.style.display = "block";
            link.style.marginBottom = "10px";
            link.style.textDecoration = "none";
            link.style.color = "#007BFF";

            // Add hover effects
            link.addEventListener("mouseover", () => (link.style.textDecoration = "underline"));
            link.addEventListener("mouseout", () => (link.style.textDecoration = "none"));

            resultsContainer.appendChild(link);
        });
    } else {
        resultsContainer.innerHTML = `<p>No results found for "<strong>${query}</strong>".</p>`;
    }
});
