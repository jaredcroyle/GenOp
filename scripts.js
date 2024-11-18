function toggleMenu() {
    const menu = document.querySelector(".menu-links")
    const icon = document.querySelector(".hamburger-icon")
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}   

async function runCodonOptimization() {
    const sequence = document.getElementById('protein-sequence').value.trim();
    if (!sequence) {
        alert("Please enter a protein sequence.");
        return;
    }

    // Show loading state
    const outputText = document.getElementById('output-text');
    outputText.textContent = 'Optimizing sequence...';

    try {
        const formData = new FormData();
        formData.append('sequence', sequence);

        const response = await fetch('/optimize', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        if (result.error) {
            outputText.textContent = `Error: ${result.error}`;
            return;
        }

        // Display results
        outputText.innerHTML = `
            <h3>Original Sequence:</h3>
            <pre>${result.original_sequence}</pre>
            <h3>Optimized DNA Sequence:</h3>
            <pre>${result.optimized_sequence}</pre>
        `;
    } catch (error) {
        outputText.textContent = `Error: ${error.message}`;
    }
}
