import {shallow, isstr} from './util.js'

class Canv {
    constructor(opts) {
        opts = shallow(opts || {})
        opts.w = opts.w || 200
        opts.h = opts.h || 200
        opts.factor = opts.factor || 2
        if (isstr(opts.append_to) && opts.append_to != "")
            opts.append_to = document.getElementById(opts.append_to)
        opts.append_to = opts.append_to || document.body
        //fixed, absolute, relatec
        opts.style_pos = opts.style_pos || "relative"

        this.canv = document.createElement("canvas")
        this.canv.style.position = opts.style_pos
        this.canv.style.top = "0"
        this.canv.style.left = "0"
        opts.append_to.style.position = "relative"
        opts.append_to.appendChild(this.canv)
        
        this.canv.width = opts.w * opts.factor
        this.canv.height = opts.h * opts.factor
        this.canv.style.width = opts.w + "px"
        this.canv.style.height = opts.h + "px"
        this.ctx = this.canv.getContext("2d")
        this.ctx.scale(opts.factor, opts.factor)

        this.opts = opts
    }

    setZ(z) {
        this.canv.style.zIndex = z+""
    }

    setWH(w, h) {
        this.canv.width = w * this.opts.factor
        this.canv.height = h * this.opts.factor
        this.canv.style.width = w + "px"
        this.canv.style.height = h + "px"
    }

    mousePos(ev)
    {
        const rect = this.canv.getBoundingClientRect()
        const x = ev.clientX - rect.left //-this.border
        const y = ev.clientY - rect.top //-this.border
        return [x,y]
    }
        
    saveImg(image_or_undefined, on_ready) {
        let im = image_or_undefined || new Image
        im.src = this.canvs[ctx_id].toDataURL()
        im.onload = function() { on_ready(im) }
    }

    clear() {
        this.ctxs.clearRect(0, 0, this.canv.width, this.canv.height)
    }
}

class MultiCanv
{
    constructor(opts) 
    {
        //opts.w: width in pixels
        //opts.h: height in pixels
        //opts.append_to:
        //  typically a div, can set opts.make_div to do it automatically.
        //  if it's document.body and we want to move the canvas to the top-left
        //  make this 'fixed'. if we want stuff behind or in front of the canvas
        //  make this 'absolute'.
        opts = shallow(opts || {})
        opts.w = opts.w || 200
        opts.h = opts.h || 200
        opts.layers = opts.layers || 1
        opts.z_offs = opts.z_offs || 0

        if (isstr(opts.append_to) && opts.append_to != "")
            opts.append_to = document.getElementById(opts.append_to)
        opts.append_to = opts.append_to || document.body
        if (opts.make_div) {
            this.div = document.createElement("div")
            this.div.style = "display:inline-block"
            opts.append_to.appendChild(this.div)
        }

        if (opts.disable_overflow) //if append_to is document.body, full screen mode
            opts.append_to.style.overflow = "hidden";

        //The (fist) canvas with the largest z offset will be on top
        let ap = opts.style_pos
        this.canvs = []
        for (let i = 0; i < opts.layers; i++)
        {
            let child_opts = shallow(opts)
            if (this.div)
                child_opts.append_to = this.div
            if (!opts.style_pos)
                child_opts.style_pos = i == 0 ? "relative" : "absolute"
            let addee = new Canv(child_opts)
            this.canvs.push(addee);
            addee.setZ(opts.layers-1-i+opts.z_offs);
        }
    
        this.opts = opts
    }

    get w() {
        return this.canvs[0].canv.width
    }
    
    get h() {
        return this.canvs[0].canv.height
    }

    setWH(w, h) {
        for (let i = 0; i < this.canvs.length; i++) {
            this.canvs[i].setWH(w, h);
        }
    }

    resizeToScreen() {
        for (let i = 0; i < this.canvs.length; i++) {
            this.canvs[i].setWH(window.innerWidth, window.innerHeight);
        }
    }

    clear() {
        for (let i = 0; i < this.canvs.length; i++)
            this.canvs[i].clear();
    }
}

export {MultiCanv, Canv}
