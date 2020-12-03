const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach(draggable => {
    // Add dragging event
    draggable.addEventListener('dragstart', (e) => {
        draggable.classList.add('dragging')
    })

    // When the dragg end remove class
    draggable.addEventListener('dragend', (e) => {
        draggable.classList.remove('dragging');
    })
});

containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        // Enable dropping cursor
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        // Get the current dragging
        const draggable = document.querySelector('.dragging');
        // Append element to container
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    })
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;

}