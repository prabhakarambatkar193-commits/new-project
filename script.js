const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Reliable public mock endpoint for articles/news

async function fetchNewsHeadlines() {
    const listContainer = document.getElementById('headline-list');
    const updateTimeLabel = document.getElementById('last-updated');

    try {
        // Fetch data from public API
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Extract the top 5 items
        const topFive = data.slice(0, 5);

        // Clear loading state
        listContainer.innerHTML = '';

        // Render each headline into the list
        topFive.forEach((article, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${article.title.charAt(0).toUpperCase() + article.title.slice(1)}`;
            listContainer.appendChild(li);
        });

        // Update timestamp
        const now = new Date();
        updateTimeLabel.textContent = `Last updated: ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    } catch (error) {
        console.error('Failed to fetch news:', error);
        listContainer.innerHTML = `<li style="color: #e74c3c; text-align: center;">Failed to load headlines. Retrying soon...</li>`;
    }
}

// 1. Fetch immediately on page load
fetchNewsHeadlines();

// 2. Set an interval to refresh data every 1 hour (3600000 ms)
setInterval(fetchNewsHeadlines, 3600000);