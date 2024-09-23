document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.acordeon-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const allContents = document.querySelectorAll('.acordeon-content');

            allContents.forEach(item => {
                if (item !== content) {
                    item.style.display = 'none';
                }
            });

            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});
