/* SmtpJS.com - v3.0.0 */
var Email = {
    send: function (a) {
        return new Promise(function (n, e) {
            (a.nocache = Math.floor(1e6 * Math.random() + 1)),
                (a.Action = "Send");
            var t = JSON.stringify(a);
            Email.ajaxPost(
                "https://smtpjs.com/v3/smtpjs.aspx?",
                t,
                function (e) {
                    n(e);
                }
            );
        });
    },
    ajaxPost: function (e, n, t) {
        var a = Email.createCORSRequest("POST", e);
        a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            (a.onload = function () {
                var e = a.responseText;
                null != t && t(e);
            }),
            a.send(n);
    },
    ajax: function (e, n) {
        var t = Email.createCORSRequest("GET", e);
        (t.onload = function () {
            var e = t.responseText;
            null != n && n(e);
        }),
            t.send();
    },
    createCORSRequest: function (e, n) {
        var t = new XMLHttpRequest();
        return (
            "withCredentials" in t
                ? t.open(e, n, !0)
                : "undefined" != typeof XDomainRequest
                ? (t = new XDomainRequest()).open(e, n)
                : (t = null),
            t
        );
    },
};

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC8YgwfKmPAPgxO_OtpZImuI8QbBiqNXQk",
    authDomain: "portafolio-oswaldo-parri-401e2.firebaseapp.com",
    projectId: "portafolio-oswaldo-parri-401e2",
    storageBucket: "portafolio-oswaldo-parri-401e2.appspot.com",
    messagingSenderId: "990782412205",
    appId: "1:990782412205:web:46371a201069708882bd24",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Reference contactInfo collections
let contactInfo = firebase.database().ref("infos");

//LISTEN FOR SUBMIT
document.querySelector(".contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    //Get input Values
    let name = document.querySelector(".name").value;
    let apellidos = document.querySelector(".apellidos").value;
    let email = document.querySelector(".email").value;
    let telefono = document.querySelector(".telefono").value;
    let message = document.querySelector(".message").value;
    // console.log(name, apellidos, email, telefono, message);

    saveContactInfo(name, apellidos, email, telefono, message);

    document.querySelector(".contactForm").reset();

    sendEmail(name, apellidos, email, telefono, message);
    console.log(sendEmail);
}

//Save Infos to firebase
function saveContactInfo(name, apellidos, email, telefono, message) {
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name: name,
        apellidos: apellidos,
        email: email,
        telefono: telefono,
        message: message,
    });
}

//Send email Info
function sendEmail(name, apellidos, email, telefono, message) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "oswaparrilla@gmail.com",
        Password: "iqxouvwqvjavvvkp",
        To: "oswaparrilla@gmail.com",
        From: "oswaparrilla@gmail.com",
        Subject: `${name} sent you a message`,
        Body: `Nombre(s): ${name} <br/> Apellidos: ${apellidos} <br/>
        Email: ${email} <br/> Telefono: ${telefono} <br/> Message:
        ${message}`,
    }).then((message) => alert("El correo se ha enviado correctamente.")).catch((error)=> console.log(error));
}

// function ponleFocus() {
//     document.getElementById("home").focus();
// }

// ponleFocus();
