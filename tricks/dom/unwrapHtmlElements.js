function unwrap(el) {
        let $wrapper = document.querySelector(el);
        if (!$wrapper) return;
        // place childNodes in document fragment
        let child;
        let docFrag = document.createDocumentFragment();

        while ($wrapper.firstChild) {
            child = $wrapper.removeChild($wrapper.firstChild);
            docFrag.appendChild(child);
        }
    
        // replace $wrapper with document fragment
        $wrapper.parentNode.replaceChild(docFrag, $wrapper);
    }