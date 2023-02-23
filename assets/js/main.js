let mondaySQLFormat;
let barbers;
let customers;
let mondayDateTime;
let inputFieldInformationBeforeSave = [];
let currentBarber;

function saveInputInfos(toArray) {
    const inputs = document.getElementsByClassName('userInput')

    for (const input of inputs) {
        toArray.push({date: input.dataset.date, time: input.dataset.time, value: input.value})
    }
}

function clearInputs(appointmentId) {
    const inputs = document.querySelectorAll('.userInput');

    inputs.forEach((input) => {
        if (input.dataset.appointmentid === appointmentId) {
            input.value = '';
            input.removeAttribute('data-appointmentid')
            input.disabled = false;
        }
    })
}

async function deleteAppointment() {
    const appointmentId = this.dataset.appointmentid

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText === '1') {
                alert('Dein Termin wurde geloescht')
            } else if (this.responseText === '0') {
                alert('Fehler')
            }
        }
    }
    xhttp.open("POST", "../ajax.php");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("action=delete&appointmentId=" + appointmentId)


    clearInputs(appointmentId)
    loadDoc(loadCurrentMonday())
}

function initiateDeleteButtons() {
    const buttons = document.querySelectorAll('.delete');
    const inputs = document.querySelectorAll('.userInput');

    buttons.forEach((button) => {
        inputs.forEach((input) => {
            if (button.dataset.date === input.dataset.date && button.dataset.time === input.dataset.time) {
                if (input.value !== '[Termin belegt]' && input.value !== '' && input.value !== null) {
                    button.addEventListener('click', deleteAppointment);
                    button.setAttribute('data-appointmentId', '' + input.dataset.appointmentid);
                }
            }
        })
    });
}

function createBarberSelector(barberObjects, monday) {
    let html = '';
    html += '<label for="barberView">Lieblingsmensch:</label>'
    html += '<select name="barberView" id="barberView">'
    for (const barberObject of barberObjects) {
        html += '<option value="' + barberObject.id + '">' + barberObject.firstName + ' ' + barberObject.lastName + '</option>'
    }
    html += '</select>'
    document.getElementById('barberSelector').innerHTML = html;
    document.getElementById('barberSelector').addEventListener('change', () => barberWorkSchedule(mondaySQLFormat))
}


function barberWorkSchedule(monday) {
    const barberViewValue = document.querySelector('select').value
    currentBarber = barberViewValue;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const barbersCustomerTable = this.responseText;
            let formatAjax = JSON.parse(barbersCustomerTable);
            let table = emptyTable()
            document.getElementById('tableData').innerHTML = table;
            fillInputNameValue(formatAjax[1])
            initiateDeleteButtons()
            document.getElementById("barberView").value = currentBarber;
            setBarberWorkingHours(formatAjax[0])


        }
    }
    xhttp.open("POST", "../ajax.php");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("action=load&monday=" + monday + "&barber_id=" + barberViewValue)


}

function setBarberWorkingHours(barbers) {
    const barberViewValue = document.querySelector('select').value
    const inputs = document.getElementsByClassName('userInput');
    let k = 0;
    for (const barber of barbers) {

        if (Number(barberViewValue) === barber.id) {

            const workerShiftStart = barber.workStart
            const workerShiftEnd = barber.workEnd

            const storeOpeningTime = new Date('2023-02-14 09:00:00')

            let workStart = new Date('2023-02-14 ' + workerShiftStart)
            let workEnd = new Date('2023-02-14 ' + workerShiftEnd)

            if (workStart < storeOpeningTime) {
                workStart = storeOpeningTime
            }

            let workerShiftStartTimeFormat = formatTime(workStart)
            let workerShiftEndTimeFormat = formatTime(workEnd)

            let nextAvailableSlot = new Date(workStart.setMinutes(workStart.getMinutes() + 30))
            let nextAvailableSlotTimeFormat = formatTime(nextAvailableSlot)


            for (const input of inputs) {
                if (input.value === '') {
                    input.disabled = true
                }

                if (input.dataset.time === workerShiftStartTimeFormat) {
                    if (input.value === '') {
                        input.disabled = false
                    }
                }
                if (input.dataset.time === nextAvailableSlotTimeFormat && nextAvailableSlotTimeFormat !== workerShiftEndTimeFormat) {
                    if (input.value === '') {
                        input.disabled = false
                    }

                    k += 1
                }
                if (k !== 0 && k % 5 === 0) {
                    nextAvailableSlot = new Date(nextAvailableSlot.setMinutes(nextAvailableSlot.getMinutes() + 30))
                    nextAvailableSlotTimeFormat = formatTime(nextAvailableSlot)
                }

                if (input.dataset.time === workerShiftEndTimeFormat) {
                    workEnd = new Date(workStart.setMinutes(workEnd.getMinutes() + 30))
                    workerShiftEndTimeFormat = formatTime(workEnd)
                }


            }
        }
    }
}

function formatTime(firstDay) {
    return padTo2Digits(firstDay.getHours()) + ':' + padTo2Digits(firstDay.getMinutes())
}

function getSQLFormat(dateObjectFormat) {
    let year = dateObjectFormat.getFullYear() + '-';
    let month = dateObjectFormat.getMonth()
    month++
    if (String(month).length == 1) {
        month = '0' + month + '-';
    }
    let day = dateObjectFormat.getDate();
    if (String(day).length == 1) {
        day = '0' + day;
    }
    return year + month + day
}

function padTo2Digits(num) {
    return String(num).padStart(2, '0');
}

function fillInputNameValue(appointments) {
    const userId = document.getElementById('inputUserId').value
    const userRole = document.getElementById('inputUserRole').value
    const inputs = document.getElementsByClassName('userInput');

    for (const appointment of appointments) {
        const appointmentSlotStart = new Date(appointment.slotStart)
        const slotStartDateFormat = getSQLFormat(appointmentSlotStart)
        const slotStartTimeFormat = formatTime(appointmentSlotStart)
        const appointmentSlotEnd = new Date(appointment.slotEnd)
        // const slotEndDateFormat = getSQLFormat(appointmentSlotEnd)
        const slotEndTimeFormat = formatTime(appointmentSlotEnd)
        let nextAvailableSlot = new Date(appointmentSlotStart.setMinutes(appointmentSlotStart.getMinutes() + 30))
        let nextAvailableSlotTimeFormat = formatTime(nextAvailableSlot)

        for (const input of inputs) {
            if (userRole !== 'customer') {
                input.setAttribute('list', 'customerName')
            }
            if (input.dataset.date === slotStartDateFormat && input.dataset.time === slotStartTimeFormat) {
                if (userRole === 'customer' && +appointment.user.id === +userId) {
                    input.disabled = true
                    input.value = appointment.user.firstName + ' ' + appointment.user.lastName
                    input.setAttribute('data-appointmentid', appointment.id)
                }
                if (userRole !== 'customer') {
                    input.disabled = true
                    input.value = appointment.user.firstName + ' ' + appointment.user.lastName
                    input.setAttribute('data-appointmentid', appointment.id)
                } else {
                    input.disabled = true
                    input.value = '[Termin belegt]'
                }
            }

            if (input.dataset.date === slotStartDateFormat && input.dataset.time === nextAvailableSlotTimeFormat && nextAvailableSlotTimeFormat != slotEndTimeFormat) {
                if (input.value === '' && userRole === 'customer' && +appointment.user.id === +userId) {
                    input.disabled = true
                    input.value = appointment.user.firstName + ' ' + appointment.user.lastName
                    input.setAttribute('data-appointmentid', appointment.id)
                }
                if (input.value === '' && userRole !== 'customer') {
                    input.disabled = true
                    input.value = appointment.user.firstName + ' ' + appointment.user.lastName
                    input.setAttribute('data-appointmentid', appointment.id)
                } else {
                    input.disabled = true
                    input.value = '[Termin belegt]'
                }
                nextAvailableSlot = new Date(nextAvailableSlot.setMinutes(nextAvailableSlot.getMinutes() + 30))
                nextAvailableSlotTimeFormat = formatTime(nextAvailableSlot)

            }
        }
    }
    inputFieldInformationBeforeSave = []
    saveInputInfos(inputFieldInformationBeforeSave)
}

function loadCurrentMonday(date) {
    if (date === undefined) {
        mondayDateTime = new Date();
    } else {
        mondayDateTime = new Date(date)
    }

    let weekDay = mondayDateTime.getDay()
    if (weekDay === 0) {
        mondaySQLFormat = getSQLFormat(new Date(mondayDateTime.setDate(mondayDateTime.getDate() - 6)))
        return mondaySQLFormat

    } else {
        mondaySQLFormat = getSQLFormat(new Date(mondayDateTime.setDate(mondayDateTime.getDate() - (weekDay - 1))))
        return mondaySQLFormat

    }
}

function loadLastMonday(mondayDateTime) {
    let lastMondaySQLFormat = getSQLFormat(new Date(mondayDateTime.setDate(mondayDateTime.getDate() - 7)))
    loadDoc(loadCurrentMonday(lastMondaySQLFormat))
}

function loadNextMonday(mondayDateTime) {
    let nextMondaySQLFormat = getSQLFormat(new Date(mondayDateTime.setDate(mondayDateTime.getDate() + 7)))
    loadDoc(loadCurrentMonday(nextMondaySQLFormat))
}

// 1.
// loadDoc() wird beim Seitenaufruf /views/customerPage.php geladen
// mondayOfTheWeek ist ein Montag im SQL-Format[YYYY-MM-DD] und wird von loadCurrentMonday, loadLastMonday (<-) oder loadNextMonday (->) berechnet
function loadDoc(mondayOfTheWeek) {
    // bei initalisierung laodDoc(loadCurrentMonday)
    mondaySQLFormat = mondayOfTheWeek
    console.log(mondaySQLFormat)

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
// 3.
// wir erhalten 2 Arrays mit Objekten im Array, das erste Array[0] enthaelt alle Barbers, das zweite Array[1] enthaelt alle Appointments
// this.responseText ist die Antwort vom Backend und ist ein String der umgeformt wird
            const barbersCustomerTable = this.responseText;
            let formatAjax = JSON.parse(barbersCustomerTable);
            barbers = formatAjax[0];
            customers = formatAjax[2];

            // Wochentabelle ohne Daten erzeugen
            let tbl = emptyTable();
            document.getElementById('tableData').innerHTML = tbl;

            // if Bedingung damit createBarberSelector automatisch den ersten Barber aus der Liste waehlt
            if (currentBarber === undefined) currentBarber = barbers[0].id

            // Tabelleninhalt wird befuellt
            fillInputNameValue(formatAjax[1])

            // BarberSelector wird erzeugt
            createBarberSelector(barbers, mondaySQLFormat)

            // wenn der Barber nicht arbeitet, werden die Inputfelder deaktiviert
            setBarberWorkingHours(formatAjax[0])

            // delete Buttons werden neben jeden Inputfeld erstellt und funktionieren nur wenn ein Termin besteht
            initiateDeleteButtons()

            // erster Barber wird fuer den createBarberSelector gewahelt
            document.getElementById("barberView").value = currentBarber;
        }
    }
    xhttp.open("POST", "../ajax.php");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 2.
// wir uebergeben action&monday ans backend (ajax.php) und bekommen als Antwort... siehe 3.
    xhttp.send("action=load&monday=" + mondaySQLFormat)
}

const emptyTable = function () {
    const firstDay = new Date(mondayDateTime.setDate(mondayDateTime.getDate() + 1))
    const tuesday = getSQLFormat(firstDay)
    const wednesday = getSQLFormat(new Date(firstDay.setDate(firstDay.getDate() + 1)))
    const thursday = getSQLFormat(new Date(firstDay.setDate(firstDay.getDate() + 1)))
    const friday = getSQLFormat(new Date(firstDay.setDate(firstDay.getDate() + 1)))
    const saturday = getSQLFormat(new Date(firstDay.setDate(firstDay.getDate() + 1)))
    const resetDays = new Date(mondayDateTime.setDate(mondayDateTime.getDate() - 1))

    // @todo Startzeit und Endzeit aus backend abholen
    const barberHoursInArray = barbers.map(barber => [barber.workStart, barber.workEnd]);
    const barberHoursForMinMax = [
        ...barberHoursInArray[0],
        ...barberHoursInArray[1],
        ...barberHoursInArray[2],
        ...barberHoursInArray[3]
    ];
    barberHoursForMinMax.sort()
    console.log(barberHoursForMinMax)
    const minimum = barberHoursForMinMax[0];
    const maximum = barberHoursForMinMax.pop();
    const barberHoursMinMax = [minimum, maximum];
    console.log(barberHoursMinMax);

    firstDay.setHours(7, 0, 0)

    let tbl = '';
    let j = 0;
    let weekday = '';

    tbl += '<tr> '
    tbl += '<td></td>'
    tbl += '<td class="weekday">' + tuesday + '</td>'
    tbl += '<td class="weekday">' + wednesday + '</td>'
    tbl += '<td class="weekday">' + thursday + '</td>'
    tbl += '<td class="weekday">' + friday + '</td>'
    tbl += '<td class="weekday">' + saturday + '</td>'
    tbl += '</tr>'

    for (let i = 0; i < 80; i++) {
        if (i % 5 === 0) {
            tbl += '<tr>';
            tbl += '<td>' + formatTime(firstDay) + '</td>'
        }

        j += 1;

        tbl += '<td>';

        if (j === 1) {
            weekday = tuesday
        } else if (j === 2) {
            weekday = wednesday
        } else if (j === 3) {
            weekday = thursday
        } else if (j === 4) {
            weekday = friday
        } else if (j === 5) {
            weekday = saturday
        }

        tbl += `<input class="userInput" data-time= ${formatTime(firstDay)} data-date=${weekday} >`
        tbl += `<button class="delete" type="button" data-time= ${formatTime(firstDay)} data-date=${weekday}>X</button>`
        tbl += '</td>';

        if (j === 5) {
            j = 0
        }

        if (i % 5 === 4) {
            tbl += '</tr>';
            firstDay.setMinutes(firstDay.getMinutes() + 30)
        }

    }
    tbl += '<datalist id="customerName">';
    for (const customer of customers) {
        tbl += '<option class="customerID" data-userid="' + customer.id + '" value="' + customer.firstName + ' ' + customer.lastName + '">';

    }
    tbl += '</datalist>';
    return tbl;
}


function newAppointment() {
    let userId = document.getElementById('inputUserId').value
    const userRole = document.getElementById('inputUserRole').value
    const barberId = document.querySelector('select').value
    const inputs = document.getElementsByClassName('userInput')
    const optionArray = document.getElementsByClassName('customerID')

    const inputFieldInformationAfterSave = []
    let newAppointments = []
    let allTimeSlots = []
    saveInputInfos(inputFieldInformationAfterSave)
    console.log(inputFieldInformationBeforeSave)
    console.log(inputFieldInformationAfterSave)

    for (const beforeSave of inputFieldInformationBeforeSave) {
        for (const afterSave of inputFieldInformationAfterSave) {
            if (afterSave.date === beforeSave.date && afterSave.time === beforeSave.time && beforeSave.value !== afterSave.value) {
                newAppointments.push(afterSave)
            }
        }
    }

    console.log(newAppointments)

    for (const appointment1 of newAppointments) {
        for (const appointment2 of newAppointments) {
            if (appointment1.date !== appointment2.date) {
                alert('Bitte lege deine Termin an einem einzigen Tag fest.')
                return
            }
        }
    }

    for (const appointment of newAppointments) {
        for (const option of optionArray) {
            if (option.value === appointment.value && userRole !== 'customer') {
                userId = option.dataset.userid
            }
        }
        allTimeSlots.push(new Date(appointment.date + ' ' + appointment.time))
    }

    const datesArray = allTimeSlots.map((element) => new Date(element));
    let slotStart = new Date(Math.min(...datesArray));
    let slotStartSQLFormat = getSQLFormat(slotStart) + ' ' + formatTime(slotStart)
    let slotEnd;
    if (allTimeSlots.length < 2) {
        slotEnd = new Date(slotStart.setMinutes(slotStart.getMinutes() + 30))
    } else slotEnd = new Date(Math.max(...datesArray));

    let slotEndSQLFormat = getSQLFormat(slotEnd) + ' ' + formatTime(slotEnd)

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === '1') {
                alert('Dein Termin wurde angelegt')
            } else if (this.responseText === '0') {
                alert('Fehler bei der Terminerstellung')
            }

        }
    }
    xhttp.open('POST', 'ajax.php');
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send("action=save&user_id=" + userId + "&barber_id=" + barberId + "&slotStart=" + slotStartSQLFormat + "&slotEnd=" + slotEndSQLFormat);

    for (const input of inputs) {
        if (input.value !== '') {
            input.disabled = true;
        }
    }
    loadDoc(loadCurrentMonday())

}