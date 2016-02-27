/**
 * Tests suite for Sudoku
 */
describe('Sudoku', function () {
    beforeAll(function() {
        this.sudoku = new Sudoku('test');
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

    describe('isValid', function() {

        it('An empty sudoku should be valid', function() {
            expect(this.sudoku.isValid()).toBe(true);
        });

        it('Should return false with wrong values', function() {
            this.sudoku.setValues({
                0: {
                    0: 10,
                }
            });
            expect(this.sudoku.isValid()).toBe(false);

            this.sudoku.setValues({
                0: {
                    0: 'pouet',
                }
            });
            expect(this.sudoku.isValid()).toBe(false);
        });

        it('A full valid sudoku should return true', function() {
            this.sudoku.setValues({
                0: {
                    0: 1,
                    1: 2,
                    2: 3,
                    3: 4,
                    4: 5,
                    5: 6,
                    6: 7,
                    7: 8,
                    8: 9
                },
                1: {
                    0: 4,
                    1: 5,
                    2: 6,
                    3: 7,
                    4: 8,
                    5: 9,
                    6: 1,
                    7: 2,
                    8: 3
                },
                2: {
                    0: 7,
                    1: 8,
                    2: 9,
                    3: 1,
                    4: 2,
                    5: 3,
                    6: 4,
                    7: 5,
                    8: 6
                },
                3: {
                    0: 9,
                    1: 1,
                    2: 2,
                    3: 5,
                    4: 6,
                    5: 7,
                    6: 3,
                    7: 4,
                    8: 8
                },
                4: {
                    0: 3,
                    1: 4,
                    2: 5,
                    3: 8,
                    4: 9,
                    5: 1,
                    6: 2,
                    7: 6,
                    8: 7
                },
                5: {
                    0: 6,
                    1: 7,
                    2: 8,
                    3: 2,
                    4: 3,
                    5: 4,
                    6: 5,
                    7: 9,
                    8: 1
                },
                6: {
                    0: 8,
                    1: 9,
                    2: 1,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 2
                },
                7: {
                    0: 2,
                    1: 3,
                    2: 4,
                    3: 6,
                    4: 7,
                    5: 8,
                    6: 9,
                    7: 1,
                    8: 5
                },
                8: {
                    0: 5,
                    1: 6,
                    2: 7,
                    3: 9,
                    4: 1,
                    5: 2,
                    6: 8,
                    7: 3,
                    8: 4
                }
            });
            expect(this.sudoku.isValid()).toBe(true);
        });

        it('A full unvalid sudoku should return false', function() {
            this.sudoku.setValues({
                0: {
                    0: 1,
                    1: 2,
                    2: 3,
                    3: 4,
                    4: 5,
                    5: 6,
                    6: 7,
                    7: 8,
                    8: 9
                },
                1: {
                    0: 4,
                    1: 5,
                    2: 6,
                    3: 7,
                    4: 8,
                    5: 9,
                    6: 1,
                    7: 2,
                    8: 3
                },
                2: {
                    0: 7,
                    1: 8,
                    2: 9,
                    3: 1,
                    4: 2,
                    5: 3,
                    6: 4,
                    7: 5,
                    8: 6
                },
                3: {
                    0: 9,
                    1: 1,
                    2: 2,
                    3: 5,
                    4: 6,
                    5: 7,
                    6: 3,
                    7: 4,
                    8: 5
                },
                4: {
                    0: 3,
                    1: 4,
                    2: 5,
                    3: 8,
                    4: 9,
                    5: 1,
                    6: 2,
                    7: 6,
                    8: 7
                },
                5: {
                    0: 6,
                    1: 7,
                    2: 8,
                    3: 2,
                    4: 3,
                    5: 4,
                    6: 5,
                    7: 9,
                    8: 1
                },
                6: {
                    0: 8,
                    1: 9,
                    2: 1,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 2
                },
                7: {
                    0: 2,
                    1: 3,
                    2: 4,
                    3: 6,
                    4: 7,
                    5: 8,
                    6: 9,
                    7: 1,
                    8: 5
                },
                8: {
                    0: 5,
                    1: 6,
                    2: 7,
                    3: 9,
                    4: 1,
                    5: 2,
                    6: 8,
                    7: 3,
                    8: 4
                }
            });
            expect(this.sudoku.isValid()).toBe(false);
        });

        it('A partial valid sudoku should return true', function() {
            this.sudoku.setValues({
                0: {
                    0: 1,
                    1: 2,
                    2: 3,
                    4: 5,
                    5: 6,
                    6: 7,
                    8: 9
                },
                1: {
                    0: 4,
                    1: 5,
                    2: 6,
                    4: 8,
                    5: 9,
                    6: 1,
                    7: 2,
                    8: 3
                },
                3: {
                    0: 9,
                    1: 1,
                    2: 2,
                    3: 5,
                    5: 7,
                    6: 3,
                    7: 4,
                    8: 8
                },
                5: {
                    0: 6,
                    1: 7,
                    2: 8,
                    3: 2,
                    4: 3,
                    5: 4,
                    6: 5,
                    7: 9,
                    8: 1
                },
                7: {
                    0: 2,
                    1: 3,
                    2: 4,
                    3: 6,
                    4: 7,
                    5: 8,
                    6: 9,
                    7: 1,
                    8: 5
                },
                8: {
                    0: 5,
                    1: 6,
                    2: 7,
                    4: 1,
                    5: 2,
                    6: 8,
                    7: 3,
                    8: 4
                }
            });
            expect(this.sudoku.isValid()).toBe(true);
        });

        it('A partial unvalid sudoku should return false', function() {
            this.sudoku.setValues({
                0: {
                    0: 1,
                    1: 2,
                    2: 3,
                    4: 5,
                    5: 6,
                    6: 7,
                    8: 9
                },
                1: {
                    0: 2,
                    1: 3,
                    2: 4,
                    3: 5,
                    4: 6,
                    5: 7,
                    6: 8,
                    8: 1
                },
                2: {
                    2: 5,
                    3: 6,
                    4: 7,
                    5: 8,
                    6: 9,
                    7: 1,
                    8: 2
                },
                3: {
                    0: 4,
                    1: 5,
                    2: 6,
                    3: 7,
                    4: 8,
                    6: 1,
                    7: 2,
                },
                4: {
                    0: 5,
                    1: 6,
                    2: 7,
                    3: 8,
                    4: 9,
                    5: 1,
                    6: 2,
                    7: 3,
                    8: 4
                },
                5: {
                    0: 6,
                    1: 7,
                    2: 8,
                    3: 9,
                    4: 1,
                    5: 2,
                    6: 3,
                    7: 4,
                    8: 5
                },
                7: {
                    1: 9,
                    2: 1,
                    3: 2,
                    4: 3,
                    5: 4,
                    6: 5,
                    7: 6,
                    8: 8
                },
                8: {
                    0: 9,
                    1: 1,
                    2: 2,
                    7: 8
                }
            });
            expect(this.sudoku.isValid()).toBe(false);
        });
    });

    describe('isFinished', function() {
        it('A full sudoku should return true', function() {
            this.sudoku.setValues({
                0: {
                    0: 1,
                    1: 2,
                    2: 3,
                    3: 4,
                    4: 5,
                    5: 6,
                    6: 7,
                    7: 8,
                    8: 9
                },
                1: {
                    0: 2,
                    1: 3,
                    2: 4,
                    3: 5,
                    4: 6,
                    5: 7,
                    6: 8,
                    7: 9,
                    8: 1
                },
                2: {
                    0: 3,
                    1: 4,
                    2: 5,
                    3: 6,
                    4: 7,
                    5: 8,
                    6: 9,
                    7: 1,
                    8: 2
                },
                3: {
                    0: 4,
                    1: 5,
                    2: 6,
                    3: 7,
                    4: 8,
                    5: 9,
                    6: 1,
                    7: 2,
                    8: 3
                },
                4: {
                    0: 5,
                    1: 6,
                    2: 7,
                    3: 8,
                    4: 9,
                    5: 1,
                    6: 2,
                    7: 3,
                    8: 4
                },
                5: {
                    0: 6,
                    1: 7,
                    2: 8,
                    3: 9,
                    4: 1,
                    5: 2,
                    6: 3,
                    7: 4,
                    8: 5
                },
                6: {
                    0: 7,
                    1: 8,
                    2: 9,
                    3: 1,
                    4: 2,
                    5: 3,
                    6: 4,
                    7: 5,
                    8: 6
                },
                7: {
                    0: 8,
                    1: 9,
                    2: 1,
                    3: 2,
                    4: 3,
                    5: 4,
                    6: 5,
                    7: 6,
                    8: 7
                },
                8: {
                    0: 9,
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 4,
                    6: 6,
                    7: 7,
                    8: 8
                }
            });
            expect(this.sudoku.isFinished()).toBe(true);
        });

        it('A partial sudoku should return false', function() {
            this.sudoku.setValues({
                0: {
                    0: 1,
                    1: 2,
                    2: 3,
                    4: 5,
                    5: 6,
                    6: 7,
                    7: 8,
                    8: 9
                },
                1: {
                    0: 2,
                    1: 3,
                    2: 4,
                    3: 5,
                    4: 6,
                    5: 7,
                    6: 8,
                    8: 1
                },
                2: {
                    2: 5,
                    3: 6,
                    4: 7,
                    5: 8,
                    6: 9,
                    7: 1,
                    8: 2
                },
                3: {
                    0: 4,
                    1: 5,
                    2: 6,
                    3: 7,
                    4: 8,
                    6: 1,
                    7: 2,
                },
                4: {
                    0: 5,
                    1: 6,
                    2: 7,
                    3: 8,
                    4: 9,
                    5: 1,
                    6: 2,
                    7: 3,
                    8: 4
                },
                5: {
                    0: 6,
                    1: 7,
                    2: 8,
                    3: 9,
                    4: 1,
                    5: 2,
                    6: 3,
                    7: 4,
                    8: 5
                },
                7: {
                    0: 8,
                    1: 9,
                    2: 1,
                    3: 2,
                    4: 3,
                    5: 4,
                    6: 5,
                    7: 6,
                    8: 7
                },
                8: {
                    0: 9,
                    1: 1,
                    2: 2,
                    8: 8
                }
            });
            expect(this.sudoku.isFinished()).toBe(false);
        });
    });
});
