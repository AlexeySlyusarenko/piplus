class PageObj {
    constructor() {
        this.dpiDevice = this.getDPIdevice();

        this.elem = document.querySelector('.page');
        // this.widthPx = this.elem.clientWidth;
        // this.heightPx = this.elem.clientHeight;
        // this.widthInch = this.widthPx / this.dpiDevice;
        // this.heightInch = this.heightPx / this.dpiDevice;

        this.setSizePage ();
    }

    getDPIdevice() {
        for (let dpi = 10; dpi < 750; dpi = dpi + 10) {
            let dpiMediaCSS = window.matchMedia(
                `(min-resolution: ${dpi}dpi) and (max-resolution: ${dpi + 10}dpi)`
            );
    
            if (dpiMediaCSS.matches) return dpi + 5;
        }
    
        return false;
    }

    getWidthScrollBar() {
        let hasScrollBarElem = document.createElement('div'),
            widthScrollBar;

        hasScrollBarElem.style.visibility = 'hidden';
        hasScrollBarElem.style.position = 'absolute';
        hasScrollBarElem.style.width = '100px';
        hasScrollBarElem.style.height = '100px';
        hasScrollBarElem.style.overflowY = 'scroll';
        this.elem.appendChild(hasScrollBarElem);
        widthScrollBar = hasScrollBarElem.offsetWidth - hasScrollBarElem.clientWidth;
        this.elem.removeChild(hasScrollBarElem);

        return widthScrollBar;
    }

    setSizePage() {
        this.widthPx = this.elem.offsetWidth;
        this.heightPx = this.elem.clientHeight;
        this.widthInch = this.widthPx * window.devicePixelRatio / this.dpiDevice;
        this.heightInch = this.heightPx * window.devicePixelRatio / this.dpiDevice;

        this.elem.style.setProperty('--page-width', this.widthPx);
    }
}

pageObj = new PageObj;