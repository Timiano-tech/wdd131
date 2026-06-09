// Increment review counter in localStorage
function incrementReviewCounter() {
    let reviewCount = localStorage.getItem("reviewCount");
    reviewCount = reviewCount ? parseInt(reviewCount) + 1 : 1;
    localStorage.setItem("reviewCount", reviewCount);
    return reviewCount;
}

// Display review summary from URL parameters
function displayReviewSummary() {
    const params = new URLSearchParams(window.location.search);
    const summary = document.getElementById("reviewSummary");
    
    const productName = params.get("productName") || "N/A";
    const installDate = params.get("installDate") || "N/A";
    const rating = params.get("rating") || "N/A";
    const reviewText = params.get("reviewText") || "No review text provided";
    const reviewerName = params.get("reviewerName") || "Anonymous";
    const features = params.getAll("features");
    
    let summaryHTML = `
        <div style="margin: 2rem 0; padding: 1.5rem; background-color: #fff; border-radius: 4px;">
            <p><strong>Product:</strong> ${productName}</p>
            <p><strong>Installation Date:</strong> ${installDate}</p>
            <p><strong>Rating:</strong> ${'☆'.repeat(rating)}</p>
            <p><strong>Features:</strong> ${features.length > 0 ? features.join(", ") : "None selected"}</p>
            <p><strong>Review:</strong> ${reviewText}</p>
            <p><strong>Reviewer Name:</strong> ${reviewerName}</p>
        </div>
    `;
    
    summary.innerHTML = summaryHTML;
}


const reviewCount = incrementReviewCounter();
const counterDisplay = document.getElementById("reviewCounter");
counterDisplay.innerHTML = `Total reviews completed: <strong>${reviewCount}</strong>`;

displayReviewSummary();

const date = document.getElementById("lastModified");
date.innerHTML = `Last Modification: ${document.lastModified}`;

const year = document.querySelector("#currentyear");
year.innerHTML = new Date().getFullYear();
