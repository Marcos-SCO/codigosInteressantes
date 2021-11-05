let selectedOptions = document.querySelectorAll('.selected option');

// Remove all selected options from selected parent
selectedOptions.forEach(option => {
  option.removeAttribute('selected');
  option.classList.remove('selected');
});

// add property only to selected
let newSelected = document.querySelectorAll('.newSelected option');
// selectedArray.attr('selected', true);
selected.setAttribute('selected', true);
selected.classList.add('selected');