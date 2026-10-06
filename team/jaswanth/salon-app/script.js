function bookNow() {
    alert("Appointment booking will be added soon!");
}
function bookNow() {
    window.location.href = "booking.html";
}

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        document.getElementById("message").innerHTML =
            "✅ Appointment booked successfully!<br>" +
            "Thank you, " + name + "!<br>" +
            service + "<br>" +
            date + " at " + time;

        bookingForm.reset();
    });
}