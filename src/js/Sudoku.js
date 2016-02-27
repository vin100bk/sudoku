/**
 * Create a collaborative sudoku.
 * Allows to play simultaneously a same board with several players
 * @author Vincent.B
 */
var Sudoku = (function ($) {
    var self;

    /**
     * Configuration information
     */
    var config = {
        'id': 'sudoku',
        'class': 'sudoku'
    };

    /**
     * Contains sudoku values
     */
    var values = {};

    /**
     * Firebase instance
     */
    var firebase = new Firebase('https://sudokucol.firebaseio.com/');

    /**
     * Sudoku reference
     */
    var reference;

    /**
     * @constructor
     * @param ref: the sudoku reference
     * @param c: configuration
     */
    function Sudoku(ref, c) {
        reference = ref;
        config = $.extend({}, config, c || {});

        // Init values
        _initValues();

        self = this;
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
                content += '<td><input type="text" name="sudoku" data-row="' + i + '" data-col="' + j + '" /></td>';
            }
            content += '</tr>';
        }

        return $('<table class="' + config.class + '" id="' + config.id + '">' + content + '</table>');
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
            if (subset[i] && !subset[i].toString().match(/^[1-9]$/)) {
                console.log('Invalid digit ' + subset[i]);
                return false;
            }

            if (subset[i] in tmpSubset) {
                // The value already exist in the subset
                console.log('Duplicates in the subset ' + subset);
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
    var _initListeners = function () {
        $('#' + config.id + ' input').on('keydown', function (e) {
            // Accept only 1-9 (1 character) and deletion keys
            return (e.which == 8 || e.which == 46) || (e.which >= 49 && e.which <= 57 && $(this).val().length == 0);
        });

        $('#' + config.id + ' input').on('keyup', function (e) {
            var obj = $(this);
            // Accept only 1-9 (1 character) and deletion keys
            // Store the value
            if (!(obj.data('row') in values)) {
                values[obj.data('row')] = {};
            }

            if (obj.val().length == 1) {
                // Store the value
                values[obj.data('row')][obj.data('col')] = obj.val();
            } else {
                // Delete the value
                delete values[obj.data('row')][obj.data('col')];
            }

            // Notify the change
            $('#' + config.id).trigger('update');
        });

        $('#' + config.id).on('update', function () {
            // Store it
            firebase.child(reference).set(values);

            // Check the status of the sudoku
            _checkStatus();
        });
    };

    /**
     * Check the status of the sudoku
     * Display a notice if the user lose or win
     * @private
     */
    var _checkStatus = function() {
        if (!self.isValid()) {
            _lost();
        }
        else if (self.isFinished() && self.isValid()) {
            _won();
        }
    };

    /**
     * Init values from Firebase and attach an event for real time reading
     * @private
     */
    var _initValues = function () {
        // Read in Firebase and attach handler for each modification
        firebase.child(reference).on('value', function (snapshot) {
            values = snapshot.val() || {};
            _populateTable();
            _checkStatus();
        });
    };

    /**
     * Populate the sudoku table
     * @private
     */
    var _populateTable = function () {
        for (var r in values) {
            for (var c in values[r]) {
                $('#' + config.id + ' input[data-row="' + r + '"][data-col="' + c + '"]').val(values[r][c]);
            }
        }
    };

    /**
     * Remove all popups
     * @private
     */
    var _removePopup = function () {
        $('.popup').remove();
        $('.popup-wrapper').remove();
    };

    /**
     * Called when you lose
     * @private
     */
    var _lost = function () {
        _removePopup();
        $('body').append('<div class="popup-wrapper"></div><div class="popup popup-lost"><p>You lost, the last action made the sudoku invalid !</p><p class="popup-buttons"><a href="#" id="continueSudoku">Continue this sudoku</a> - <a href="">Start another Sudoku</a></p></div>');

        // Undo the last action
        $('#continueSudoku').on('click', function (e) {
            e.preventDefault();
            _removePopup();
        });
    };

    /**
     * Called when you win
     * @private
     */
    var _won = function () {
        _removePopup();
        $('body').append('<div class="popup-wrapper"></div><div class="popup popup-won"><p>Congratulations ! You succeed !</p><p class="popup-buttons"><a href="">Start another Sudoku</a></p></div>');
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
                rows.push(Object.keys(values[i]).map(function (key) {
                    return values[i][key]
                }));
            }

            var col = [];
            for (var j = 0; j < 9; j++) {
                // Column
                if (j in values && i in values[j]) {
                    col.push(values[j][i]);
                }

                // Square
                if (i in values && j in values[i]) {
                    var key = Math.floor(i / 3) + '|' + Math.floor(j / 3);
                    if (! (key in squares)) {
                        squares[key] = [];
                    }

                    squares[key].push(values[i][j]);
                }
            }

            cols.push(col);
        }

        var subsets = rows.concat(cols, Object.keys(squares).map(function (key) {
            return squares[key]
        }));

        for (var i = 0; i < subsets.length; i++) {
            if (!_isSubsetValid(subsets[i])) {
                return false;
            }
        }
        return true;
    };

    /**
     * Is the sudoku finished?
     * @returns {boolean}
     */
    Sudoku.prototype.isFinished = function () {
        if (Object.keys(values).length != 9) {
            return false;
        }

        for (var c in values) {
            if (Object.keys(values[c]).length != 9) {
                return false
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