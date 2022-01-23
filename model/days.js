class Days {
    constructor() {
        (this.temp = []), (this.hours = []);
    }

    set hoursSet(v) {
        this.hours = v;
    }

    set tempSet(v) {
        this.temp = v;
    }

    get hoursGet() {
        return this.hours;
    }
    // Filters out the times 
    sortTimes(i) {
        const filtered = this.hours.filter(function (value, index, arr) {
            return value == i;
        });
        // All times have been sorted into their own arrays, return out of the method.
        if (!filtered.length) {
            // daySet = temp;
            return;
        }
        // The times start at 0 and end at 23, so i keeps track of what times value we are on
        // and prevents it from sorting, when there are no more values.
        i++;
        // Temporarily Store in array
        this.temp.push(filtered);
        // Calls itself until the hours array is empty
        this.sortTimes(i);
    }

    setDays() {
        this.sortTimes(0);
        // sets the hours array to store the sorted times, which are each in their own array 
        // [[0,0,0,], [1,1,1,1,1], [2,2,2,2,2], [3,3,3]]
        this.hoursSet = this.temp;
        this.tempSet = [];
    }

}

module.exports = Days;
