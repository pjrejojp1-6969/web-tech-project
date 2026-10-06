// =========================
// APPOINTMENT FORM
// =========================

const APPOINTMENTS_STORAGE_KEY = "modernHospitalAppointments";

function submitAppointment(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const appointment = {
        name: form.elements.name.value.trim(),
        phone: form.elements.phone.value.trim(),
        email: form.elements.email.value.trim(),
        doctor: form.elements.doctor.value,
        date: form.elements.date.value,
        problem: form.elements.problem.value.trim(),
        bookedAt: new Date().toISOString()
    };

    try {
        const savedAppointments = JSON.parse(
            localStorage.getItem(APPOINTMENTS_STORAGE_KEY) || "[]"
        );
        if (!Array.isArray(savedAppointments)) {
            throw new Error("Saved appointment data is not a list.");
        }
        savedAppointments.push(appointment);
        localStorage.setItem(
            APPOINTMENTS_STORAGE_KEY,
            JSON.stringify(savedAppointments)
        );
    } catch (error) {
        console.error("Could not save the appointment in this browser.", error);
        alert("Your appointment could not be saved in this browser. Please try again.");
        return;
    }

    alert(
        "Appointment request saved in this browser.\n\n" +
        "Patient: " + appointment.name + "\n" +
        "Phone: " + appointment.phone + "\n" +
        "Doctor: " + appointment.doctor + "\n\n" +
        "Please contact the hospital to confirm your appointment."
    );

    form.reset();
}

function renderMyAppointments() {
    const appointmentList = document.getElementById("appointment-list");
    const appointmentCount = document.getElementById("appointment-count");
    if (!appointmentList || !appointmentCount) {
        return;
    }

    let appointments;
    try {
        appointments = JSON.parse(
            localStorage.getItem(APPOINTMENTS_STORAGE_KEY) || "[]"
        );
        if (!Array.isArray(appointments)) {
            throw new Error("Saved appointment data is not a list.");
        }
    } catch (error) {
        console.error("Could not load saved appointments from this browser.", error);
        appointmentCount.textContent = "Appointments could not be loaded.";
        appointmentList.textContent =
            "The saved appointment data could not be read. Please try another browser or clear this site's stored data.";
        return;
    }

    appointmentList.textContent = "";
    appointmentCount.textContent = appointments.length === 1
        ? "1 appointment saved in this browser."
        : appointments.length + " appointments saved in this browser.";

    if (appointments.length === 0) {
        appointmentList.textContent = "You have no saved appointments yet.";
        return;
    }

    appointments.slice().reverse().forEach((appointment) => {
        const card = document.createElement("article");
        card.className = "saved-appointment";

        const heading = document.createElement("h3");
        heading.textContent = appointment.doctor || "Appointment";
        card.appendChild(heading);

        const details = [
            ["Patient", appointment.name],
            ["Date", formatAppointmentDate(appointment.date)],
            ["Phone", appointment.phone],
            ["Email", appointment.email],
            ["Reason", appointment.problem],
            ["Booked", formatAppointmentDateTime(appointment.bookedAt)]
        ];

        details.forEach(([label, value]) => {
            if (!value) {
                return;
            }
            const detail = document.createElement("p");
            const strong = document.createElement("strong");
            strong.textContent = label + ": ";
            detail.append(strong, document.createTextNode(value));
            card.appendChild(detail);
        });

        appointmentList.appendChild(card);
    });
}

function formatAppointmentDate(value) {
    const date = new Date(value + "T00:00:00");
    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleDateString();
}

function formatAppointmentDateTime(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleString();
}

renderMyAppointments();