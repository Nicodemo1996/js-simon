

// Recupero gli elementi dal DOM//
const contoAllaRovescia = document.getElementById("countdown");
const listaNumeri = document.getElementById("numbers-list");
const form = document.getElementById("answers-form");
const istruzioni = document.getElementById("instructions");
const messaggio = document.getElementById("message");
const bottone = document.querySelector(".btn");
const inputform = document.querySelectorAll(".form-control");



// Creo un array vuoto dove salvare i numeri casuali//
const arrayRandom = [];

// Finché l’array non contiene 5 numeri diversi/ /
while (arrayRandom.length < 5) {
  // Genero un numero casuale da 1 a 50
  let numero = Math.floor(Math.random() * 50) + 1;

  // Se il numero non è già presente nell’array lo aggiungo//
  if (!arrayRandom.includes(numero)) {
    arrayRandom.push(numero);
  }
}

// Mostro i numeri in pagina dentro la lista//
let copiaListaNumeri = "";
for (let i = 0; i < arrayRandom.length; i++) {
  copiaListaNumeri += "<li>" + arrayRandom[i] + "</li>";
}
listaNumeri.innerHTML = copiaListaNumeri;





// Imposto i secondi del countdown//
let timer = 30;

contoAllaRovescia.innerText = timer;
timer--;

// Creo un intervallo che si ripete ogni secondo//
const timerGenNum = setInterval(function () {

  // Aggiorno il numero del countdown//
  contoAllaRovescia.innerText = timer;


  if (timer === 0) {
    // Svuoto countdown e lista numeri
    contoAllaRovescia.innerText = "";
    listaNumeri.innerText = "";

    // Fermo il timer//
    clearInterval(timerGenNum);

    form.classList.remove("d-none");
    istruzioni.innerText = "Inserisci tutti i numeri che ricordi (l'ordine non è importante)";


    form.addEventListener("submit", function (event) {
      event.preventDefault(); // blocco invio normale del form

      // Creo un contatore dei numeri indovinati//
      let contatore = 0;
      // Creo anche un array per salvare quali numeri sono stati indovinati//
      const indovinati = [];

      // Confronto ogni valore degli input con i numeri generati//
      for (let i = 0; i < inputform.length; i++) {
        let valore = Number(inputform[i].value);

        if (arrayRandom.includes(valore) && !indovinati.includes(valore)) {
          contatore++;
          indovinati.push(valore);
        }
      }

      // Disattivo il bottone per non inviare due volte//
      bottone.disabled = true;

      // Mostro il messaggio con quanti e quali numeri sono stati indovinati//
      if (contatore > 0) {
        messaggio.innerText = "Hai indovinato " + contatore + " numeri: " + indovinati.join(", ");
      } else {
        messaggio.innerText = "Non hai indovinato nessun numero 😢";
      }
    });
  } else {
    // Altrimenti continuo a scalare il timer//
    timer--;
  }

}, 1000);