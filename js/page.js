class PageObj {
    constructor() {
        this.elem = document.querySelector('.page');
        this.contentElem = document.querySelector('.page__content');

        this.width = 0;
        this.height = 0;
        this.scrollBarWidth = 0;
        this.contentElem.style.width = 0;

        this.setSizePage();
    }

    getWidthScrollBar() {
        let scrolledElem = document.createElement('div'),
            scrollBarWidth;

        scrolledElem.style.visibility = 'hidden';
        scrolledElem.style.position = 'absolute';
        scrolledElem.style.width = '100px';
        scrolledElem.style.height = '100px';
        scrolledElem.style.overflowY = 'scroll';
        this.elem.appendChild(scrolledElem);
        scrollBarWidth = scrolledElem.offsetWidth - scrolledElem.clientWidth;
        this.elem.removeChild(scrolledElem);

        return scrollBarWidth;
    }

    setSizePage() {
        this.width = this.elem.offsetWidth;
        this.height = this.elem.clientHeight;
        this.scrollBarWidth = this.getWidthScrollBar();
        this.contentElem.style.width = `${this.width + this.scrollBarWidth}px`;

        this.elem.style.setProperty('--page-width', this.width);
    }

    // debug
    showDebugElem() {
        let debugElem = document.createElement('div');

        debugElem.classList.add('debug-elem')
        debugElem.style.zIndex = '10000';
        debugElem.style.position = 'fixed';
        debugElem.style.left = '10px';
        debugElem.style.top = '10px';
        debugElem.style.padding = '20px';
        debugElem.style.borderRadius = '5px';
        debugElem.style.fontSize = '20px';
        debugElem.style.lineHeight = '40px';
        debugElem.style.backgroundColor = 'white';
        debugElem.style.color = 'black';

        debugElem.innerHTML = `${arguments[0]}`;

        for (let i = 1; i < arguments.length; i++) {
            debugElem.innerHTML = debugElem.innerHTML +
                                `<br>${arguments[i]}`
        }

        this.elem.appendChild(debugElem);

        return true;
    }
    removeDebugElem() {
        let debugElem = document.querySelector('.debug-elem');
        
        if(debugElem) return false;
        
        this.elem.removeChild(debugElem);

        return true;
    }
}

pageObj = new PageObj;