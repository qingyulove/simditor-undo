/**
 * Created by Administrator on 2016/10/27 0027.
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module unless amdModuleId is set
        define('simditor-unto', ["jquery","UndoManager","simditor"], function (a0,b1,c2) {
            return (root['SimditorUnto'] = factory(a0,b1,c2));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("jquery"),require("UndoManager"),require("simditor"));
    } else {
        root['SimditorUnto'] = factory(jQuery,Simditor);
    }
}(this, function ($, Simditor) {

    var SimditorUnto,SimditorReto,
        extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
        hasProp = {}.hasOwnProperty,data=[],flag=0;
        function unit() {
            data.push($(".simditor-body").html());
        }
    SimditorUnto = (function(superClass) {
        extend(SimditorUnto, superClass);

        function SimditorUnto() {
            return SimditorUnto.__super__.constructor.apply(this, arguments);
        }

        SimditorUnto.prototype.name = 'undo';

        SimditorUnto.prototype.icon = 'undo';

        SimditorUnto.prototype.needFocus = false;
        SimditorUnto.prototype._init = function() {
            SimditorUnto.__super__._init.call(this);
            $(".simditor-body").ready(function () {
                unit();
            })

           this.editor.on('valuechanged',function () {
                    var value = $(".simditor-body").html();
                    data.push(value);
                    flag++;
            })
        };
        SimditorUnto.prototype.command = function () {
            var button,ref,i,len;
            ref = this.editor.toolbar.buttons;
            for (i = 0, len = ref.length; i < len; i++) {
                button = ref[i];
                if (button.name === 'undo') {
                    flag--;
                    if(flag<0){
                        flag = 0;
                        return false;
                    }
                    $(".simditor-body").html(data[flag]);
                    this.editor.focus();
                }
            }
        }

        return SimditorUnto;

    })(Simditor.Button);

    Simditor.Toolbar.addButton(SimditorUnto);


    /**/
     SimditorReto = (function(superClass) {
        extend(SimditorReto, superClass);

        function SimditorReto() {
            return SimditorReto.__super__.constructor.apply(this, arguments);
        }

        SimditorReto.prototype.name = 'redo';

        SimditorReto.prototype.icon = 'redo';

        SimditorReto.prototype.needFocus = false;
        SimditorReto.prototype._init = function() {
            SimditorReto.__super__._init.call(this);
        };
        SimditorReto.prototype.command = function () {
            var button,ref,i,len;
            ref = this.editor.toolbar.buttons;

            for (i = 0, len = ref.length; i < len; i++) {
                button = ref[i];
                if (button.name === 'redo') {
                    var length = data.length;
                    flag++;
                    if(flag>=length){
                        flag = length-1;
                        return false;
                    }
                    $(".simditor-body").html(data[flag]);
                    this.editor.focus();
                }
            }

        }

        return SimditorReto;

    })(Simditor.Button);

    Simditor.Toolbar.addButton(SimditorReto);

}));
