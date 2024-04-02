document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video-preview');
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
            readers: ["code_128_reader"]
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
        const type = result.codeResult.format;

        // Controlla se il tipo di codice a barre è Code 128
        if (type === "code_128") {
            resultDiv.textContent = "Codice a barre Code 128 trovato: " + code;
        } else {
            resultDiv.textContent = "Tipo di codice a barre non supportato: " + type;
        }
    });
});
