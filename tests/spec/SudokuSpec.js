/**
 * Tests suite for Sudoku
 */
describe('Sudoku', function () {
    beforeAll(function() {
        this.sudoku = new Sudoku();
    });

    describe('render', function() {
        beforeEach(function() {
            this.wrapper = $('<div></div>');
        });

        it('Should have 9 rows', function() {
            this.sudoku.render(this.wrapper);
            expect(this.wrapper.find('tr').length).toEqual(9);
        });

        it('Should have 9 cols', function() {
            this.sudoku.render(this.wrapper);
            expect(this.wrapper.find('tr:first-child td').length).toEqual(9);
        });
    });
});
