/**
 * Project: finnish-ssn
 * Purpose: Validate and generate Finnish SSN's according to https://fi.wikipedia.org/wiki/Henkil%C3%B6tunnus
 * Author:  Ville Komulainen
 */

interface ValidationResult {
    valid: boolean;
    sex: string;
    ageInYears: number;
    dateOfBirth: Date;
}

//! https://github.com/vkomulai/finnish-ssn | Version: 1.1.0
export default class FinnishSSN {

    static FEMALE = "female"
    static MALE = "male"

    /**
     * Parse parameter given SSN string into Object representation.
     * @param ssn - {String} SSN to parse
     * @returns {Object} {valid: true|false, sex: String, ageInYears: Number, dateOfBirth: Date}
     */
    static parse(ssn: string) : ValidationResult {

        const parseFailedObj: ValidationResult = {
            valid: false,
            sex: null,
            ageInYears: null,
            dateOfBirth: null
        }
        //  Sanity and format check, which allows to make safe assumptions on the format.
        if (!SSN_REGEX.test(ssn)) {
            return parseFailedObj
        }

        const dayOfMonth = parseInt(ssn.substring(0, 2), 10),
            month = ssn.substring(2, 4),
            centuryId = ssn.charAt(6),
            year = parseInt(ssn.substring(4, 6), 10) + centuryMap[centuryId],
            rollingId = ssn.substring(7, 10),
            checksum = ssn.substring(10, 11),
            sex = parseInt(rollingId, 10) % 2 ? this.MALE : this.FEMALE
        const daysInMonth = daysInGivenMonth(year, month)

        if (!daysInMonthMap.hasOwnProperty(month) || dayOfMonth > daysInMonth) {
            return parseFailedObj
        }

        const checksumBase = parseInt(ssn.substring(0, 6) + rollingId, 10),
            dateOfBirth = new Date(year, parseInt(month, 10) - 1, dayOfMonth, 0, 0, 0, 0),
            today = new Date()

        return {
            valid: (checksum === checksumTable[checksumBase % 31]),
            sex: sex,
            dateOfBirth: dateOfBirth,
            ageInYears: ageInYears(dateOfBirth, today)
        }
    }

    /**
     * Validates parameter given SSN. Returns true if SSN is valid, otherwise false.
     * @param ssn - {String} For example '010190-123A'
     * @returns {boolean}
     */
    static validate(ssn: string) {
        return this.parse(ssn).valid
    }

    /**
     * Creates a valid SSN using the given age (Integer). Creates randomly male and female SSN'n.
     * In case an invalid age is given, throws exception.
     *
     * @param age as Integer. Min valid age is 1, max valid age is 200
     * @returns {String} - valid ssn.
     */
    static createWithAge(age: number) {
        if (age < MIN_AGE || age > MAX_AGE) {
            throw "Given age (" + age + ") is not between sensible age range of " + MIN_AGE + " and " + MAX_AGE
        }
        let today = new Date(),
            year = today.getFullYear() - age,
            month = randomMonth(),
            dayOfMonth = randomDay(year, month),
            centurySign,
            checksumBase,
            checksum,
            rollingId = 99 + randomNumber(800)  //  No need for padding when rollingId >= 100


        for (let centuryChar in centuryMap) {
            if (centuryMap[centuryChar] === Math.floor(year / 100) * 100) {
                centurySign = centuryChar
            }
        }

        if (!birthDayPassed(new Date(year, Number(month) - 1, Number(dayOfMonth)), today)) {
            year--
        }
        year = year % 100

        const checkYear = year % 100 < 10 ? "0" + year : String(year);

        checksumBase = parseInt(dayOfMonth +
            month +
            checkYear +
            rollingId, 10)
        checksum = checksumTable[checksumBase % 31]

        return dayOfMonth +
            month +
            checkYear +
            centurySign +
            rollingId +
            checksum
    }
}

const february = "02";
const centuryMap: { [key: string]: number } = { "A": 2000, "-": 1900, "+": 1800 };
const daysInMonthMap: { [key: string]: number } = {
    "01": 31,
    "02": 28,
    "03": 31,
    "04": 30,
    "05": 31,
    "06": 30,
    "07": 31,
    "08": 31,
    "09": 30,
    "10": 31,
    "11": 30,
    "12": 31
};
const checksumTable = "0123456789ABCDEFHJKLMNPRSTUVWXY".split("");

const MIN_AGE = 1;
const MAX_AGE = 200;
const SSN_REGEX = /^[0-3][\d][0-1][0-9][0-9]{2}[+\-A][\d]{3}[\dA-Z]$/;


function randomMonth() {
    return ("00" + randomNumber(12)).substr(-2, 2)
}

function randomDay(year: number, month: string) {
    const maxDaysInMonth = daysInGivenMonth(year, month)
    return ("00" + randomNumber(maxDaysInMonth)).substr(-2, 2)
}

function daysInGivenMonth(year: number, month: string) {
    const daysInMonth: number = daysInMonthMap[month];
    return (month === february && isLeapYear(year)) ? daysInMonth + 1 : daysInMonth
}

function randomNumber(max: number) {
    return Math.floor(Math.random() * max) + 1 // no zero
}

function isLeapYear(year: number) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}

function ageInYears(dateOfBirth: Date, today: Date) {
    return today.getFullYear() - dateOfBirth.getFullYear() - (birthDayPassed(dateOfBirth, today) ? 0 : 1)
}

function birthDayPassed(dateOfBirth: Date, today: Date) {
    return dateOfBirth.getMonth() < today.getMonth() ||
        (dateOfBirth.getMonth() === today.getMonth() && dateOfBirth.getDate() <= today.getDate())
}