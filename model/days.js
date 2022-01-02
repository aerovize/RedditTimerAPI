class Days {
    constructor() {
        (this.temp = []),
            (this.sunday = []),
            (this.monday = []),
            (this.tuesday = []),
            (this.wednsday = []),
            (this.thursday = []),
            (this.friday = []),
            (this.saturday = []);
    }

    set sundaySet(v) {
        this.sunday = v;
    }

    set mondaySet(v) {
        this.monday = v;
    }

    set tuesdaySet(v) {
        this.tuesday = v;
    }

    set wednsdaySet(v) {
        this.wednsday = v;
    }

    set thursdaySet(v) {
        this.thursday = v;
    }

    set fridaySet(v) {
        this.friday = v;
    }

    set saturdaySet(v) {
        this.saturday = v;
    }

    set tempSet(v) {
        this.temp = v;
    }

    getTimes(timeStamps) {
        timeStamps.forEach((time) => {
            const date = new Date(time * 1000);
            const hour = date.getHours();
            const day = date.getDay();
            //const year = date.getFullYear();
            switch (day) {
                case 0:
                    this.sunday.push(hour);
                    return;
                case 1:
                    this.monday.push(hour);
                    return;
                case 2:
                    this.tuesday.push(hour);
                    return;
                case 3:
                    this.wednsday.push(hour);
                    return;
                case 4:
                    this.thursday.push(hour);
                    return;
                case 5:
                    this.friday.push(hour);
                    return;
                case 6:
                    this.saturday.push(hour);
                    return;
            }
        });
    }

    sortTimes(arry, i, temp) {
        const filtered = arry.filter(function (value, index, arr) {
            return value == i;
        });

        if (!filtered.length) {
            // console.log("CLEANUP");
            // daySet = temp;
            return;
        }

        i++;
        temp.push(filtered);
        //console.log(temp);
        this.sortTimes(arry, i, temp);
    }

    cleanup(daySet, temp) {
        daySet = [...temp];
        this.tempSet = [];
    }
}

module.exports = Days;
