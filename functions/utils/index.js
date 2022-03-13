export function GetRandomNumber(){
    return Math.floor(Math.random()*90000) + 10000;
}

export function GetTimestamp(){
    return new Date().getTime().toString();
}

export function getDay(num) {
    if (num == 0) {
        return "SUN";
    }
    if (num == 1) {
        return "MON";
    }
    if (num == 2) {
        return "TUE";
    }
    if (num == 3) {
        return "WED";
    }
    if (num == 4) {
        return "THU";
    }
    if (num == 5) {
        return "FRI";
    }
    if (num == 6) {
        return "SAT";
    }
}
