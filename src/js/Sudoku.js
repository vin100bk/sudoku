/**
 * Create a collaborative sudoku.
 * Allows to play simultaneously a same board with several players
 * @author Vincent.B
 */
var Sudoku = (function ($) {
    /**
     * Configuration information
     */
    var config = {
        'id': 'sudoku'
    };

    /**
     * Contains sudoku values
     */
    var values = {};

    /**
     * @constructor
     */
    function Sudoku(c) {
        config = $.extend({}, config, c || {});
    }

    /*******
     * Private methods
     *******/

    /**
     * Get sudoku HTML
     * @returns {*|jQuery|HTMLElement}
     * @private
     */
    var _getSudokuHtml = function () {
        var content = '';
        for (var i = 0; i < 9; i++) {
            content += '<tr>';
            for (var j = 0; j < 9; j++) {
                content += '<td><input type="text" name="sudoku[' + i + '][' + j + ']" /></td>';
            }
            content += '</tr>';
        }

        return $('<table id="' + config.id + '">' + content + '</table>');
    };

    /**
     * Is a subset valid ?
     * Check that every value is unique in a subset, check that every value is a digit as well
     * @param subset
     * @returns {boolean}
     * @private
     */
    var _isSubsetValid = function (subset) {
        var tmpSubset = {};
        for (var i = 0; i < subset.length; i++) {
            // Is it a digit ?
            if (!subset[i].toString().match(/^[1-9]$/)) {
                return false;
            }

            if (subset[i] in tmpSubset) {
                // The value already exist in the subset
                return false;

            } else {
                tmpSubset[subset[i]] = 1;
            }
        }

        return true;
    };

    /**
     * Initialize listerners on the table
     * @private
     */
    var _initListeners = function() {
        $('#' + config.id + ' input').on('keydown', function(e) {
            // Accept only 1-9 (1 character) and deletion keys
            if((e.which == 8 || e.which == 46) || (e.which >= 49 && e.which <= 57 && $(this).val().length == 0)) {
                $('#' + config.id).trigger('change');
                return true;
            } else {
                return false;
            }
        });
    };

    /*******
     * Public methods
     *******/

    /**
     * Render the sudoku
     * @param wrapper: the wrapper (or container)
     */
    Sudoku.prototype.render = function (wrapper) {
        if (wrapper.length == 0) {
            throw 'The wrapper does not exist';
        }

        // Insert the table in the wrapper
        wrapper.html(_getSudokuHtml());

        // Init listeners
        _initListeners();
    };

    /**
     * Is the sudoku valid?
     * @returns {boolean}
     */
    Sudoku.prototype.isValid = function () {
        var rows = [];
        var cols = [];
        var squares = {};

        for (var i = 0; i < 9; i++) {
            // Row
            if (i in values) {
                rows.push(values[i]);
            }

            var col = [];
            for (var j = 0; j < 9; j++) {
                // Column
                if (j in values && i in values[j]) {
                    col.push(values[j][i]);
                }

                // Square
                if (i in values && j in values[i]) {
                    var key = i % 3 + '|' + j % 3;
                    if (!key in squares) {
                        squares[key] = [];
                    }

                    squares[key] = values[i][j];
                }
            }

            cols.push(col);
        }

        var subsets = rows.concat(cols, Object.keys(squares).map(function(key){return squares[key]}));
        for (var i = 0; i < subsets.length; i++) {
            if (!_isSubsetValid(subsets[i])) {
                return false;
            }
        }
        return true;
    };

    /**
     * Set sudoku values
     * @param v: values
     */
    Sudoku.prototype.setValues = function (v) {
        values = v;
    };

    return Sudoku;
})($);