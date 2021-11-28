//Grid defined by minimum pixels per cell and 'take_extra' fraction per cell
//The x and y axes can be solved independantly

class GridDim {
    constructor(min_pxs, take_extras) {
        if (take_extras === undefined)
            take_extra = new Array(min_pxs.length).fill(1./min_pxs.length)

        if (min_pxs.length != take_extras.length)
            throw new Error('sz mismatch '+min_pxs.length+' != '+take_extras.length)

        this.min_pxs = [...min_pxs]
        this.min_sum = take_extras.reduce((cumsum,x) => cumsum+x, 0)

        //normalize take_extras to sum to 1
        let norm = take_extras.reduce((cumsum,x) => cumsum+x, 0)
        this.take_extras = take_extras.map(x => x / norm)
        
        this.calcd_pxs = [...min_pxs]
    } 

    calc(px) {
        let leftover = px
        for (let i = 0; i < this.min_pxs.length; i++) {
            this.calcd_pxs[i] = this.min_pxs[i];
            leftover -= this.calcd_pxs[i];
        }
        if (leftover > 0) { 
            for (let i = 0; i < this.min_pxs.length; i++)
                this.calcd_pxs[i] += Math.floor(this.take_extras[i] * leftover)
        }
    }
};

export {GridDim};
