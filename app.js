const apiKey = 'AIzaSyD7uJud0r_HMX0UdlJC-61wzRKx-AFCMGw'; // Replace with your API key

async function fetchFactChecks(query = '') {
    const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?key=${apiKey}&query=${encodeURIComponent(query)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Clear the previous fact-checks
        const factChecksContainer = document.getElementById('fact-checks');
        factChecksContainer.innerHTML = '';

        if (data.claims) {
            data.claims.forEach(claim => {
                const claimText = claim.text || 'No text available';
                const claimReview = claim.claimReview ? claim.claimReview[0] : null;
                const verdict = claimReview ? claimReview.textualRating : 'No verdict available';
                const publisher = claimReview ? claimReview.publisher.name : 'Unknown';

                const factCheckElement = document.createElement('div');
                factCheckElement.classList.add('fact-check');
                factCheckElement.innerHTML = `
                    <h3>${claimText}</h3>
                    <p><strong>Verdict:</strong> ${verdict}</p>
                    <p><strong>Source:</strong> ${publisher}</p>
                    <a href="${claimReview ? claimReview.url : '#'}" target="_blank">Read full fact check</a>
                `;
                factChecksContainer.appendChild(factCheckElement);
            });
        } else {
            factChecksContainer.innerHTML = '<p>No fact checks found.</p>';
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function searchClaim() {
    const query = document.getElementById('search').value;
    if (query) {
        fetchFactChecks(query);
    }
}

// Fetch latest fact checks on load
fetchFactChecks();
