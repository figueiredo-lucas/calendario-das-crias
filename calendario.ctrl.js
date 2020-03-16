angular.module('calendario-das-crias')
    .controller('CalendarioCtrl', function () {
        const vm = this;
        const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        vm.referenceDate = new Date(new Date().getFullYear(), 0, 1);
        vm.referenceWeekend = new Date(2020, 0, 11);

        vm.getClassByWeekNumber = function (day) {
            if (!day) return;
            const date = day.obj;
            let weekNumber = -1;
            // console.log(date.getDay());
            if (date.getDay() === 6) {
                weekNumber = date.getWeekNumber();
            } else if (date.getDay() === 0) {
                weekNumber = date.getWeekNumber() - 1;
            }

            if (weekNumber > -1) {
                return weekNumber % 2 === 0 ? 'dia-lucas' : 'dia-thalita';
            }
            return ''
        }

        buildMonthsArray();

        function buildMonthsArray() {
            vm.monthsArray = months.reduce((acc, curr) => {
                const month = { month: curr, name: getMonthName(curr), weeks: [] };
                const dateMonth = new Date(vm.referenceDate.getFullYear(), curr, 1);
                const amountOfWeeks = Math.ceil(amountOfDaysPerMonth(curr) / 7) + 1;
                for (let i = 0; i < amountOfWeeks; i++) {
                    if (dateMonth.getMonth() !== curr) break;
                    month.weeks[i] = new Array(7);
                    for (let j = 0; j < 7; j++) {
                        if (j === dateMonth.getDay() && dateMonth.getMonth() === curr) {
                            month.weeks[i][j] = {
                                date: dateMonth.getDate(),
                                obj: new Date(dateMonth)
                            }
                            dateMonth.setDate(dateMonth.getDate() + 1);
                        }
                    }
                }
                acc.push(month);
                return acc;
            }, []);
        }

        function amountOfDaysPerMonth(month) {
            const year = vm.referenceDate.getFullYear();
            const leapYear = (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0));
            if (month === 1) {
                return leapYear ? 29 : 28;
            }
            if ((month < 7 && month % 2 === 0) || (month > 6 && month % 2 === 1)) {
                return 31;
            }
            return 30;
        }

        function getMonthName(month) {
            const names = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            return names[month];
        }
    })