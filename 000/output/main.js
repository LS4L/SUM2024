var app = (function (exports) {
    'use strict';

    let gl;
    function main() {
        const canvas = document.querySelector("#glcanvas");
        if (canvas == null)
            return;
        const ctx = canvas.getContext("webgl2");
        if (!ctx)
            return;
        gl = ctx;
        gl.clearColor(1, 0, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    window.addEventListener('load', main);

    exports.main = main;

    return exports;

})({});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgZ2wgOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ2xjYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsXHJcbiAgICBpZiAoY2FudmFzID09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsMlwiKVxyXG4gICAgaWYgKCFjdHgpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICBnbCA9IGN0eFxyXG4gICAgZ2wuY2xlYXJDb2xvcigxLCAwLCAxLCAxKTtcclxuICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpXHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgbWFpbilcclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLElBQUksRUFBMkIsQ0FBQTthQUVmLElBQUksR0FBQTtRQUNoQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBNkIsQ0FBQTtRQUM5RSxJQUFJLE1BQU0sSUFBSSxJQUFJO1lBQ2QsT0FBTTtRQUNWLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdkMsSUFBQSxJQUFJLENBQUMsR0FBRztZQUNKLE9BQU07UUFDVixFQUFFLEdBQUcsR0FBRyxDQUFBO1FBQ1IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxQixJQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDOzs7Ozs7Ozs7OyJ9
