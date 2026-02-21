// CV PDF Download functionality

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadPdf');
    const cvContent = document.getElementById('cv-content');

    downloadBtn.addEventListener('click', function() {
        // Show loading state
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Generating PDF...';
        downloadBtn.disabled = true;

        // PDF options - A4 format
        const options = {
            margin: 0,
            filename: 'Voun_Irish_Florence_Dejumo_CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true,
                logging: false
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Add class for PDF generation
        cvContent.classList.add('generating-pdf');

        // Generate PDF
        html2pdf()
            .set(options)
            .from(cvContent)
            .save()
            .then(() => {
                // Reset button state
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
                cvContent.classList.remove('generating-pdf');
            })
            .catch((error) => {
                console.error('PDF generation failed:', error);
                downloadBtn.innerHTML = '<i class="bi bi-exclamation-circle"></i> Error - Try Again';
                downloadBtn.disabled = false;
                cvContent.classList.remove('generating-pdf');
                
                setTimeout(() => {
                    downloadBtn.innerHTML = originalText;
                }, 3000);
            });
    });
});
