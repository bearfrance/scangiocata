// Ottieni l'elemento video e il canvas
const video = document.getElementById('video-preview');
const canvas = document.getElementById('barcode-canvas');
const ctx = canvas.getContext('2d');
const resultDiv = document.getElementById('barcode-result');

// Inizializza la fotocamera
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(function(stream) {
        video.srcObject = stream;
    })
    .catch(function(err) {
        console.log("Errore nell'accesso alla fotocamera: " + err);
    });

// Carica la libreria di scansione dei codici a barre (QuaggaJS)
Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: video
    },
    decoder: {
        readers: ["ean_reader"]
    }
}, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("QuaggaJS inizializzato correttamente");
    Quagga.start();
});

// Quando viene trovato un codice a barre, mostra il risultato
Quagga.onDetected(function(result) {
    const code = result.codeResult.code;
    resultDiv.textContent = "Codice a barre trovato: " + code;
});
