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
            readers: ["code_128_reader", "ean_reader", "upc_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "i2of5_reader", "2of5_reader", "code_93_reader"] // Lettori di codici a barre supportati
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
});
