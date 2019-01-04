class PageObj {
    constructor() {
        this.elem = document.querySelector('.page');

        this.dpiDevice = this.getDPIdevice();
        this.setSizePage();
        
        // debug
        this.showDebugElem(
            this.dpiDevice,
            this.getWidthScrollBar(),
            this.widthPx,
            this.heightPx,
            window.devicePixelRatio,
            this.widthInch,
            this.heightInch
        );
    }

    getDPIdevice() {
        let dpiStartVal = 1,
            dpiEndVal = 1000;

        while(dpiStartVal != dpiEndVal) {

            let dpiMidVal = Math.floor(dpiStartVal + (dpiEndVal - dpiStartVal) / 2),
                dpiMediaCSS = window.matchMedia(
                    `(min-resolution: ${dpiStartVal}dpi) and (max-resolution: ${dpiMidVal}dpi)`
                );

            if (dpiMediaCSS.matches) {
                dpiEndVal = dpiMidVal;
            } else {
                dpiStartVal = dpiMidVal + 1;
            }
        }

        if(window.matchMedia(`(resolution: ${dpiStartVal}dpi)`).matches) return dpiStartVal;

        return false;
    }

    getWidthScrollBar() {
        let scrolledElem = document.createElement('div'),
            widthScrollBar;

        scrolledElem.style.visibility = 'hidden';
        scrolledElem.style.position = 'absolute';
        scrolledElem.style.width = '100px';
        scrolledElem.style.height = '100px';
        scrolledElem.style.overflowY = 'scroll';
        this.elem.appendChild(scrolledElem);
        widthScrollBar = scrolledElem.offsetWidth - scrolledElem.clientWidth;
        this.elem.removeChild(scrolledElem);

        return widthScrollBar;
    }

    setSizePage() {
        this.widthPx = this.elem.offsetWidth;
        this.heightPx = this.elem.clientHeight;
        this.widthInch = (this.widthPx * window.devicePixelRatio / this.dpiDevice).toFixed(2);
        this.heightInch = (this.heightPx * window.devicePixelRatio / this.dpiDevice).toFixed(2);

        this.elem.style.setProperty('--page-width', this.widthPx);
    }

    // debug
    showDebugElem() {
        let debugElem = document.createElement('div');

        debugElem.classList.add('debug-elem')
        debugElem.style.zIndex = '10000';
        debugElem.style.position = 'absolute';
        debugElem.style.left = '10px';
        debugElem.style.top = '10px';
        debugElem.style.padding = '20px';
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