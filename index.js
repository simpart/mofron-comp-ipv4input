/**
 * @file   mofron-comp-ipv4input/index.js
 * @author simpart
 */
const mf     = require('mofron');
const Input  = require('mofron-comp-input');
const Text   = require('mofron-comp-text');
const Horiz  = require('mofron-layout-horizon');
const Margin = require('mofron-layout-margin');
/**
 * @class mofron.comp.Ipv4Input
 * @brief ipaddr v4 input component for mofron
 */
mf.comp.Ipv4Input = class extends Input {
    
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('Ipv4Input');
            this.prmMap('value');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @param prm : 
     */
    initDomConts () {
        try {
            let lbl   = new mf.Dom('div',this);
            let input = new mf.Dom('div', this);
            
            this.adom().addChild(
                new mf.Dom({
                    tag       : 'div',
                    component : this,
                    child     : [lbl,input]
                })
            )
            this.target(lbl);
            this.child([new Text('IP Address')]);
            this.target(input);
            
            this.style({
                'align-items' : 'baseline'
            });
            this.child([
                new Input({
                    type  : 'number',
                }),
                new Text({
                    text : '.'
                }),
                new Input({
                    type  : 'number',
                }),
                new Text({
                    text : '.'
                }),
                new Input({
                    type  : 'number',
                }),
                new Text({
                    text : '.'
                }),
                new Input({
                    type  : 'number',
                })
            ]);
            
            this.layout([
                new Horiz(),
                new Margin({
                    type  : 'left',
                    value : 5,
                    skip  : this.child()[0]
                })
            ]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    value (p1, p2, p3, p4) {
        try {
            let inp = this.getInput();
            if (undefined === p1) {
                /* getter */
                let ret   = [];
                let empty = true;
                for (let idx in inp) {
                    if (null !== inp[idx].value()) {
                        empty = false;
                    }
                    ret.push(inp[idx].value());
                }
                return (true === empty) ? null : ret;
            }
            /* setter */
            if (true === Array.isArray(p1) && (4 === p1.length)) {
                this.value(p1[0], p1[1], p1[2], p1[3]);
                return;
            }
            if ( ('number' !== typeof p1) ||
                 ('number' !== typeof p2) ||
                 ('number' !== typeof p3) ||
                 ('number' !== typeof p4) ||
                 ((0 > p1) || (255 < p1)) ||
                 ((0 > p2) || (255 < p2)) || 
                 ((0 > p3) || (255 < p3)) ||
                 ((0 > p4) || (255 < p4)) ) {
                throw new Error('invalid parameter');
            }
            for (let idx in inp) {
                inp[idx].value(arguments[idx]+ '');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    checkValue () {
        try {
            let inp = this.getInput();
            let val = null;
            for (let idx in inp) {
                val = parseInt(inp[idx].value());
                if ((null === val) || (0 > val) || (255 < val)) {
                    return 'invalid ip address';
                }
            }
            return null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.child()[0].height();
            }
            /* setter */
            let chd = this.child();
            for (let cidx in chd) {
                if (true === mf.func.isInclude(chd[cidx], 'Input')) {
                    chd[cidx].height(prm);
                } else if (true === mf.func.isInclude(chd[cidx], 'Text')) {
                    chd[cidx].size(prm);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    width (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return null;
            }
            /* setter */
            if ( ('string' === typeof prm) || ('number' === typeof prm)) {
                let inp = this.getInput();
                for (let idx in inp) {
                    inp[idx].width(prm);
                }
            } else {
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getInput () {
        try {
            let chd = this.child();
            let ret = [];
            for (let cidx in chd) {
                if (true === mf.func.isInclude(chd[cidx], 'Input')) {
                    ret.push(chd[cidx]);
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    focus (flg, idx) {
        try {
            let inp = this.getInput();
            if (undefined === flg) {
                /* getter */
                for (let idx in inp) {
                    if (true === inp[idx].focus()) {
                        return true;
                    }
                }
                return false;
            }
            /* setter */
            inp[(undefined === idx) ? 0 : idx].focus(flg);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.Ipv4Input;
/* end of file */
