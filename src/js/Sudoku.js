/**
 * Create a collaborative sudoku.
 * Allows to play simultaneously a same board with several players
 * @author Vincent.B
 */
var Sudoku = (function ($) {
    function Sudoku() {

    }

    /**
     * Get sudoku HTML
     * @returns {*|jQuery|HTMLElement}
     */
    var getSudokuHtml = function () {
        var content = '';
        for (var i = 0; i < 9; i++) {
            content += '<tr>';
            for (var j = 0; j < 9; j++) {
                content += '<td><input type="text" name="sudoku[' + i + '][' + j + ']" /></td>';
            }
            content += '</tr>';
        }

        return $('<table>' + content + '</table>');
    };

    /*
     * Public methods
     */

    /**
     * Render the sudoku
     * @param wrapper: the wrapper (or container)
     */
    Sudoku.prototype.render = function (wrapper) {
        if (wrapper.length == 0) {
            throw 'The wrapper does not exist';
        }

        wrapper.html(getSudokuHtml());
    }

    return Sudoku;
})($);